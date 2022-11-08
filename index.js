const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const app = express();
const port= process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.db_users}:${process.env.db_password}@cluster0.fvyg8ej.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
       //clirnt connect
        const serviceCollection = client.db('homeDeco').collection('services');
        const blogCollection = client.db('blog').collection('artcle');

        app.get('/blog', async (req,res)=>{
            const query = {}
            const cursor = blogCollection.find(query);
            const blog = await cursor.toArray();
            res.send(blog);
        }); 


        app.get('/service', async (req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const service = await cursor.limit(3).toArray();
            res.send(service);
        });
        app.get('/services', async (req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });

        app.get('/services/:id', async (req,res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)};
            const serv = await serviceCollection.findOne(query);
           
            res.send(serv);

         });



    }
    catch{
        console.error(error)
    }


}
run().catch(err=>console.error(err))


app.get('/',(req,res)=>{
    res.send('Home Deco server is running');
})

app.listen(port,()=>{
    console.log(`Home Deco server is running on ${port}`);
})