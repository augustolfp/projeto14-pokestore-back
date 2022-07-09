import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { newUserSchema, authUserSchema } from '../schemas/authSchemas.js';
import db from '../dbStrategy/mongo.js';

export async function createUser(req, res) {
    const newUser = req.body; // verificar o schema pra colocar no front no formato certinho;
    
    const validation = newUserSchema.validate(newUser);

    if (validation.error) {
        console.log(validation.error.details)        
    return res.status(422).send(`${validation.error}`)  
    }

    const existingEmail = await db.collection('users').findOne({ email: newUser.email });

    if (existingEmail) {
        return res.status(409).send("E-mail já cadastrado!")
    }

    const cryptoPass = bcrypt.hashSync(newUser.password, 10);
    delete newUser.confirmPassword;
    await db.collection('users').insertOne({ ...newUser, password: cryptoPass });
    res.status(201).send("Usuário criado com sucesso")
}

export async function loginUser(req, res) {
    const authUser = req.body;
    
    const validation = authUserSchema.validate(authUser);

    if (validation.error) {
        console.log(validation.error.details)        
    return res.status(422).send(`${validation.error}`)  
    }

    const { email, password } = authUser;
    const user = await db.collection('users').findOne({ email });
    
        if(user && bcrypt.compareSync(password, user.password)) {
            const session = await db.collection("sessions").insertOne({
                userId: user._id,
                email,
                date: Date.now()
            })
            const token = jwt.sign({email, sessionId: session.insertedId}, process.env.JWT_SECRET, {expiresIn: 60*30});   // Tempo em segundos
            res.status(200).send(`${token}`) // verificar se envia também o nome do usuário, vai depender do layout do front
        } else {
            res.status(401).send("Usuário ou senha incorretos")
        }
}