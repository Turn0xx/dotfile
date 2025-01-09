#include "sym_tab.h"


int hash(char* str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    }

    return hash % MAX_SYMBOLS;
}


ScopeStack SS = {NULL};

void initializeSymbol(Symbol *sym) {
    sym->name[0] = '\0';
    sym->type = -1;
    sym->address = -1;
}

void initializeScope(TableSymScope *scope, TableSymScope *parent) {
    for (int i = 0; i < MAX_SYMBOLS; i++) {
        initializeSymbol(&(scope->symbolTable[i]));
    }
    scope->parentScope = parent;
}

void initializeScopeStack() {
    TableSymScope *globalScope = (TableSymScope *)malloc(sizeof(TableSymScope));
    initializeScope(globalScope, NULL);
    SS.currentScope = globalScope;
}

void newScope() {
    TableSymScope *newScope = (TableSymScope *)malloc(sizeof(TableSymScope));
    initializeScope(newScope, SS.currentScope);
    SS.currentScope = newScope;
}

void popScope() {
    TableSymScope *oldScope = SS.currentScope;
    SS.currentScope = SS.currentScope->parentScope;
    free(oldScope);
}

void insertSymbol(char* name, int type) {
    int index = hash(name);
    Symbol *sym = &(SS.currentScope->symbolTable[index]);
    while (sym->type != -1) {
        index = (index + 1) % MAX_SYMBOLS;
        sym = &(SS.currentScope->symbolTable[index]);
    }
    strcpy(sym->name, name);
    sym->type = type;
    sym->address = -1;
}