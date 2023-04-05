import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
  },
  cpf: {
    type: String,
  },
  birth: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cep: {
    type: String,
  },
  qualifed: {
    type: String,
  },
  patio: {
    type: String,
  },
  complement: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  locality: {
    type: String,
  },
  uf: {
    type: String,
  },
});

const User = mongoose.model('User', schema);
export default User;
