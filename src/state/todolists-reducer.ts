// Lesson # 8

import {FilterValueTypes, TodoListType} from "../App";
import {v1} from "uuid";

export const TodolistsReducer = (state: TodoListType[], action: tsarType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }

        case 'ADD-TODOLIST' : {
            let newID = v1();
            let newTodo: TodoListType = {id: newID, title: action.payload.newTodolistTitle, filter: 'all'}; // для пустого ТудуЛиста
            return [...state, newTodo]
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, title: action.payload.newTodolistTitle} : el)
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, filter: action.payload.newFilter} : el)
        }
    }
}

type tsarType = removeTodoListACType | addTodoListACType | updateTodoListACType | filterTasksACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistId1: string) => { //это наш собранный action
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId1
        }
    } as const
}

type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle
        }
    } as const
}

type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export const updateTodoListAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    } as const
}

type filterTasksACType = ReturnType<typeof filterTasksAC>
export const filterTasksAC = (todolistId2: string, newFilter: FilterValueTypes) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    } as const
}