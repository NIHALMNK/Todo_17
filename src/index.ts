import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
const app = express();
const PORT =3000;


app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>{
//      res.send('todo api is running');
// });
app.use('/api',todoRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/tododb')
.then(()=>{
    console.log('connected');;
  app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err)=>{
    console.error('MongoDB connection error:', err);
})