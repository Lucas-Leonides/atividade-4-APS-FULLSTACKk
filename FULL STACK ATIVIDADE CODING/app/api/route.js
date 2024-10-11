javascript
import { ConnectDB } from "@/lib/config/db"; // Importa a função de conexão com o banco de dados
import TodoModel from "@/lib/models/todoModel"; // Importa o modelo de Todo
import { NextResponse } from "next/server"; // Importa o objeto NextResponse para responder às requisições

const LoadDB = async () => {
    await ConnectDB(); // Conecta ao banco de dados ao carregar o módulo
}

LoadDB(); // Executa a função de conexão ao banco de dados

export async function GET(request) {
    const todos = await TodoModel.find({}); // Busca todos os documentos na coleção de 'todos'
    return NextResponse.json({todos: todos}); // Retorna a resposta em formato JSON com todos os 'todos'
}

export async function POST(request) {
    const { titulo, descricao } = await request.json(); // Extrai 'titulo' e 'descricao' do corpo da requisição
    await TodoModel.create({
        titulo, 
        descricao
    }); // Cria um novo documento na coleção com o título e a descrição fornecidos

    return NextResponse.json({ msg: "Todo criado" }); // Retorna uma mensagem de sucesso após a criação
}

export async function DELETE(request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId'); // Obtém o 'mongoId' dos parâmetros da URL
    await TodoModel.findByIdAndDelete(mongoId); // Encontra e exclui o documento correspondente ao 'mongoId'
    return NextResponse.json({ msg: "Todo excluído" }); // Retorna uma mensagem de sucesso após a exclusão
}

export async function PUT(request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId'); // Obtém o 'mongoId' dos parâmetros da URL
    await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
            completo: true
        }
    }); // Atualiza o campo 'completo' para 'true' no documento correspondente ao 'mongoId'
    
    return NextResponse.json({ msg: "Todo completo" }); // Retorna uma mensagem de sucesso após a atualização
}
