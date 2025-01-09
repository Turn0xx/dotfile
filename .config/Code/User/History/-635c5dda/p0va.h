#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_SYMBOLS 100
#define SYM_LEN 64

int fetchAdd(int num);

typedef struct Symbol {
    char name[SYM_LEN];
    int type;
    int address;
} Symbol;

typedef struct Scope {
    Symbol symbolTable[MAX_SYMBOLS];
    int numSymbols;
    struct Scope *parentScope;
} TableSymScope;

typedef struct ScopeStack {
    TableSymScope *currentScope;
}ScopeStack;


extern ScopeStack SS;
voidprintf("\nRecherche d'un symbole :\n");
    int type = findSymbol("globalVar1");
    if (type != -1) {
        printf("Symbole trouvé. Type : %d\n", type);
    } else {
        printf("Symbole non trouvé.\n");
    } initializeScopeStack();
void initializeScope(TableSymScope *scope, TableSymScope *parent);
void initializeSymbol(Symbol *sym);

void newScope();
void popScope();

void insertSymbol(char* name, int type);
int findSymbol(char* name);
int findSymbolFromScope(char* name, TableSymScope *scope);

int hash(char* identifier);

void printEntireSymbolTable();




/*
struct Symbol symbolTable[MAX_SYMBOLS];

void initializeSymbolTable();
int hash(char* identifier);
void insertSymbol(char* name, int type);
int findSymbol(char* name);
void printSymbolTable(); */

