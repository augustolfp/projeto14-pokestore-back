import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import db from '../dbStrategy/mongo.js';

export default async function validateToken(req, res, next) {
    const jwtKey = process.env.JWT_SECRET;
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    }

    try {
        const tokenEmbeddedData = jwt.verify(token, jwtKey);
        const session = await db.collection('sessions').findOne({_id: ObjectId(tokenEmbeddedData.sessionId)});
        const user = await db.collection('users').findOne({_id: session.userId});
        res.locals.user = user;
        next();
    }
    catch(error) {
        return res.sendStatus(401);
    }
}