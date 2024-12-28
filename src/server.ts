import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const port = process.env.PORT  || 4000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
console.log(`connected to mongodb`)
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});