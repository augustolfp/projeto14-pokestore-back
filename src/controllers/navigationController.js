import db from '../dbStrategy/mongo.js';

export async function getCart(req, res){
    const user = res.locals.user;
    const myCart = await db.collection("cart").find({id: user._id}).toArray();        
    return res.send(myCart);
}

export async function updateCart(req, res){
    const user = res.locals.user;
    const product = req.body
    try {
        const myCart = await db.collection("cart").findOne({userId: user._id, id: product.id})

        if (myCart) {
            const quant = myCart.quantity + product.quantity
            await db.collection("cart").updateOne( {userId: user._id, id: product.id}, {$set: {quantity: quant}} );
            return res.sendStatus(200)
        }
        else {
        await db.collection("cart").insertOne( {...product, userId: user._id}  );
        return res.sendStatus(201)
        }
    }
    catch(err) {
        return res.send("Algo deu errado!")
    }
}

export async function deleteFromCart(req, res) {
    const user = res.locals.user;
    const product = req.body
    try {
        await db.collection("cart").deleteOne( { userId: user._id, id: product.id } );
        return res.sendStatus(200)
    }
    catch(err){
        return res.send("Algo deu errado!")
    }
}
