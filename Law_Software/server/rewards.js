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
        // Insert if no row exists
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
  
  
  


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})