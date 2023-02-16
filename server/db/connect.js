import mongoose from 'mongoose';

/* Mongoose setup */
const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((error) => console.log(`${error} did not connect`));
};

export default connectDB;
