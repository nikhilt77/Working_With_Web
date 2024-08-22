import express from 'express';
import bodyparser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app=express();
const port=3000;
const __dirname=dirname(fileURLToPath(import.meta.url));
var isAuthorized=false;

 app.use(bodyparser.urlencoded({extended:true}));
 
function checker(req,res,next){
    const password=req.body["password"];
    if(password=="ART"){
        isAuthorized=true;
    }
    else{
        isAuthorized=false;
    }
    next();
}
app.use(checker);
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
 });
app.post("/check",(req,res)=>{
    if(isAuthorized){
        res.sendFile(__dirname+"/public/secret.html");
        isAuthorized=false;
    }
    else{
        res.sendFile(__dirname+"/public/index.html");
    }
});
app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})
