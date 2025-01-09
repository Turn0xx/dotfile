%{
#include <stdio.h>
#include "sym_tab.h"
extern int yylex();
extern int yyparse();
int type;
void yyerror(const char* s);
%}

%union {
    float floatval;
    int intval;
    char* strval;
}

%token <strval> IDENT
%token AFF 
%token INT_TYPE
%token FLOAT_TYPE 
%token T_MATRIX
%token T_INTEGER_CONSTANT T_FLOAT_CONSTANT STRING_LITERAL
%token LEFT_P RIGHT_P SEMICOLON RIGHT_C LEFT_C RIGHT_B LEFT_B COMMA
%token T_PLUS T_MINUS T_MUL T_DIV T_MATRIX_INVERSE
%token T_RETURN T_WHILE T_IF T_ELSE T_FOR
%token TOKEN_INCREMENT TOKEN_DECREMENT

%left T_PLUS T_MINUS
%left T_MUL T_DIV
%left LEFT_P RIGHT_P

%%

input: input 
    | 
    ;
/*

statement: INT_TYPE IDENT ASSIGN SEMICOLON { insertSymbol($2, 0);
					     printSymbolTable();}  // quick test
	 | FLOAT_TYPE IDENT ASSIGN SEMICOLON { insertSymbol($2, 1);    
					       printSymbolTable();}  
         | IDENT ASSIGN SEMICOLON
         ;

ASSIGN: AFF expression
    |
    ;
    

expression: term
    | expression T_PLUS expression
    | expression T_MINUS expression
    | expression T_MUL expression
    | expression T_DIV expression
    | LEFT_P expression RIGHT_P
    ; // an expression should not be empty - prevents float a = b/; for instance

term: T_INTEGER_CONSTANT
    | T_FLOAT_CONSTANT
    | UNARY_OP IDENT
    | IDENT UNARY_OP
    | IDENT
    ;

UNARY_OP: TOKEN_INCREMENT
    | TOKEN_DECREMENT
    ; */


%%
void yyerror(const char* s) {
    printf("Error: %s\n", s);
}

int main(int argc, char** argv) {
    /* yyparse(); */

    initializeScopeStack();

    insertSymbol("globalVar1", 1);
    insertSymbol("globalVar2", 2);

    newScope();
    insertSymbol("localVar1", 1);
    insertSymbol("localVar2", 2);

  
    // Tester l'insertion d'un symbole déjà existant
    printf("\nTest d'insertion d'un symbole en double :\n");
    insertSymbol("globalVar1", 1); // Devrait indiquer une erreur


    printf("\nRecherche d'un symbole :\n");
    int type = findSymbol("globalVar1");
    if (type != -1) {
        printf("Symbole trouvé. Index : %d\n", type);
    } else {
        printf("Symbole non trouvé.\n");
    }

    printEntireSymbolTable();

    return 0;
}
