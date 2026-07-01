import express from "express"
import cors from "cors"
import { prisma} from "./lib/prisma.ts"

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.get("/usuarios", async (req, res) => {
    try{
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios)
    } catch(error){
        res.status(500).json({error: "erro ao reornar usuarios"})
    }
})

app.post("/usuarios", async(req, res) =>{
    try{
    const {email, senha, bio, fotoUrl} = req.body;
    const novoUsuario = await prisma.usuario.create({
        data: {
            email,
            senha,
            perfil: {
                create: {bio, fotoUrl}
            }
        },
        include: {perfil: true}
        })
    console.log("usuario Criado")
    res.status(201).json(novoUsuario)
    }
    catch(error){
        res.status(400).json(NIGGA)
    }
})

app.put("/usuarios/:id", async(req, res) =>{
    const {id} = req.params
try{
    const {email, senha, bio, fotoUrl} = req.body;

    const usuarioAtualizao = await prisma.usuario.update({
            where: {id: Number(id)},
    data:{
        email,
        senha,
        perfil:{
            upsert:{
                create:{bio, fotoUrl},
                update: {bio, fotoUrl}
            }
        }
    },
    include: {perfil: true}
    })
    res.json(usuarioAtualizado);
} catch (error) {
    console.error("error ao atualizar o usuario")
    res.status(400).json({ erro: "error a atualizar o usuario"})

}
})

app.patch("/usuarios/:id", async(req, res) =>{
    const {id} = req.params

    const {email, senha, bio, fotoUrl} = req.body

    const dadosAtualizados = {
        email,
        senha,
        perfil: (bio || fotoUrl) ?{
            update: {bio, fotoUrl}
        } : undefined
    }
    Object.keys(dadosAtualizados).forEach(key => dadosAtualizaos[key] === undefined && delete dadosAtualizados[key])
    const uduario = await prisma.usuario.update({
        where:  {id: Number(id)},
        data: dadosAtualizacao,
        include: {perfil: true}
    });
})

app.listen(PORT, () =>{
    console.log("API Capirotesca Rodando")
})