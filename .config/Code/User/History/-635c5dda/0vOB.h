#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_SYMBOLS 100
#define SYM_LEN 64



struct Symbol {
    char name[64];
    int type;
};

typedef struct Scope {
    Symbol symbolTable[MAX_SYMBOLS];
    struct Scope *parentScope;
} TableSymScope;

typedef struct ScopeStack {
    TableSymScope *currentScope;
}ScopeStack;


extern ScopeStack SS;
void initializeScopeStack();
void initializeScope(TableSymScope *scope, TableSymScope *parent);
void initializeSymbol(Symbol *sym);

void newScope();
void popScope();

void insertSymbol(char* name, int type);
int findSymbol(char* name);

int hash(char* identifier);



/*
struct Symbol symbolTable[MAX_SYMBOLS];

void initializeSymbolTable();
int hash(char* identifier);
void insertSymbol(char* name, int type);
int findSymbol(char* name);
void printSymbolTable(); */

