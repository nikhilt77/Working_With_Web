import express from 'express';
const app=express();
const port =3000;
app.get("/",(req,res)=>{//localhost/anything is read as localhost:3000/anything
    res.send("<h8>HEllo</h8>");
});
app.get("/about",(req,res)=>{
    res.send("<h1>About Me</h1>");
});
app.get("/contact",(req,res)=>{
    res.send("<h2>Contacter</h2>");
});
app.listen(port,()=>{
    console.log(`Server ${port} is running`);
});
