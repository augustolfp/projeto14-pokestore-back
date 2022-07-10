import db from '../dbStrategy/mongo.js';

export async function getProducts(req, res){
    const productList = await db.collection("products").find().toArray();        
    return res.send(productList);
}