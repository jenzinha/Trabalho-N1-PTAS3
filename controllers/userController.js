const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
//require('dotenv').config();


const createUser = async (req, res) => {
    const {name, password, email} = req.body;
    const newPassword = await bcrypt.hash(password, 10);

    await User.create({
        name: name,
        password: newPassword,
        email: email   
    }).then(() => {
        res.json('Cadastro de usuário realizado com sucesso!');
        console.log('Cadastro de usuário realizado com sucesso!');
    }).catch((erro) => {
        res.json('Falha no cadastro!');
        console.log(`Ops deu erro: ${erro}`); 
    })
}
const findUsers = async (req, res) => {
    const users = await User.findAll();
    try {
        res.json(users);
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.json(" usuário deletado!");
        })
    } catch (error) {
        res.status(404).json(" erro na exclusão ");
    }
}


const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, password, email } = req.body;
    try {
        await User.update(
            {
                name: name,
                password: password,
                email: email
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json(" usuário atualizado! ");
        })
    } catch (error) {
        res.status(404).json(" erro na execução!");
    }
}

const authenticatedUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
             email: email, 
            }
        })
        if (!isUserAuthenticated){
            return res.status(401).json("Usuário não corresponde!");
        }
        const response = await bcrypt.compare(password, isUserAuthenticated.password);
        if (response){
        const token = jwt.sign({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email 
        },
            process.env.SECRET, {
            expiresIn: 86400,
        })
        return res.json({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email,
            token: token
        });
    }

    else{
        return res.json("usuário não encontrado")
    }
 } catch (error) {
        return res.json("usuário não encontrado");
    }
}

module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser};
