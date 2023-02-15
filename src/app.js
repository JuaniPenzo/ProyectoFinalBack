import express from 'express'
import routerProduct from './routes/productos.routes.js'
import routerCarts from './routes/carts.routes.js';
import {__dirname, __filename} from './path.js'
import multer from 'multer'

const app = express()
const PORT = 8080
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

//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts);

//Upload Imagenes
app.post('/upload', upload.single('product'), (req, res)=>{
    console.log(req.body)
    res.send("Imagen cargada")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})