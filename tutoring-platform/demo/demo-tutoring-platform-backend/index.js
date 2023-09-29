const express=require('express');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
  return res.status(200).send('hello');
});

app.post('/upload',async(req,res)=>{
  console.log(req.files,req.body);
  return res.status(200).send({message:'ok'});
});

app.listen(5000,()=>{
console.log('Listening on port* :' +5000);
});
