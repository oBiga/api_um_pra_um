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

app.POST("/usuarios", async(req, res) =>{
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
})

app.listen(PORT, () =>{
    console.log("API Capirotesca Rodando")
})