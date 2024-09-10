const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://root:password@localhost:27017/?authMechanism=DEFAULT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Customer schema and model
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Customer = mongoose.model('Customer', customerSchema);

// API endpoint to get customers
// app.get('/', async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('/', (req, res) => {
  res.send('Welcome to the Customer Management API');
});


// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});