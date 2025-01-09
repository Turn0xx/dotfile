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





// void initializeSymbolTable() {
//     for (int i = 0; i < MAX_SYMBOLS; i++) {
//         symbolTable[i].name[0] = '\0';
//     }
// }

// int hash(char* identifier) {
//     int hashVal = 0;
//     while (*identifier) {
//         hashVal = (hashVal * 30) + *identifier;
//         identifier++;
//     }
//     return abs(hashVal % MAX_SYMBOLS);
// }


// void insertSymbol(char* name, int type) {
//     int index = hash(name);
//     int originalIndex = index;
//     while (symbolTable[index].name[0] != '\0') {
//         if (strcmp(symbolTable[index].name, name) == 0) {
//             printf("Error: Identifier '%s' already exists in the symbol table\n", name);
//             return;        }
//         index = (index + 1) % MAX_SYMBOLS;
//         if (index == originalIndex) {
//             printf("Error: Symbol table is full\n");
//             return;        }
//     }
//     strcpy(symbolTable[index].name, name);
//     symbolTable[index].type = type;
// }
// int findSymbol(char* name) {
//     int index = hash(name);
//     while (symbolTable[index].name[0] != '\0') {
//         if (strcmp(symbolTable[index].name, name) == 0) {
//             return symbolTable[index].type;
//         }
//         index = (index + 1) % MAX_SYMBOLS;
//     }
//     return -1;
// }

// void printSymbolTable() {
//     printf("Symbol Table:\n");
//     for (int i = 0; i < MAX_SYMBOLS; i++) {
//         if (symbolTable[i].name[0] != '\0') {
//             printf("Index %d: Name = %s, Type = %d\n", i, symbolTable[i].name, symbolTable[i].type);
//         }
//     }
// }