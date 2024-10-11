import mongoose from "mongoose"

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.xvfeg.mongodb.net/todo-app')
  console.log('banco conectado')
}