import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  cpf: {
    type: String,
    required: [true, 'CPF is required'],
  },
  birth: {
    type: String,
    required: [true, 'Birth is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'String is required'],
  },
  cep: {
    type: String,
    required: [true, 'CEP is required'],
  },
  qualifed: {
    type: String,
    required: [true, 'Qualifed is required'],
  },
  patio: {
    type: String,
    required: [true, 'patio is required'],
  },
  complement: {
    type: String,
    required: [true, 'complement is required'],
  },
  neighborhood: {
    type: String,
    required: [true, 'neighborhood is required'],
  },
  locality: {
    type: String,
    required: [true, 'locality is required'],
  },
  uf: {
    type: String,
    required: [true, 'UF is required'],
  },
});

const User = mongoose.model('User', schema);
export default User;
