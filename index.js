const express=require('express');
const app =express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const path = require('path');
const db=require('./db');
const collection="todo";

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));

});
app.get('/getTodos',(req,res)=>{
    db.getdb().collection(collection).find({}).toArray((err,document)=>{
        if(err){
            console.log(err);
        }else{
            console.log(document);
            res.json(document);
        }
    });
});
app.put('/:id',(req,res)=>{
    const todoID=req.params.id;
    const userinput=req.body;
    db.getdb().collection(collection).findOneAndUpdate({_id:db.getprimarykey(todoID)},{$set:{todo:userinput.todo}},{returnOriginal:false},(err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.json(result);
        }
    })
});
app.post('/',(req,res)=>{
    const userinput=req.body;
    db.getdb().collection(collection).insertOne(userinput,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({result:result,document:result.ops[0]})
        }
    })
})

db.connect((err)=>{
    if(err){
        console.log("unable to connect");
        process.exit(1);
    }else{
        app.listen(3000,()=>{
            console.log("connected to port 3000");
        });
    }
})


