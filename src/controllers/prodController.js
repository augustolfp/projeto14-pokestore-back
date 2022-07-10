import db from '../dbStrategy/mongo.js';

export async function getProducts(req, res){
    const productList = await db.collection("products").find().toArray();        
    return res.send(productList);
}

export async function getOneProduct(req, res){
    const id = req.params.id
    const product = await db.collection("products").find( {id: id} ).toArray();
}