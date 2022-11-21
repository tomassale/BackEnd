import mongoose from "mongoose";
import MensajesModel from "../models/MensajesModel.js";

export default class Mensajes {
  static message = [];
  constructor() {
    this.url = 'mongodb+srv://tomas:zeuscoco00@cluster0.jvtto1j.mongodb.net/?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
  }
  
  async createMessage(mess) {
    try{
      await this.mongodb(this.url)
      const newMessage = await new MensajesModel(mess).save()
      return {newMessage}
    } catch(err){
      console.log(err)
    }
  }

  async getAllMessages() {
    try{
      await this.mongodb(this.url)
      return await MensajesModel.find()
    } catch(err) {
      return {error: "No hay mensajes cargados"}
    };
  }

  async postMessage(Auth, mess) {
    try{
      await MensajesModel.updateOne(
        { $push: { author: Auth}},
        { mensaje: mess }
      )
      return await MensajesModel.findById(Auth)
    } catch(err){
      return {error: 'Mensaje no enviado'}
    }
  }
}