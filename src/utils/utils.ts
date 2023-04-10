/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';
import jwt from 'jsonwebtoken';
/* Function to check the age of the person,
returns the age difference from date of birth until now */
const verifyDate = function (datePassed: string) {
  const dateToVerify = Date.parse(datePassed);

  const today = new Date();

  const diferenceMs = Date.parse(today.toLocaleDateString()) - dateToVerify;
  const diferenceYears = Math.trunc(diferenceMs / (1000 * 60 * 60 * 24 * 365));

  return diferenceYears;
};
/* Function to obtain information about regions according to the zip code entered,
 returns the object passed by ViaCEP */
const obtainCEP = async function (urlCEP: string) {
  const responseObject = await axios.get(urlCEP).then((response) => {
    return response.data;
  });
  return responseObject;
};
// Function to check if a CPF is valid, returns true or false
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
// Function that returns the formatted CPF (Without semicolons so far)
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
// Function that dynamically checks the CPF's calculable digits (10th and 11th digit), returns true or false
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
// Function that validates if a passed ID (String) is an ObjectID according to MongoDB definitions
function isValidObjectId(id: string) {
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}
// Function that checks the total price of the reservation, based on the days passed by parameter and the daily price
function calculateTotal(
  dateFinal: string,
  dateStart: string,
  valueDay: number
) {
  // TODO: Check why it can't be done that way
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
// Function to create a token, the user ID goes in the payload
function signToken(id: string, email: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return jwt.sign({ id, email }, process.env.SECRET!, {
    // Valid for 12 hours
    expiresIn: 43200,
  });
}
// Function that converts the elements of an object to a String array (Used to validate if we HAVE repeated accessories in the request)
function verifyDuplicateAccessories(accessoriesArray: any) {
  const array: string[] = [];
  accessoriesArray.forEach((element: any) => {
    array.push(element['description']);
  });
  return hasDuplicates(array);
}
// Function that validates if an array has duplicates
function hasDuplicates(array: any) {
  return new Set(array).size !== array.length;
}
// Function that removes the limit and offset (if any) and returns an empty object or with a query (if any)
function formatedQuery(reqQuery: any) {
  const newQuery: any = {};
  const array = Object.keys(reqQuery);
  array.forEach((element: string) => {
    if (element != 'offset' && element != 'limit') {
      newQuery[element] = reqQuery[element];
    }
  });
  return newQuery;
}
// Function that checks if the entered email is valid
function verifyEmail(email: string) {
  return (
    email.split(' ').length == 1 &&
    email.indexOf('@') != -1 &&
    email.indexOf('@') < email.length &&
    email.indexOf('@') != 0 &&
    email.lastIndexOf('.') > email.indexOf('@') &&
    email.lastIndexOf('.') < email.length
  );
}
// TODO: Check for a way to unify the functions: verify AccessoryExists and verify Duplicate Accessories perform very similar functions
// Function that validates if WE HAVE repeated strings after inserting a new element
function verifyAccessoryExists(accessories: any, newAcessory: string) {
  let flag = 0;
  accessories.forEach((element: any) => {
    if (element['description'] == newAcessory) {
      flag++;
    }
  });
  return flag > 0 ? true : false;
}
export {
  verifyDate,
  obtainCEP,
  verifyCPF,
  isValidObjectId,
  calculateTotal,
  signToken,
  formatCPF,
  verifyDigit,
  verifyDuplicateAccessories,
  formatedQuery,
  verifyEmail,
  verifyAccessoryExists,
};
