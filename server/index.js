import express from 'express';
import pkg from 'pg'; // For PostgreSQL
import cors from 'cors';
import jwt from 'jsonwebtoken'; // For token-based authentication
import bcrypt from 'bcryptjs'; // For password hashing
import cookieParser from 'cookie-parser'; // For parsing cookies
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg; // Import PostgreSQL client
const app = express();

// Middleware setup
app.use(express.json()); 
app.use(cors({
    origin: "https://student-app-client.onrender.com", // Ensure this matches the frontend origin
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"], // Add any methods you will use
    credentials: true, // Allow cookies and other credentials
    allowedHeaders: ["Content-Type", "Authorization"], // Ensure proper headers
    exposedHeaders: ["Authorization"] // Expose token in response if needed
}));
app.use(cookieParser());

// Handle preflight requests
app.options('*', cors());

// Database connection using PostgreSQL
const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database.');
});

// Middleware to verify user authentication
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not Authenticated" });
    }
    
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.json({ Error: "Token not verified" });
        } else {
            req.name = decoded.name; // Use FName as `name` in the payload
            next();
        }
    });
}

// Route to check authentication and get user name
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name }); // Send `name` as response
})

// Register route for handling user sign-up
app.post('/register', (req, res) => {
    const { FName, LName, email, password } = req.body;

    // Check if email already exists
    const checkEmailSql = 'SELECT * FROM register WHERE email = $1';
    db.query(checkEmailSql, [email], (err, data) => {
        if (err) {
            console.error("Error checking email:", err); // Log error
            return res.json({ Error: "Error checking email in server" });
        }

        if (data.rows.length > 0) {
            return res.json({ Error: "Email already exists." });
        }

        // Password hashing
        bcrypt.hash(password.toString(), 10, (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err); // Log error
                return res.json({ Error: "Error hashing password" });
            }

            // Prepare the values to be inserted into the database
            const insertSql = "INSERT INTO register (FName, LName, email, password) VALUES ($1, $2, $3, $4)";
            const values = [FName, LName, email, hash];

            // Execute the SQL query to insert the new user into the database
            db.query(insertSql, values, (error, result) => {
                if (error) {
                    console.error("Error inserting data:", error); // Log error
                    return res.json({ Error: "Error inserting data into server" });
                }
                // Successfully inserted the new user
                return res.json({ Status: "Success" });
            });
        });
    });
});

// Login route for handling user login
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM register WHERE email = $1';

    // Execute the SQL query to find the user
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error("Error fetching data:", err); // Log error
            return res.json({ Error: "Error fetching data from server" });
        }

        if (data.rows.length > 0) {
            // If a user with the provided email exists, compare passwords
            bcrypt.compare(req.body.password.toString(), data.rows[0].password, (err, response) => {
                if (err) {
                    console.error("Error comparing passwords:", err); // Log error
                    return res.json({ Error: "Error comparing passwords" });
                }
                if (response) {
                    const name = data.rows[0].fname; // Use FName from the database
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' }); // Token expires in 1 day
                    res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true }); // Set cookie with httpOnly flag for security
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Incorrect Password" });
                }
            });
        } else {
            return res.json({ Error: "Email Not Registered" });
        }
    });
});

// Logout route to clear the token
app.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true }); // Clear the token cookie securely
    res.json({ Status: "Success" });
});

// Use PORT from environment variables or fallback to 8081
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
