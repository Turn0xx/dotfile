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
void initializeScopeStack();

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