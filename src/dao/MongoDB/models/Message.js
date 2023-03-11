import {Schema} from "mongoose";
import { managerMongoDB } from "../../../db/managerMongoDB.js";

const url = process.env.URLMONGODB

const messageSchema = new Schema({
    nombre: String, 
    email: {
        type: String, 
        unique: true
    },
    message: String
})

export class ManagerMessageMongoDB extends managerMongoDB{
    constructor(){
        super(url, "messages", messageSchema)
        //Atributos propios de la clase
    }
    //Metodos propios de la clase
}