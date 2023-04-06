import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';
/* Função para verificar a idade da pessoa,
retorna a diferença de idade da data de nascimento até agora */
const verifyDate = function (datePassed: string) {
  const dateToVerify = Date.parse(datePassed);

  const today = new Date();

  const diferenceMs = Date.parse(today.toLocaleDateString()) - dateToVerify;
  const diferenceYears = Math.trunc(diferenceMs / (1000 * 60 * 60 * 24 * 365));

  return diferenceYears;
};
/* Função para obter as informações de regiões segundo o CEP informado,
 retorna o objeto repassado pelo ViaCEP */
const obtainCEP = async function (urlCEP: string) {
  const responseObject = await axios.get(urlCEP).then((response) => {
    return response.data;
  });
  return responseObject;
};
// Função para verificar se um CPF é válido, retorna true ou false
const verifyCPF = function (cpfToVerify: string) {
  if (
    formatCPF(cpfToVerify)[9] == verifyDigit(10, cpfToVerify) &&
    formatCPF(cpfToVerify)[10] == verifyDigit(11, cpfToVerify) &&
    formatCPF(cpfToVerify).length == 11
  ) {
    return true;
  } else {
    return false;
  }
};
// Função que retorna o CPF formatado (Sem pontos e virgulas até o momento)
function formatCPF(cpf: string) {
  let format = cpf.replaceAll('-', ' ');
  format = format.replaceAll('.', ' ');
  format = format.replaceAll(' ', '');
  const vectorCPF = [];

  for (let i = 0; i < format.length; i++) {
    vectorCPF[i] = parseInt(format[i]);
  }
  return vectorCPF;
}
// Função que verifica dinamicamente os digitos calculaveis do CPF (10° e 11° dígito), retorna true ou false
function verifyDigit(weight: number, cpfToVerify: string) {
  const vector = formatCPF(cpfToVerify);
  const length = weight - 1;
  let sum = 0,
    rest = 0,
    digit = 0;

  for (let i = 0; i < length; i++) {
    sum = sum + vector[i] * weight;
    weight--;
  }
  rest = sum % 11;
  if (rest < 2) {
    digit = 0;
  } else {
    digit = 11 - rest;
  }
  return digit;
}
// Função que valida se um ID repassado (String) é um ObjectID segundo as definições do MongoDB
function isValidObjectId(id: string) {
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}
// Função que verifica o preço total da reserva, com base nos dias passados por parâmetro e o preço da diária
function calculateTotal(
  dateFinal: string,
  dateStart: string,
  valueDay: number
) {
  // TODO: Why this doesn't works?
  /* const startDate = Date.parse(dateStart);
  const endDate = Date.parse(dateFinal);
  const diferenceMs = endDate - startDate; 
  const diferenceDays = Math.trunc(diferenceMs / (1000 * 60 * 60 * 24));*/

  const diferenceMs = moment(dateFinal, 'DD/MM/YYYY').diff(
    moment(dateStart, 'DD/MM/YYYY')
  );
  const days = moment.duration(diferenceMs).asDays();

  const valueTotal = valueDay * days;

  return valueTotal;
}

export { verifyDate, obtainCEP, verifyCPF, isValidObjectId, calculateTotal };
