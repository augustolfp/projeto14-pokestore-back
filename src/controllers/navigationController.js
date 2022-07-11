import db from '../dbStrategy/mongo.js';

export async function getCart(req, res){
    const user = res.locals.user;
    const myCart = await db.collection("carts").find({id: user._id}).toArray();        
    return res.send(myCart);
}

export async function updateCart(req, res){
    const user = res.locals.user;
    const product = req.body
    try {
        await db.collection("cart").insertOne( {...product, userId: user._id}  );
        return res.send(product)
    }
    catch(err) {
        return res.send("Algo deu errado!")
    }
}

export async function clearCart(req, res) {
    const user = res.locals.user;
    try {
        await db.collection("cart").deleteMany( { id: user._id} );
        return res.sendStatus(200)
    }
    catch(err){
        return res.send("Algo deu errado!")
    }
}