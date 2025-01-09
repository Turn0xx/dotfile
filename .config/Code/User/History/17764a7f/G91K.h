#ifndef _SYM_TAB_H_
#define _SYM_TAB_H_


#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_SYMBOLS 100
#define MAX_CHILDREN 100
#define SYM_LEN 64

typedef enum symboltype {
    INTEGER,
    FLOAT,
    // others
} SYMBOLTYPE;
int fetchAdd(int num, SYMBOLTYPE type);

typedef struct Symbol {
    char name[SYM_LEN];
    SYMBOLTYPE type;
    int address;
} Symbol;

typedef struct Scope {
    Symbol symbolTable[MAX_SYMBOLS];
    int numSymbols;
    int floatSymbols; 
    struct Scope *parentScope;
    struct Scope *childrenScope[MAX_CHILDREN];
    int numChildren;
} TableSymScope;


typedef struct ScopeTree {
    TableSymScope *root;
    TableSymScope *currentScope;
} ScopeTree;




extern ScopeTree ST;

void initializeScopeTree();
void initializeScope(TableSymScope *scope, TableSymScope *parent);
void initializeSymbol(Symbol *sym);

void newScope();
void popScope();

void insertSymbol(char* name, SYMBOLTYPE type);
int findSymbol(char* name);
int findSymbolGlobal(char* name);

int hash(char* identifier);

void printEntireSymbolTable();


/*
struct Symbol symbolTable[MAX_SYMBOLS];

void initializeSymbolTable();
int hash(char* identifier);
void insertSymbol(char* name, int type);
int findSymbol(char* name);
void printSymbolTable(); */
int getType(char* name);
#endif

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

int main {
    initializeScopeTree();
    insertSymbol("a", INTEGER);
    insertSymbol("b", INTEGER);
    insertSymbol("d", INTEGER);
    newScope();
    insertSymbol("c", INTEGER);
    insertSymbol("a", INTEGER);
    popScope();
    newScope();
    insertSymbol("b", INTEGER);
    insertSymbol("d", INTEGER);
    popScope();
    popScope();
}