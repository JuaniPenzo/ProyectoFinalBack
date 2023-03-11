import {Schema} from "mongoose";
import { managerMongoDB } from "../../../db/managerMongoDB.js";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: String,
    description: String, 
    price: Number, 
    thumbnail: String,
    code: String, 
    stock: Number, 
    category: String, 
    status: Boolean
})

export class ManagerProductMongoDB extends managerMongoDB{
    constructor(){
        super(url, "products", productSchema)
        //Atributos propios de la clase
    }
    //Metodos propios de la clase
}