import express from "express";
import bandname from 'bandname';
import bodyparser from 'body-parser';
import{dirname} from 'path';
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));
var band="";
const app = express();
const port = 3080;
app.use(bodyparser.urlencoded({extended:true}));
function bandNameGenerator(req,res,next){
  console.log(req.body);
  band=bandname();
  next();
};
app.use(bandNameGenerator);
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/public/index.html");
});
app.post("/submit",(req,res)=>{
  res.send(`<h1>Band Name:</h1><h2>${band}</h2>`);
});
function logger(req,res,next){
  console.log("Request received");
  next();
};
app.use(logger);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
