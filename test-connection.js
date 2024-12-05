// Import the 'mysql' module using ES module syntax
import mysql from 'mysql';
import { getUsers } from './server/Database.js'; // Ensure the correct path to Database.js

(async () => {
  try {
    console.log('Testing database connection...');
    
    // Call the getUsers function
    const users = await getUsers();
    console.log('Connected to database. Retrieved users:', users);
  } catch (err) {
    console.error('Database connection or query failed:', err.message);
  }
})();


// Create a connection to the database
const con = mysql.createConnection({
  host: "page-nest.c96qqyo4cprb.us-east-2.rds.amazonaws.com",
  user: "page-nest-dev",
  password: "Xd2RQSB`><;cP^NvD7n84z"
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log("Connected!");
});

