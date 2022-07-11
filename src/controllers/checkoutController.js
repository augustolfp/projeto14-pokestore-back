import db from '../dbStrategy/mongo.js';

export async function makeTransaction(req, res) {
    const user = res.locals.user;

    let total = 0;
    try {
        const myCart = await db.collection("cart").find({userId: user._id}).toArray();
        myCart.map(product => total = total + parseFloat(product.price));
        await db.collection("transactions").insertOne({itens: [...myCart], user: [...user], total: total});
        await db.collection("cart").deleteMany({userId: user._id});
        res.sendStatus(201);
    }
    catch(error) {
        res.sendStatus(401);
    }
}