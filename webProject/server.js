const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
const firebase = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ User Registration & Login
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Create a new user in Firebase Authentication
        const user = await admin.auth().createUser({ email, password });
        res.status(201).send({ message: "User created successfully!", userId: user.uid });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// ✅ User Login (Firebase Auth Verification)
app.post("/login", async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the ID token sent from the frontend
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Get the user ID from the decoded token
        const userId = decodedToken.uid;

        // Optional: Retrieve user info from Firebase Authentication
        const user = await admin.auth().getUser(userId);

        // Send success message back to the frontend
        res.status(200).send({ message: "Login successful!", userId: user.uid });
    } catch (error) {
        // If token verification fails
        res.status(400).send("Invalid token or session expired.");
    }
});


// ✅ Add Recipe
app.post("/add-recipe", async (req, res) => {
    const { title, description } = req.body;
    try {
        await db.collection("recipes").add({ title, description });
        res.status(201).send({ message: "Recipe added successfully!" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ✅ Search Recipe by Name
app.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const snapshot = await db.collection("recipes").get();
        const recipes = snapshot.docs
            .map(doc => doc.data())
            .filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()));
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ✅ Get All Recipes
app.get("/all-recipes", async (req, res) => {
    try {
        const snapshot = await db.collection("recipes").get();
        const recipes = snapshot.docs.map(doc => doc.data());
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
