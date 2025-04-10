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
    password: 'Sanjai@jaivardhan18',
    port: 5432
})

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

//I  am trying this for reward management 
//date : 29.03.2025
app.get('/cases', async (req, res) => {
    try {
        const casesResult = await pool.query('SELECT * FROM legal_cases');
        const cases = casesResult.rows;

        const totalCount = cases.length;

        const rewardResult = await pool.query('SELECT reward FROM reward_legal_case WHERE id = 1');
        let currentReward = rewardResult.rows[0].reward;

        if (totalCount > 5) {
            currentReward -= 5;
        } else if (totalCount < 5) {
            currentReward += 10;
        } 

        await pool.query('UPDATE reward_legal_case SET reward = $1 WHERE id = 1', [currentReward]);

        res.status(200).json({ 
            success: true, 
            total: totalCount, 
            reward: currentReward, 
            data: cases 
        });

    } catch (err) {
        console.error('Database Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})