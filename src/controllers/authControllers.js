import bcrypt from 'bcrypt';
import { newUserSchema, authUserSchema } from '../schemas/authSchemas.js';
import { v4 as uuid } from 'uuid';
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
    const authUser = req.body
    
    const validation = authUserSchema.validate(authUser);

    if (validation.error) {
        console.log(validation.error.details)        
    return res.status(422).send(`${validation.error}`)  
    }

    const { email, password } = authUser;
    const user = await db.collection('users').findOne({ email });
    
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();        // depois verificar o bônus --> deixar aqui marcado com comentário pra isso
				const session = await db.collection("sessions").insertOne({
					userId: user._id,
					token
				})
            res.status(200).send(`${token}`) // verificar se envia também o nome do usuário, vai depender do layout do front
        } else {
            res.status(401).send("Usuário ou senha incorretos")
        }
}