import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
api.use(express.json());

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

// Main serverless function handler
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // GET handler - retrieve documents
async function handleGet(collection, event, headers) {
  const { queryStringParameters } = event;
  
  // Build query object from query parameters
  const query = {};
  const options = {};
  
  if (queryStringParameters) {
    // Handle common query parameters
    if (queryStringParameters.id) {
      const { ObjectId } = require('mongodb');
      query._id = new ObjectId(queryStringParameters.id);
    }
    
    // Add other filters
    Object.keys(queryStringParameters).forEach(key => {
      if (key !== 'id' && key !== 'limit' && key !== 'skip' && key !== 'sort') {
        query[key] = queryStringParameters[key];
      }
    });
    
    // Handle pagination
    if (queryStringParameters.limit) {
      options.limit = parseInt(queryStringParameters.limit);
    }
    if (queryStringParameters.skip) {
      options.skip = parseInt(queryStringParameters.skip);
    }
    
    // Handle sorting
    if (queryStringParameters.sort) {
      const sortField = queryStringParameters.sort;
      const sortOrder = queryStringParameters.order === 'desc' ? -1 : 1;
      options.sort = { [sortField]: sortOrder };
    }
  }

  const documents = await collection.find(query, options).toArray();
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      data: documents,
      count: documents.length
    }),
  };
}
}


/*
export default async (req, res) => {
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
};

api.use("/api/", router);

export const handler = serverless(api);

*/