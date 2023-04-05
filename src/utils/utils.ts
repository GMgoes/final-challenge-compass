import axios from 'axios';

const verifyDate = function (datePassed: string) {
  const dateToVerify = Date.parse(datePassed);

  const today = new Date();

  const diferenceMs = Date.parse(today.toLocaleDateString()) - dateToVerify;
  const diferenceYears = Math.trunc(diferenceMs / (1000 * 60 * 60 * 24 * 365));

  return diferenceYears;
};

const obtainCEP = async function (urlCEP: string) {
  const responseObject = await axios.get(urlCEP).then((response) => {
    return response.data;
  });
  return responseObject;
};

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

export { verifyDate, obtainCEP, verifyCPF };
