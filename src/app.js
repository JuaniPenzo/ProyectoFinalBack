import express from 'express'
import routerProduct from './routes/productos.routes.js'
import {__dirname, __filename} from './path.js'
import multer from 'multer'
import { ProductManager } from "./controllers/ProductManager.js";
import {engine} from 'express-handlebars'
import {Server} from 'socket.io'
import * as path from 'path'

const app = express()
const PORT = 8080
const productManager =  new ProductManager('src/models/data.json');

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
const io = new Server(server)

io.on("connection", async(socket)=>{
    console.log("Cliente conectado")
  
    socket.on("addProduct", async data =>{
      const newProduct = {...data, status:true};
      let mensaje = await productManager.addProduct(newProduct); 
      io.emit("mensajeProductoAgregado",mensaje)
      console.log(mensaje)
    })
    socket.on("deleteProduct", async id=>{
      let mensaje = await productManager.deleteProduct(id)
      io.emit("mensajeProductoEliminado",mensaje)
      console.log(mensaje)
    })

    socket.emit("getProducts",  await productManager.getProduct());
  })

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)

//Upload Imagenes
app.post('/upload', upload.single('product'), (req, res)=>{
    console.log(req.body)
    res.send("Imagen cargada")
})

//HBS
const products = await productManager.getProduct()

app.get('/', (req, res)=>{
    res.render(
        "home",
        {
            products
        }
    )
})
app.get('/realtimeproducts', (req, res)=>{
    res.render(
        "realTimeProducts",
    )
})

/* Nuevo app.js (fueron descargadas las dev dependencies)
import 'dotenv/config'
import express from 'express'
import socket from 'socket.io'
import { getManagerMenssages, getManagerProducts } from './dao/daoManager'

const app = express()
const managerMessage = new getManagerMenssages()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("port", process.env.PORT || 8080)

const server = app.listen(app.get("port", ()=>{
    console.log(`Server on port ${app.get("port")}`)
}))

const io = socket(server)

io.on("connection", async (socket)=>{
    socket.on("message", async (info)=>{
        await managerMessage.addElements([info])
        const mensajes = await managerMessage.getElements()
        console.log(mensajes)
        socket.emit("allMessages", mensajes)
    })
})
*/