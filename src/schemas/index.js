import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(
      process.env.MONGO_DB,
      {
        dbName: 'test2',
      },
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;