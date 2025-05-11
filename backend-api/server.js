// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/routes');
const{runMigration}=require("./src/db/db")

 runMigration()

const app = express();
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Your frontend URL
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
