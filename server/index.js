import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
const openDb = () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '12345', 
    port: 5432
  });
  return pool;
};

// GET endpoint to retrieve tasks
app.get('/', (req, res) => {
  const pool = openDb();
  pool.query('SELECT * FROM task', (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(result.rows);
  });
});

// POST endpoint to add a task
app.post('/add', (req, res) => {
  const { description } = req.body;
  const pool = openDb();
  pool.query(
    'INSERT INTO task (description) VALUES ($1) RETURNING *',
    [description],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json(result.rows[0]);
    }
  );
});

// DELETE endpoint to delete a task
app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pool = openDb();
  pool.query(
    'DELETE FROM task WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json({ id });
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
