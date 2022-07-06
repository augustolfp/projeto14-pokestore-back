import bcrypt from 'bcrypt';
import { newUserSchema } from '../schemas/authSchemas';

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
