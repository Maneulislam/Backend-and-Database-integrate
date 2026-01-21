const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//User name : 221002199_db_user
//pass : ihWab9So5M3eWWt5


const uri = "mongodb+srv://221002199_db_user:ihWab9So5M3eWWt5@simple-crud-server.awx9wzo.mongodb.net/?appName=simple-crud-server";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const database = client.db('simpleCrudDB');
        const usersCollection = database.collection('users');

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.send(result)
            console.log(result);


        })


        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = req.body;

            const updateDocument = {
                $set: {
                    name: user.name,
                    email: user.email
                },
            };

            const result = await usersCollection.updateOne(query, updateDocument);
            res.send(result)
            console.log(result);
        })

        app.post('/users', async (req, res) => {
            console.log("Data in the server", req.body);
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result)


        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result)
            console.log(result);
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error(error);
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Simple crud server is Running...')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
