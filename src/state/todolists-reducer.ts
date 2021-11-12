import {FilterValueType, TodolistTypes} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActiveType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActiveType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistTitleActiveType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    id: string
}
export type ChangeTodolistFilterActiveType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}

type ActionsType = RemoveTodolistActiveType | AddTodolistActiveType | ChangeTodolistTitleActiveType | ChangeTodolistFilterActiveType

export const todolistsReducer = (state: Array<TodolistTypes>, action: ActionsType): Array<TodolistTypes> => {
    switch(action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                filter: "all",
                title: action.title
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error("i don't understand")
    }
}

export const RemoveTodolistAC = (todolistId: string):RemoveTodolistActiveType => {
    return { type:'REMOVE-TODOLIST', id: todolistId }
}

export const AddTodolistAC = (title: string):AddTodolistActiveType => {
    return { type:'ADD-TODOLIST', title: title }
}

export const ChangeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleActiveType => {
    return { type:'CHANGE-TODOLIST-TITLE', id:id, title: title }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType):ChangeTodolistFilterActiveType => {
    return { type:'CHANGE-TODOLIST-FILTER', id:id, filter: filter }
}