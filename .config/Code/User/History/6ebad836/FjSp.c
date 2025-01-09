#include "sym_tab.h"

int fetchAdd(int num, SYMBOLTYPE type) {
    if (num == 0) {
        return 0;
    } else if (type == INTEGER) {
        return num * 4;
    }
    else if(type == FLOAT) {
        return num * 8;
    }
    return num * 4;
}

int hash(char* str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    }

    return hash % MAX_SYMBOLS;
}


ScopeTree ST = {NULL};

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
    scope->numSymbols = 0;
    scope->numChildren = 0;
}

void initializeScopeTree() {
    TableSymScope *root = (TableSymScope *)malloc(sizeof(TableSymScope));
    initializeScope(root, NULL);
    ST.root = root;
    ST.currentScope = root;
}


void newScope() {
    if (ST.currentScope->numChildren == MAX_CHILDREN) {
        printf("Error: Maximum number of children scopes reached\n");
        return;
    }

    TableSymScope *scope = (TableSymScope *)malloc(sizeof(TableSymScope));
    initializeScope(scope, ST.currentScope);
    ST.currentScope->childrenScope[ST.currentScope->numChildren] = scope;
    ST.currentScope->numChildren++;
    ST.currentScope = scope;
}

void popScope() {
    ST.currentScope = ST.currentScope->parentScope;
}



void insertSymbol(char* name, SYMBOLTYPE type) {
    int index = hash(name);
    int originalIndex = index;
    Symbol *sym = &(ST.currentScope->symbolTable[index]);
    while (sym->type != -1) {
        if (strcmp(sym->name, name) == 0) {
            printf("Error: Identifier '%s' already exist in the symbol table\n", name);
            return;
        }
        index = (index + 1) % MAX_SYMBOLS;
        if (index == originalIndex) {
            printf("Error: Symbol table is full\n");
            return;
        }
        sym = &(ST.currentScope->symbolTable[index]);
    }
    
    strcpy(sym->name, name);
    sym->type = type;
    if(type == INTEGER) {
        sym->address = fetchAdd(ST.currentScope->numSymbols, type);
        ST.currentScope->numSymbols++;
    }
    if(type == FLOAT) {
        sym->address = fetchAdd(ST.currentScope->floatSymbols, type);
        ST.currentScope->floatSymbols++;
    }
}

int findSymbol(char* name) {
    int index = hash(name);
    int originalIndex = index;
    Symbol *sym = &(ST.currentScope->symbolTable[index]);
    
    while (sym->type != -1) {
        if (strcmp(sym->name, name) == 0) {
            return sym->address;
        }
        index = (index + 1) % MAX_SYMBOLS;
        if (index == originalIndex) {
            return -1;
        }
        sym = &(ST.currentScope->symbolTable[index]);
    }
    
    return -1;
}



int findSymbolGlobal(char* name) {
    TableSymScope *scope = ST.currentScope;
    while (scope != NULL) {
        int index = hash(name);
        int originalIndex = index;
        Symbol *sym = &(scope->symbolTable[index]);
        
        while (sym->type != -1) {
            if (strcmp(sym->name, name) == 0) {
                return sym->address;
            }
            index = (index + 1) % MAX_SYMBOLS;
            if (index == originalIndex) {
                return -1;
            }
            sym = &(scope->symbolTable[index]);
        }
        scope = scope->parentScope;
    }
    
    return -1;
}

void printSymbolTable(TableSymScope *scope, int depth) {
    if (scope == NULL) {
        return;
    }

    // Indenter pour visualiser la hiérarchie des scopes
    for (int i = 0; i < depth; i++) {
        printf("  ");
    }
    printf("Scope: %p\n", scope);

    // Imprimer les symboles de ce scope
    for (int i = 0; i < scope->numSymbols; i++) {
        Symbol *sym = &(scope->symbolTable[i]);
        for (int j = 0; j < depth; j++) {
            printf("  ");
        }
        printf("Name: %s, Type: %d, Address: %d\n", sym->name, sym->type, sym->address);
    }

    // Appel récursif pour imprimer les tables des scopes enfants
    for (int i = 0; i < scope->numChildren; i++) {
        printSymbolTable(scope->childrenScope[i], depth + 1);
    }
}

void printEntireSymbolTable() {
    TableSymScope *scope = ST.currentScope;
    while (scope != NULL) {
        printf("Scope: %p\n", scope);
        for (int i = 0; i < MAX_SYMBOLS; i++) {
            Symbol *sym = &(scope->symbolTable[i]);
            if (sym->type != -1) {
                printf("Name: %s, Type: %d, Address: %d\n", sym->name, sym->type, sym->address);
            }
        }
        scope = scope->parentScope;
    }
}

int getType(char* name) {
    TableSymScope *scope = ST.currentScope;
    while (scope != NULL) {
        int index = hash(name);
        int originalIndex = index;
        Symbol *sym = &(scope->symbolTable[index]);
        
        while (sym->type != -1) {
            if (strcmp(sym->name, name) == 0) {
                return sym->type;
            }
            index = (index + 1) % MAX_SYMBOLS;
            if (index == originalIndex) {
                return -1; // Not found or symbol table full
            }
            sym = &(scope->symbolTable[index]);
        }
        scope = scope->parentScope;
    }
    return -1; // Not found in any scope
}