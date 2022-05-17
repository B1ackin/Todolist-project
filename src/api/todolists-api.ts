import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "f5672e80-a634-4f02-b45e-05dc647960a5"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        ...settings
})

export type TodolistType = {
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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<createTodolistType>("todo-lists", {title: title})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<deleteTodolistType>(`todo-lists/${id}`)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<updateTodolistType>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks/`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    },
}