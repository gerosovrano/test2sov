// post api 
import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        const { title, image, addres, description } = data;
        const client = await MongoClient.connect("mongodb+srv://geronimosovrano:hom3sweet@cluster0.m9xqsad.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db(); 

        const meetupsCollection = db.collection("meetups")

       const result = await meetupsCollection.insertOne(data)
       client.close();
       
    }
}

export default handler 