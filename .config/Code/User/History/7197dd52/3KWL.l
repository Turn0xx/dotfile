%option noyywrap

DIGIT [0-9]
LETTER [_a-zA-Z]
IDENT {LETTER}{LETTER}{DIGIT}*
INTEGER [-+]?{DIGIT}+
FRACTION \.{DIGIT}+
EXPONENT [Ee][+\-]?{DIGIT}+
FLOAT {INTEGER}?{FRACTION}{EXPONENT}?|{INTEGER}{EXPONENT}
STRING \"(\\.|[^\"])*\"

%x COMMENT

%%

<INITIAL>"//".*               { printf("COMMENT_LINE %s\n", yytext); }
<INITIAL>"/*"                 { BEGIN(COMMENT); }
<COMMENT>"*/"                 { printf("COMMENT_END\n"); BEGIN(INITIAL); }
<COMMENT>.|\n                 { printf("COMMENT_CONTENT %s\n", yytext); }

{IDENT}"++"                   { printf("IDENT TOKEN_INCREMENT "); }
{IDENT}"--"                   { printf("IDENT TOKEN_DECREMENT "); }
"++"{IDENT}                   { printf("TOKEN_INCREMENT IDENT "); }
"--"{IDENT}                   { printf("TOKEN_DECREMENT IDENT "); }

"return"                      { printf("T_RETURN "); }
"="                           { printf("AFF "); }
"if"                          { printf("T_IF "); }
"else"                        { printf("T_ELSE "); }
"("                           { printf("LEFT_P "); }
")"                           { printf("RIGHT_P "); }
"{"                           { printf("LEFT_C "); }
"}"                           { printf("RIGHT_C "); }
"int"                         { printf("INT_TYPE "); }
"float"                       { printf("FLOAT_TYPE "); }
"for"                         { printf("T_FOR "); }
"while"                       { printf("T_WHILE "); }
"matrix"                      { printf("T_MATRIX "); }
"~"                           { printf("T_MATRIX_INVERSE "); }
"["                           { printf("LEFT_B "); }
"]"                           { printf("RIGHT_B "); }
";"                           { printf("SEMICOLON "); }
","                           { printf("COMMA "); }

"-"                           { printf("T_MINUS "); }
"+"                           { printf("T_PLUS "); }
"*"                           { printf("T_MUL "); }
"/"                           { printf("T_DIV "); }

{INTEGER}                     { printf("T_INTEGER_CONSTANT "); }
{FLOAT}                       { printf("T_FLOAT_CONSTANT "); }
{IDENT}                       { printf("IDENT "); }
{STRING}                      { printf("STRING_LITERAL "); }

[ \t\n]+                      { ; /* Ignorer les espaces blancs */ }

.                             { printf("UNEXPECTED CHARACTER: %s\n", yytext); } /* Gestion des erreurs */

%%

/* ... Votre code principal reste inchangé ... */



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
