%{
#include <stdio.h>
#include <stdlib.h>
#include "mips.h"
#include "ast.h"
#include "list.h"
#include "sym_tab.h"
#include "quad.h"
#include "branchings.h"
#include "helper.h"

extern int yylex();
extern int yyparse();
int type;
void yyerror(const char* s);

extern FILE* yyin;
T* ast = NULL;

Register RESULT_REGISTER = 0;
DataSection dataSec  ;
extern FILE* fs;

extern unsigned int nextquad;
quadlist quads = NULL;

unsigned int ast_index = 0;
extern T** ast_array;
extern quadstack quadStack;
%}

%union {
    char* strval;
    float floatval;
    int intval;
    T* expr;
    quadlist quad;
} ;

%token<strval> IDENT
%token AFF
%token<intval> T_INTEGER_CONSTANT
%token<floatval> T_FLOAT_CONSTANT
%token STRING_LITERAL
%token LEFT_P RIGHT_P SEMICOLON RIGHT_C LEFT_C RIGHT_B LEFT_B COMMA
%token T_PLUS T_MINUS T_MUL T_DIV T_MATRIX_INVERSE
%token T_RETURN T_WHILE T_IF T_ELSE T_FOR
%token T_GREATER T_LESS T_GREATER_EQUAL T_LESS_EQUAL T_EQUAL T_NOT_EQUAL T_AND T_OR T_NOT
%token TOKEN_INCREMENT TOKEN_DECREMENT
%token INT_TYPE FLOAT_TYPE T_MATRIX
%left LEFT_P RIGHT_P
%left TOKEN_DECREMENT TOKEN_INCREMENT
%left U_OP
%left LEFT_C RIGHT_C
%left T_PLUS T_MINUS
%left T_MUL T_DIV 
%type<expr> NUM
%type<expr> expression


/*  Control structures  */
%type<quad> condition
%type<quad> conditions
%type<quad> statement_compound
%type<quad> conditional_statement
%type<quad> conditional_statement_else
%type<quad> input

%type<quad> inline_statement
%type<quad> statement

%type<quad> cm_if
%type<quad> cm_else
%type<quad> am
%type<quad> om


%%

input: input statement 
    {
        // printf("conditional_statement\n");
        // print_stack(quadStack);
        // printf("conditional_statement\n");
        // print_stack(quadStack);
        // printf("temp\n");
        // print_quad(temp);
        // printf("quadlist\n");
        // print_quad_list(quads);
        for (int i = 0; i < 10; i++) {
            if (!is_empty(quadStack)) {
                print_stack(quadStack);
                printf("list\n");
                print_quad_list($2);
                quadruplet temp = pop_stack(quadStack);
                gencode($2, temp);
            }
        }
    }
    | {;}
    ;

statement: inline_statement statement
    {
        /**
        /* $$ = statement; S
        /* $1 = inline_statement; S(1)
        **/
        $$ = concat($1, $2);
        $$->label = nextquad;
        $$->quad = $1->quad;
    }
    | conditional_statement statement
    {
        /**
        /* $$ = statement; S
        /* $1 = conditional_statement; S(1)
        **/
        $$ = concat($1, $2);
        $$->label = nextquad;
        $$->quad = $1->quad;
    }
    |
    {
        /**
        /* $$ = statement; S
        **/
        quadruplet empty_quad = create_quad(QUAD_EMPTY, NULL, NULL, NULL);
        quadlist empty_quad_list = crelist(nextquad);
        empty_quad_list->quad = empty_quad;
        // quads = concat(quads, empty_quad_list);
        $$ = empty_quad_list;
    }
    ;

conditional_statement: T_IF cm_if LEFT_P conditions RIGHT_P statement_compound cm_else conditional_statement_else
    { 
        /**
        /* $$ = conditional_statement; S
        /* $1 = T_IF; 
        /* $2 = cm_if; M
        /* $3 = LEFT_P; 
        /* $4 = conditions; E 
        /* $5 = RIGHT_P; 
        /* $6 = statement_compound; S(1)
        /* $7 = cm_else; N
        /* $8 = conditional_statement_else; X
        **/
        quadruplet if_quad = create_quad(
            IF,                             // if
            int_to_string($4->label),       // condition
            int_to_string($6->label),       // true node
            int_to_string($8->label)        // false node
        );
        quadlist q = concat($4, $6);
        q = concat(q, $8);
        // quads = concat(quads, q);
        push_stack(quadStack, if_quad);
        $$ = q;
    }
    ;

/* condition marker for if statement */
cm_if:

    {
        /**
        /* $$ = cm_if; M
        **/
    }
    ;

/* condition marker for else statement */
cm_else:

    {
        /**
        /* $$ = cm_else; N
        **/
    }
    ;

conditional_statement_else: T_ELSE statement_compound 
    { 
        /**
        /* $$ = conditional_statement_else; X
        /* $1 = T_ELSE;
        /* $2 = statement_compound; S(1)
        **/
        $$ = $2;
    }
    |
    { 
        /**
        /* $$ = conditional_statement_else; X
        **/
        quadruplet empty_quad = create_quad(QUAD_EMPTY, NULL, NULL, NULL);
        quadlist empty_quad_list = crelist(nextquad);
        empty_quad_list->quad = empty_quad;
        // quads = concat(quads, empty_quad_list);
        $$ = empty_quad_list;
    }
    ;

statement_compound: LEFT_C statement RIGHT_C 
    { 
        /**
        /* $$ = statement_compound; S(1)
        /* $1 = LEFT_C; 
        /* $2 = input; S
        /* $3 = RIGHT_C; 
        **/
        // statement can be an ast or a quadlist
        $$ = $2;
    }
    | LEFT_C RIGHT_C 
    { 
        /**
        /* $$ = statement_compound; S(1)
        /* $1 = LEFT_C; 
        /* $2 = RIGHT_C; 
        **/
        quadruplet empty_quad = create_quad(QUAD_EMPTY, NULL, NULL, NULL);
        quadlist empty_quad_list = crelist(nextquad);
        empty_quad_list->quad = empty_quad;
        // quads = concat(quads, empty_quad_list);
        $$ = empty_quad_list;
    }
    ;

conditions: condition 
    { 
        /**
        /* $$ = conditions; E
        /* $1 = condition; E(1)
        **/
        $$ = $1;
    }
    | condition T_AND am condition
    { 
        /**
        /* $$ = condition; E
        /* $1 = condition; E(1)
        /* $2 = T_AND; et
        /* $3 = am; M
        /* $4 = condition; E(2)
        **/
    }
    | condition T_OR om condition
    { 
        /**
        /* $$ = condition; E
        /* $1 = condition; E(1)
        /* $2 = T_OR; ou
        /* $3 = om; M
        /* $4 = condition; E(2)
        **/
    }
    | T_NOT condition 
    { 
        /**
        /* $$ = condition; E
        /* $1 = T_NOT; non
        /* $2 = condition; E(1)
        **/
    }
    ;

/* and marker */
am:

    {
        /**
        /* $$ = am; M
        **/
    }
    ;

/* or marker */
om:

    {
        /**
        /* $$ = om; M
        **/
    }
    ;

condition: expression T_EQUAL expression 
    { 
        /**
        /* $$ = condition; E
        /* $1 = expression; E(1)
        /* $2 = T_EQUAL; =
        /* $3 = expression; E(2)
        **/
        quadruplet equal_quad = create_quad(QUAD_EQUAL, float_to_string($1->value), float_to_string($3->value), NULL);
        quadlist equal_quad_list = crelist(nextquad);
        equal_quad_list->quad = equal_quad;
        equal_quad_list->label = nextquad;
        // quads = concat(quads, equal_quad_list);
        $$ = equal_quad_list;
    }
    | expression T_NOT_EQUAL expression 
    {

    }
    | expression T_GREATER expression 
    { 
        
    }
    | expression T_LESS expression 
    { 
        
    }
    | expression T_GREATER_EQUAL expression 
    { 
        
    }
    | expression T_LESS_EQUAL expression 
    { 
        
    }
    ;

inline_statement: PRIMITIVE_TYPE IDENT AFF expression SEMICOLON 
    {
        if(RESULT_REGISTER == INTEGER_REG) insertSymbol($2, INTEGER );
        else insertSymbol($2, FLOAT );
        T* i_statement = create_variable($2);
        if(RESULT_REGISTER == INTEGER_REG) {
            ast = create_expr(INTEGER_ASSIGNMENT, $4, i_statement);
            dataSec->integersArraySize++;
        }
        else if(RESULT_REGISTER == FLOAT_REG) {
            ast = create_expr(FLOAT_ASSIGNMENT, $4, i_statement);
            dataSec->floatsArraySize++;
        }
        // generate_mips(ast);
        ast_array[ast_index] = ast;
        quadruplet inline_ast_quad = create_quad(QUAD_AST_INLINE, int_to_string(ast_index), NULL, NULL);
        ast_index++;
        quadlist inline_ast_quad_list = crelist(nextquad);
        inline_ast_quad_list->quad = inline_ast_quad;
        inline_ast_quad_list->label = nextquad;
        // quads = concat(quads, inline_ast_quad_list);
        $$ = inline_ast_quad_list;
    }
    | PRIMITIVE_TYPE IDENT SEMICOLON {
        if(RESULT_REGISTER == INTEGER_REG) insertSymbol($2, INTEGER );
        else insertSymbol($2, FLOAT );
        T* i_statement = create_variable($2);
        if(RESULT_REGISTER == INTEGER_REG) ast = create_expr(INTEGER_ASSIGNMENT, NULL, i_statement);
        else if(RESULT_REGISTER == FLOAT_REG) {ast = create_expr(FLOAT_ASSIGNMENT, NULL, i_statement);}
        generate_mips(ast);
        // quadruplet empty_quad = create_quad(QUAD_EMPTY, NULL, NULL, NULL);
        // quadlist empty_quad_list = crelist(nextquad);
        // empty_quad_list->quad = empty_quad;
        // $$ = empty_quad_list;
    }
    | IDENT AFF expression SEMICOLON {
        T* i_statement = create_variable($1);
        if(RESULT_REGISTER == INTEGER_REG) ast = create_expr(INTEGER_ASSIGNMENT, $3, i_statement);
        if(RESULT_REGISTER == FLOAT_REG) ast = create_expr(FLOAT_ASSIGNMENT, $3, i_statement);
        generate_mips(ast);
        // quadruplet empty_quad = create_quad(QUAD_EMPTY, NULL, NULL, NULL);
        // quadlist empty_quad_list = crelist(nextquad);
        // empty_quad_list->quad = empty_quad;
        // $$ = empty_quad_list;
    }
    ;

expression: 
    LEFT_P expression RIGHT_P { $$ = $2 ;}
    | expression T_MUL expression %prec  T_MUL {
        if(RESULT_REGISTER == INTEGER_REG) $$ = create_expr( INTEGER_MUL, $1, $3);
        if(RESULT_REGISTER == FLOAT_REG) $$ = create_expr( FLOAT_MUL, $1, $3);
        if(ast == NULL) ast = $$;
        else {
            ast = $$ ;
        }
        }
    | expression T_PLUS expression   {
    if(RESULT_REGISTER == FLOAT_REG) $$ = create_expr( FLOAT_ADD, $1, $3);
    else $$ = create_expr( INTEGER_ADD, $1, $3);
    if(ast == NULL) ast = $$;
    else ast = $$;


 }
    | expression T_DIV expression  %prec T_DIV {
        if(($3->type == INT_CONSTANT || $3->type == FLOAT_CONSTANT) && $3->value == 0 ) {
            fprintf(stderr, "Warining: division by zero at line\n");
        }
        if(RESULT_REGISTER == INTEGER_REG) $$ = create_expr( INTEGER_DIV, $1, $3);
        if(RESULT_REGISTER == FLOAT_REG) $$ = create_expr( FLOAT_DIV, $1, $3);
        if(ast == NULL) ast = $$;
        else ast = $$;
         }
    | expression T_MINUS expression {
        if(RESULT_REGISTER == FLOAT_REG) $$ =  create_expr( FLOAT_SUB, $1, $3);
        else $$ = create_expr( INTEGER_SUB, $1, $3);
        if(ast == NULL) ast = $$;
        else ast = $$;
         }
    | NUM  {$$ = $1;if(ast!=NULL) ast = create_expr(INT_CONSTANT, ast, $$);}
    | IDENT {
            
            if(RESULT_REGISTER == INTEGER_REG) $$ = create_var_node(VARIABLE_INT, $1);
            else if(RESULT_REGISTER == FLOAT_REG) $$ = create_var_node(VARIABLE_FLOAT, $1);
            else {
                if(getType($1) == INTEGER) {
                    $$ = create_var_node(VARIABLE_INT, $1);
                    RESULT_REGISTER = INTEGER_REG;
                }
                if(getType($1) == FLOAT) {
                    $$ = create_var_node(VARIABLE_FLOAT, $1);
                    RESULT_REGISTER = FLOAT_REG;
                }
            }
            
    }
    | IDENT TOKEN_INCREMENT {$$ = create_var_node(POST_INCREMENT, $1);}
    | TOKEN_INCREMENT IDENT {$$ = create_var_node(PRE_INCREMENT, $2);}
    | IDENT TOKEN_DECREMENT {$$ = create_var_node(POST_DECREMENT, $1);}
    | TOKEN_DECREMENT IDENT {$$ = create_var_node(PRE_DECREMENT, $2);}
    | T_MINUS expression %prec U_OP  {
        if(RESULT_REGISTER == INTEGER) {
                $$ = create_numeric_constant(INT_CONSTANT, 0);   
                $$ = create_expr( INTEGER_SUB, $$, $2);
                
            } 
            else {
                $$ = create_numeric_constant(FLOAT_CONSTANT, 0);   
                $$ = create_expr( FLOAT_SUB, $$, $2);
            }
        }
    | T_PLUS expression %prec U_OP  {
            if(RESULT_REGISTER == INTEGER) {
                $$ = create_numeric_constant(INT_CONSTANT, 0);   
                $$ = create_expr( INTEGER_SUB, $$, $2);
                
            } 
            else {
                $$ = create_numeric_constant(FLOAT_CONSTANT, 0);   
                $$ = create_expr( FLOAT_SUB, $$, $2);
            }
        }
    ;




NUM: T_INTEGER_CONSTANT {
        $$ = create_numeric_constant(INT_CONSTANT, $1);   
        if(RESULT_REGISTER == FLOAT_REG ) add_element(&dataSec->floatNames, $1);
    }
    | T_FLOAT_CONSTANT {
        if(RESULT_REGISTER == FLOAT_REG ) $$ = create_numeric_constant(FLOAT_CONSTANT, $1);
        if(RESULT_REGISTER == INTEGER_REG)  $$ = create_numeric_constant(INT_CONSTANT, $1);
        add_element(&dataSec->floatNames, $1);
        }
    ;

PRIMITIVE_TYPE : 
    INT_TYPE {RESULT_REGISTER = INTEGER_REG;}
    | FLOAT_TYPE {RESULT_REGISTER = FLOAT_REG;}
    ;



%%
void yyerror(const char* s) {
    printf("Error: %s\n", s);
}

int main(int argc, char** argv) {

    /*
    int a = 1;
    int b = a + 1;
    int d = 0
    if (1) {
        int c = a + b;
        int a = 3;
    } else {
        int b = 2;
        if (1) d = 1;
    }
*/
    
    initializeScopeTree();
    insertSymbol("wertyui", INTEGER);
    insertSymbol("b", INTEGER);
    insertSymbol("d", INTEGER);
    newScope();
    insertSymbol("c", INTEGER);
    insertSymbol("a", INTEGER);
    printf("Find a : %d\n", findSymbolGlobal("c"));

    popScope();
    newScope();
    insertSymbol("b", INTEGER);
    newScope();
    insertSymbol("d", INTEGER);
    popScope();
    popScope();
    printf("Find a : %d\n", findSymbolGlobal("a"));
    printf("Find b : %d\n", findSymbolGlobal("b"));
    printf("Find c : %d\n", findSymbolGlobal("c"));
    printf("Find d : %d\n", findSymbolGlobal("d"));
    printf("Find wertyui : %d\n", findSymbolGlobal("wertyui"));

    

    printEntireSymbolTable();


    return 0;
}