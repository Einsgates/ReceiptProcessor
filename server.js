import express from 'express';
import {v4 as uuidv4} from 'uuid';

import { validateData } from './validation.js';
import { calculatePoints } from './points.js';

const app = express();
const port = 5000;

// Enable parsing of JSON requests
app.use(express.json());

// In-memory data storage to hold receipt information
const receipts = {};

app.get('/', (req, res) => {
    res.json("Welcome to our Receipt Processor!");
});

app.post('/receipts/process', (req, res) => {
  const data = req.body;
  const validationResult = validateData(data);
  if (validationResult != "Everything is Valid") {
      return res.status(400).json({ error: validationResult }); // Send a 400 Bad Request status with the error message
  }

  // Generate a unique ID for the receipt
  const receipt_id = uuidv4(); 

  // Calculate the points for the receipt
  const points = calculatePoints(data);
  // Store the calculated points against the receipt ID
  receipts[receipt_id] = points;

  res.json({ id: receipt_id });
});

app.get('/receipts/:id/points', (req, res) => {
    const id = req.params.id;
    const points = receipts[id];

    if (!points) {
        return res.status(404).json({ error: "Receipt not found" });
    }

    res.json({ points: points });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
