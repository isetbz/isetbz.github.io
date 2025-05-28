import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("dept-ge");
const students = db.collection("students");


router.post("/query-students", async (req, res) => {
    try {
        const { cin, identifiant } = req.body;
        const student = await students.findOne({ cin: cin });

        // Check if the student exists
        if (!student) {
            return res.json({
                success: false,
                error: "Student not found"
            });
        }

        // Check if the identifiant matches
        if (student.identifiant !== identifiant) {
            return res.json({
                success: false,
                error: "Identifiant does not match"
            });
        }

        res.json({
            success: true,
            students: { student }
        });

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

api.use("/api/", router);

export const handler = serverless(api);
