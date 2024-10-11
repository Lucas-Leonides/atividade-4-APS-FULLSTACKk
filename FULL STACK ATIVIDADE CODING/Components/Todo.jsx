import React from "react";

const Todo = ({id, titulo, descricao, mongoId,completo, deleteTodo, completeTodo}) => {
  return (
      <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {id+1}
                </th>
                <td className="px-6 py-4">
                    {titulo}
                </td>
                <td className="px-6 py-4">
                    {descricao}
                </td>
                <td className="px-6 py-4">
                    {completo?"Completo":"Pendente"}
                </td>
                <td className="px-6 py-4 flex gap-1">
                    <button onClick={()=> deleteTodo(mongoId)}className="py-2 px-4 bg-red-400 rounded-md text-white font-semibold">Deletar</button>
                    <button onClick={()=> completeTodo(mongoId)}className="py-2 px-4 bg-green-500 rounded-md text-white font-semibold">Feito</button>
                </td>
            </tr>  
  )
}

export default Todo