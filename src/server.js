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

app.listen(PORT, () =>{
    console.log("API Capirotesca Rodando")
})