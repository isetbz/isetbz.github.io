exports.handler = async (req, res) => {
    try {
        const { cin, identifiant } = req.body;

        const client = new MongoClient(process.env.MONGODB_ATLAS_URI);
        await client.connect();

        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.USERS);

        const student = await collection.findOne({ cin: cin });

        res.json({
            success: true,
            users: { student }
        });

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
};