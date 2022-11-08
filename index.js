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

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
       //clirnt connect
        const serviceCollection = client.db('homeDeco').collection('services');
        const blogCollection = client.db('blog').collection('artcle');
        const reviewCollection = client.db('userReview').collection('review');

        app.get('/blog', async (req,res)=>{
            const query = {}
            const cursor = blogCollection.find(query);
            const blog = await cursor.toArray();
            res.send(blog);
        }); 

        app.get('/blog/:id', async (req,res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)};
            const singleBlog = await blogCollection.findOne(query);
           
            res.send(singleBlog);

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



         app.post('/services', async (req,res)=>{
            const services = req.body;
            const result = await serviceCollection.insertOne(services);
            res.send(result);
         })
 
         app.post('/review', async (req,res)=>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
         });

         app.get('/review', async (req,res)=>{
            const query = {}
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
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