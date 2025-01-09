#include "sym_tab.h"


int hash(char* str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    }

    return hash % MAX_SYMBOLS;
}


void insertSymbol(char* name, int type) {
    int index = hash(name);
    int originalIndex = index;
    while (symbolTable[index].name[0] != '\0') {
        if (strcmp(symbolTable[index].name, name) == 0) {
            printf("Error: Identifier '%s' already exists in the symbol table\n", name);
            return;        }
        index = (index + 1) % MAX_SYMBOLS;
        if (index == originalIndex) {
            printf("Error: Symbol table is full\n");
            return;        }
    }
    strcpy(symbolTable[index].name, name);
    symbolTable[index].type = type;
}
int findSymbol(char* name) {
    int index = hash(name);
    while (symbolTable[index].name[0] != '\0') {
        if (strcmp(symbolTable[index].name, name) == 0) {
            return symbolTable[index].type;
        }
        index = (index + 1) % MAX_SYMBOLS;
    }
    return -1;
}

void initializeScope(TableSymScope *scope, TableSymScope *parent) {
    for (int i = 0; i < MAX_SYMBOLS; i++) {
        if (symbolTable[i].name[0] != '\0') {
            printf("Index %d: Name = %s, Type = %d\n", i, symbolTable[i].name, symbolTable[i].type);
        }
    }
}