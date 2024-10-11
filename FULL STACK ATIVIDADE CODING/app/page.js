"use client"
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [formData, setFormData] = useState({
    titulo: "",
    descricao:"",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) =>{

    const response = await axios.delete('/api',{
      params:{
        mongoId:id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  const completeTodo = async (id) => {
    const response = await axios.put('/api',{},{
      params:{
        mongoId:id
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  useEffect(()=>{
    fetchTodos();
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({...form, [name]:value}));
    console.log(formData);
    
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault(); 
    try {
      //api code
      const response = await axios.post('/api',formData)
      toast.success(response.data.msg)
      setFormData({
        titulo: "",
        descricao:"",
      })
      await fetchTodos();
    } catch (error) {
      toast.error("Error")
    }
  }

  return ( 
    <>
      <ToastContainer theme="dark"/>
      <form onSubmit={onSubmitHandler} className='flex items-start flex-col gap-2 w-[80%] max-w-[60rem] mt-24 px-2 mx-auto'>
        <input value={formData.titulo} onChange={onChangeHandler} type="text" name='titulo' placeholder="Digite o título" className='px-3 py-2 border-2 w-full' />
        <textarea value={formData.descricao} onChange={onChangeHandler} name="descricao" placeholder="Coloque a descrição" className="px-3 py-2 border-2 w-full" />
        <button type="submit" className="bg-blue-400 py-3 m-2 mx-auto px-11 text-white font-semibold rounded-md">Add Afazeres</button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
    <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100 text-gray-800">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Título
                </th>
                <th scope="col" className="px-6 py-3">
                    Descrição
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Ação
                </th>
            </tr>
        </thead>
        <tbody>
           {todoData.map((item,index)=>{
              return <Todo key={index} id={index} titulo={item.titulo} descricao={item.descricao} complete={item.completo} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
           })}
        </tbody>
    </table>
</div>

    </>
  );
}
