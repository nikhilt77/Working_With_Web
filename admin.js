const express= require('express');
const app = express();
const jwt = require('jsonwebtoken');
import pg from 'pg';
const db= new pg.Client({
    user:"username",
    password:"password",
    host:"localhost",
    port:5432,
    database:"student"
});
db.connect();
app.listen(3500,()=>{
    console.log('Server is running on port 3500');
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

db.query('SELECT * FROM student',(err,res)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});
app.post('/addStaff',async(req,res,next)=>{
    const ROLE=req.body.role;
    if(ROLE!=='admin'){
        res.status(401).send('Unauthorized');
    }
    else{
        try{
            const {name,username,role,classInCharge,password}=req.body;
            if(!name || !username || !role || !password){
                res.status(400).send('Please enter all details');
            }
            else{
                const query='INSERT INTO staff(name,username,role,classInCharge,password) VALUES($1,$2,$3,$4,$5) RETURNING *';
                const values=[name,username,role,classInCharge,password];
                const result=await db.query(query,values);
                res.status(200).send(result.rows[0]);
                res.redirect('/addStaff');
            }
        }
        catch(err){
           next(err);
        }
    }
});
app.get('/viewStaff',async(req,res,next)=>{
    const ROLE=req.body.role;
    if(ROLE!=='admin'){
        res.status(401).send('Unauthorized');
    }
    else{
        try{
            const query='SELECT * FROM staff';
            const result=await db.query(query);
            res.status(200).send(result.rows);
        }
        catch(err){
            next(err);
        }
    }
});
app.get('/viewStaffAdvisor',async(req,res,next)=>{
    const ROLE=req.body.role;
    if(ROLE!=='admin'){
        res.status(401).send('Unauthorized');
    }
    else{
        try{
            const result=await db.query('SELECT * FROM staff WHERE classInCharge IS NOT NULL');
            res.status(200).send(result.rows);
            res.redirect('/viewStaffAdvisor');
        }
        catch(err){
            next(err);
        }
    }
});


