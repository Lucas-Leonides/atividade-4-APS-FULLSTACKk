const { default: mongoose } = require("mongoose");

 const Schema = new mongoose.Schema({
  titulo:{
    type:String,
    required:true,
  },
  descricao:{
    type:String,
    required:true,
  },
  completo:{
    type:Boolean,
    default:false,
  }
 },
 {
  timeStamp:true
 })

 const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

 export default TodoModel;