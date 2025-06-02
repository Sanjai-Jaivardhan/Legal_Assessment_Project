const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
const cors = require('cors')

const app = express()
const port = 1000

app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Legal_Assessment',
    password: 'root123',
    port: 5432,
});

app.get('/scenariodetails', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scenario_details');
        res.status(200).json(result.rows)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})


app.get('/individualscenario', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM individual_scenario')
        res.status(200).json(result.rows)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/allscenario/:scenario_id', async (req, res) => {
    const { scenario_id } = req.params;
    console.log(scenario_id) 
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
            `, [scenario_id]);

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/courtDetails', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM court_details')
        res.status(200).json(result.rows)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/client-bot-assess', async (req, res) => {
    const {
        track_id,
        track_time,
        track_date,
        chat_button_id,
        chat_id,
        chat_values,
    } = req.body;

    // Add input validation
    if (!track_id || !track_time || !track_date || !chat_button_id || !chat_id || !chat_values) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    try {
        const query = `
        INSERT INTO client_track_assess 
        (track_id, track_time, track_date, chat_button_id, chat_id, chat_values, client_reward)
        VALUES ($1, $2, $3, $4, $5, $6, DEFAULT)
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

app.post('/api/end-test-assess', async (req, res) => {
    const {
        track_id,
        track_time,
        track_date,
        test_id,
        test_score,
        test_feedback
    } = req.body;

    // Input validation
    if (!track_id || !track_time || !track_date || !test_id || !test_score || !test_feedback) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    try {
        const query = `
        INSERT INTO end_test_assess 
        (track_id, track_time, track_date, test_id, test_score, test_feedback) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *;
        `;

        const values = [track_id, track_time, track_date, test_id, test_score, test_feedback];
        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: 'End test data inserted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error inserting end test data:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error inserting end test data',
            error: error.message,
        });
    }
});

app.get('/api/test-results/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM end_test_assess WHERE track_id = $1', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching test results', error: error.message });
    }
});


//207 is the starting for the "Clerk Page"
app.post('/clerk-details', async (req, res) => {
    const data = req.body;
  
    const keys = Object.keys(data);
    const values = Object.values(data);
  
    if (keys.length === 0) {
      return res.status(400).json({ error: 'No data provided' });
    }
  
    const columns = keys.map((key) => `"${key}"`).join(', ');
    const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');
  
    const query = `INSERT INTO clerk_page_details (${columns}) VALUES (${placeholders}) RETURNING *`;
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json({ success: true, inserted: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.post('/api/increment-document-count', async (req, res) => {
    try {
      const checkQuery = 'SELECT * FROM client_document LIMIT 1';
      const checkResult = await pool.query(checkQuery);
  
      let result;
      if (checkResult.rows.length === 0) {
        const insertQuery = 'INSERT INTO client_document (document_count) VALUES (1) RETURNING *';
        result = await pool.query(insertQuery);
      } else {
        const updateQuery = 'UPDATE client_document SET document_count = document_count + 1 RETURNING *';
        result = await pool.query(updateQuery);
      }
  
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error updating document count:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }); 
//Incrementation for the filing count
// 1 is the id for the filing count in the database

app.post('/api/increment-filing-count', async (req, res) => {
    try {
      const checkQuery = 'SELECT * FROM court_filing_details LIMIT 1';
      const checkResult = await pool.query(checkQuery);
  
      let result;
      if (checkResult.rows.length === 0) {
        const insertQuery = 'INSERT INTO court_filing_details (filing_count) VALUES (1) RETURNING *';
        result = await pool.query(insertQuery);
      } else {
        const updateQuery = 'UPDATE court_filing_details SET filing_count = filing_count + 1 RETURNING *';
        result = await pool.query(updateQuery);
      }
  
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error updating filing count:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  
  app.post('/api/increment-digital-count', async (req, res) => {
    try {
      const checkQuery = 'SELECT * FROM digital_details LIMIT 1';
      const checkResult = await pool.query(checkQuery);
  
      let result;
      if (checkResult.rows.length === 0) {
        const insertQuery = 'INSERT INTO digital_details (digital_count) VALUES (1) RETURNING *';
        result = await pool.query(insertQuery);
      } else {
        const updateQuery = 'UPDATE digital_details SET digital_count = digital_count + 1 RETURNING *';
        result = await pool.query(updateQuery);
      }
  
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error updating digital count:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  
  //for the technical Assessment
  // POST /api/clerk-assessment
  app.post('/api/clerk-assessment', async (req, res) => {
    try {
      const {
        clerk_assessment,
        correct_options,
        options_acquired,
        is_correct,
        total_score
      } = req.body;
  
      const query = `
        INSERT INTO clerk_technical_assessment (
          clerk_assessment,
          correct_options,
          options_acquired,
          is_correct,
          total_score
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
  
      const values = [
        clerk_assessment,
        correct_options,
        options_acquired,
        is_correct,
        total_score
      ];
  
      const result = await pool.query(query, values);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error('Error inserting assessment:', err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  });
  
  //document assessment
  app.post('/api/document-assessment', async (req, res) => {
    const {
      document_assessment,
      correct_options,
      options_acquired,
      is_correct,
      total_score
    } = req.body;
  
    try {
      const query = `
        INSERT INTO client_document_assessment
          (document_assessment, correct_options, options_acquired, is_correct, total_score)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [document_assessment, correct_options, options_acquired, is_correct, total_score];
      const result = await pool.query(query, values);
  
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error saving assessment:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  //filing assessment
  app.post('/api/submit-filing-assessment', async (req, res) => {
    const {
      filing_assessment,
      correct_options,
      options_acquired,
      is_correct,
      total_score
    } = req.body;
  
    try {
      const insertQuery = `
        INSERT INTO court_filing_assessment
        (filing_assessment, correct_options, options_acquired, is_correct, total_score)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const result = await pool.query(insertQuery, [
        filing_assessment,
        correct_options,
        options_acquired,
        is_correct,
        total_score
      ]);
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error saving filing assessment:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // GET all final results
app.get('/api/final-results', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM results ORDER BY created_at DESC');
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error('Error fetching final results:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})