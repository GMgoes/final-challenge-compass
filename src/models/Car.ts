import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  model: {
    type: String,
  },
  color: {
    type: String,
  },
  year: {
    type: String,
  },
  value_per_day: {
    type: Number,
  },
  accessories: {
    type: [{ type: String }],
  },
  number_of_passengers: {
    type: Number,
  },
});

const Car = mongoose.model('Car', schema);
export default Car;
