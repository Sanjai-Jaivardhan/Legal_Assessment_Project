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

app.get('/allscenario/:scenario_id', async (req, res) => {
    const { scenario_id } = req.params; 
    console.log(scenario_id) // Get scenario_id from URL parameter
    try {
        const result = await pool.query(`
            SELECT 
                scd.scenario_id AS scenario_id_main,
                scd.tag AS scenario_tag,
                scd.small_title AS scenario_small_title,
                scd.title AS scenario_title,
                scd.abstract AS scenario_abstract,
                scd.description AS scenario_description,
                scd.duration AS scenario_duration,
                iscn.individual_id AS individual_scenario_id,
                iscn.tag AS individual_scenario_tag,
                iscn.title AS individual_scenario_title,
                iscn.small_title AS individual_scenario_small_title,
                iscn.abstract AS individual_scenario_abstract,
                iscn.description AS individual_scenario_description,
                iscn.client_id AS individual_scenario_client_id,
                iscn.background_id,
                iscn.opposite_id,
                iscn.start_id,
                icl.client_id AS client_id_in_client_table,
                icl.name AS client_name,
                icl.age AS client_age,
                icl.father,
                icl.f_age AS father_age,
                icl.mother,
                icl.m_age AS mother_age,
                icl.married,
                icl.wife,
                icl.wife_age,
                icl.husband,
                icl.husband_age,
                icl.children,
                icl.c_perspective_id AS client_perspective_id,
                icl.client_perspective,
                icl.advocate
            FROM 
                scenario_details scd
            LEFT JOIN 
                individual_scenario iscn 
                ON scd.scenario_id = iscn.scenario_id
            LEFT JOIN 
                individual_client icl 
                ON iscn.client_id = icl.client_id
            WHERE 
                scd.scenario_id = $1;
        `, [scenario_id]);  // Pass the scenario_id as a parameter to the query
        
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/client-bot-assess', async (req, res) => {
    const {
      track_id,
      track_time,
      track_date,
      chat_button_id,
      chat_id,
      chat_values,
    } = req.body;
  
    try {
      const query = `
        INSERT INTO client_track_assess 
        (track_id, track_time, track_date, chat_button_id, chat_id, chat_values)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
  
      const values = [track_id, track_time, track_date, chat_button_id, chat_id, chat_values];
      const result = await pool.query(query, values);
  
      res.status(201).json({
        success: true,
        message: 'Data inserted successfully',
        data: result.rows[0],
      });
    } catch (error) {
      console.error('Error inserting data:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error inserting data',
        error: error.message,
      });
    }
  });

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})