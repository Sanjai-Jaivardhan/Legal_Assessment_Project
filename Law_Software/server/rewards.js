const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
const cors = require('cors')

const app = express()
const port = 2000

app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Legal_Assessment',
    password: 'Sanjai@jaivardhan18',
    port: 5432
})

app.post('/api/update-clerk-reward', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM clerk_page_details`);
  
      let totalPoints = 0;
  
      result.rows.forEach(row => {
        totalPoints += (row.filing_doc ? 10 : 0);
        totalPoints += (row.case_num ? 5 : 0);
        totalPoints += (row.summons_doc ? 8 : 0);
        totalPoints += (row.order_id ? 6 : 0);
        totalPoints += (row.order_details ? 7 : 0);
        totalPoints += (row.dispute_type ? 6 : 0);
        totalPoints += (row.query_text ? 4 : 0);
        totalPoints += (row.training_date ? 5 : 0);
      });
  
      const existing = await pool.query(`SELECT * FROM clerk_reward LIMIT 1`);
  
      if (existing.rows.length === 0) {
        await pool.query(`
          INSERT INTO clerk_reward (total_reward_points, updated_at)
          VALUES ($1, NOW())
        `, [totalPoints]);
      } else {
        // Update the only existing row
        await pool.query(`
          UPDATE clerk_reward
          SET total_reward_points = $1,
              updated_at = NOW()
          WHERE id = $2
        `, [totalPoints, existing.rows[0].id]);
      }
  
      res.status(200).json({
        message: 'Total clerk reward updated successfully.',
        total_reward_points: totalPoints
      });
  
    } catch (error) {
      console.error('Error updating total clerk reward:', error);
      res.status(500).json({ error: 'Failed to update total clerk reward.' });
    }
  });

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  app.post('/api/filing_reward', async (req, res) => {
    try {
      const countQuery = 'SELECT filing_count FROM court_filing_details LIMIT 1';
      const countResult = await pool.query(countQuery);
      const count = countResult.rows.length > 0 ? countResult.rows[0].filing_count : 0;
  
      let reward = 0;
      if (count >= 25 && count <= 50) {
        reward = getRandomInt(80, 100);
      } else if (count >= 15 && count < 25) {
        reward = getRandomInt(50, 80);
      } else if (count > 0 && count < 10) {
        reward = getRandomInt(25, 50);
      } else {
        reward = 0;
      }
  
      const checkQuery = 'SELECT * FROM court_filing_rewards LIMIT 1';
      const existingReward = await pool.query(checkQuery);
  
      let rewardResult;
  
      if (existingReward.rows.length === 0) {
        // Insert for the first time
        const insertQuery = `
          INSERT INTO court_filing_rewards (filing_count, reward)
          VALUES ($1, $2)
          RETURNING *
        `;
        rewardResult = await pool.query(insertQuery, [count, reward]);
      } else {
        // Update the existing record
        const updateQuery = `
          UPDATE court_filing_rewards
          SET filing_count = $1, reward = $2, created_at = CURRENT_TIMESTAMP
          WHERE id = $3
          RETURNING *
        `;
        rewardResult = await pool.query(updateQuery, [count, reward, existingReward.rows[0].id]);
      }
  
      res.status(200).json({
        success: true,
        message: 'Reward generated and stored/updated successfully',
        data: rewardResult.rows[0]
      });
  
    } catch (error) {
      console.error('Error generating or updating reward:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
    

  
  

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})