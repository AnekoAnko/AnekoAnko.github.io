import express from 'express';
import { body, validationResult } from 'express-validator';
import admin from 'firebase-admin';
import cors from 'cors';
import serviceAccount from '../secretAccountKey.json' assert { type: 'json' };
import path from "path";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), 
});

const app = express();
const port = 3000;

const db = admin.firestore();

app.use(express.json());
app.use(cors());

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public'))); 

app.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      res.status(201).json({ message: 'User registered successfully', userId: userRecord.uid });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
);

app.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      res.status(200).json({ message: 'Login successful', user: userRecord });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  }
);

app.get('/workouts', async (req, res) => {
  try {
    const workoutsSnapshot = await db.collection('workouts').get();
    const workouts = [];

    workoutsSnapshot.forEach((doc) => {
      workouts.push(doc.data());
    });

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.post('/workouts', async (req, res) => {
  const { type, duration, caloriesBurned, date } = req.body;

  try {
    const newWorkoutRef = db.collection('workouts').doc();
    await newWorkoutRef.set({
      type,
      duration,
      caloriesBurned,
      date,
    });

    res.status(201).json({ message: 'Workout saved successfully' });
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({ error: 'Failed to save workout' });
  }
});

app.get('/profile', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const userRecord = await admin.auth().getUser(userId);

    if (!userRecord) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      email: userRecord.email,
      uid: userRecord.uid,
      displayName: userRecord.displayName,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
