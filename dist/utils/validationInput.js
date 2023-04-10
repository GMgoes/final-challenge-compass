"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyProperties = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/*Função para validar se um objeto possuí a mesma quantidade de atributos que outro objeto
e se o nome das propriedades são as mesmas */
const verifyProperties = (objectBody, objectExpected) => {
    // Valida quantidade de propriedades
    if (Object.keys(objectBody).length == Object.keys(objectExpected).length) {
        // Manipulação das propriedades dos objetos
        const propertiesBody = Object.keys(objectBody);
        const propertiesExpected = Object.keys(objectExpected);
        for (let i = 0; i < propertiesExpected.length; i++) {
            /* Se a propriedade obtida existe nas propriedades do objeto esperado
            se não tiver retorna -1, se tiver substitui por uma string vazia */
            if (propertiesExpected.indexOf(propertiesBody[i]) != -1) {
                propertiesExpected[propertiesExpected.indexOf(propertiesBody[i])] = '';
            }
            else {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
};
exports.verifyProperties = verifyProperties;
