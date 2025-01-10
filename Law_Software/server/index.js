const express=require('express')
const bodyParser=require('body-parser')
const {Pool}=require('pg')
const cors = require('cors')

const app=express()
const port=1000

app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Legal_Assessment',
    password: 'Sanjai@jaivardhan18',
    port: 5432
})

app.get('/scenariodetails',async (req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM scenario_details');
        res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

app.get('/individualscenario',async (req,res)=>{
    try{
        const result= await pool.query('SELECT * FROM individual_scenario')
        res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})