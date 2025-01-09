%option noyywrap


IDENT [_a-zA-Z][_a-zA-Z0-9]*
INTEGER [-+]?[0-9]+
FLOAT [-+]?[0-9]*"."[0-9]+["E"|"e"]?["\-"|"+"]?[0-9]*["f"|"F"]?
DIGIT [0-9]
LETTER [_a-zA-Z]
FRACTION \.{DIGIT}+
EXPONENT [Ee][+\-]?{DIGIT}+
STRING \"(\\.|[^\"])*\"


%x COMMENT



%%
<INITIAL>"//".*                { printf("COMMENT_LINE %s\n", yytext); }
<INITIAL>"/*"                 { BEGIN(COMMENT); }
<COMMENT>"*/"                 { printf("COMMENT_END\n"); BEGIN(INITIAL); }
<COMMENT>.|\n                 { printf("COMMENT_CONTENT %s\n", yytext); }

"return" { printf("T_RETURN ");}
"=" { printf("AFF "); }
"if" { printf("T_IF "); }
"else" { printf("T_ELSE "); }
"(" { printf("LEFT_P "); }
")" { printf("RIGHT_P "); }
"{"      { printf("LEFT_C "); }
"}" { printf("RIGHT_C "); }
"[" { printf("LEFT_B "); }
"]" { printf("RIGHT_B "); }
"int" { printf("INT_TYPE "); }
"float" { printf("FLOAT_TYPE "); }

"for" { printf("T_FOR "); }
"while" { printf("T_WHILE "); }
"matrix" { printf("T_MATRIX "); }
"~"                            { printf("T_MATRIX_INVERSE "); }
";"                           { printf("SEMICOLON "); }
","                           { printf("COMMA "); }


"-" { printf("T_MINUS "); }
"+" { printf("T_PLUS "); }
"*" { printf("T_MUL ") ; }
"/" { printf("T_DIV ") ; }

{INTEGER} { printf("T_INTEGER_CONSTANT "); }
{FLOAT} { printf("T_FLOAT_CONSTANT ") ; }

{IDENT} { printf("IDENT "); }
{IDENT}"++" {printf("IDENT TOKEN_INCREMENT "); }
"++"{IDENT} { printf("TOKEN_INCREMENT IDENT "); }
{IDENT}"--" { printf("IDENT TOKEN_DECREMENT "); }
"--"{IDENT} { printf("TOKEN_DECREMENT IDENT "); }

[ \t]* {;}
[\n][\n]+ { ; }

%%


int main(int argc , char** argv){
    FILE *file = fopen(argv[1] , "r");
    if (!file) {
        fprintf(stderr, "Failed to open file: %s\n", argv[1]);
        return 1;
    }

    yyin = file;
    yylex();
    printf("\n");
    fclose(file);

    return 0;
}
