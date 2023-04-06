import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  value_per_day: {
    type: Number,
    required: true,
  },
  accessories: [{}],
  number_of_passengers: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model('Car', schema);
export default Car;
