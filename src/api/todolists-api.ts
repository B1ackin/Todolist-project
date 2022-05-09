import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "f5672e80-a634-4f02-b45e-05dc647960a5"
    }
}

export type TodolistType ={
    id: string,
    title: string,
    addedDate: string,
    order: string
}

type createTodolistType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        item: TodolistType
    }
}

type deleteTodolistType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}

type updateTodolistType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<Array<TodolistType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<createTodolistType>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<deleteTodolistType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolist(id:string, title: string) {
        const promise = axios.put<updateTodolistType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
        return promise
    }
}