import mongoose from "mongoose";

mongoose.set('runValidators', true)

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(`${ process.env.MONGODB_URI }`)
    console.log('подключение установлено')
  } catch (error) {
    throw new Error('ошибка подключения к базе данных')
  }
};

export default connect;