// Lesson # 8

import {FilterValueTypes, TodoListType} from "../App";
import {v1} from "uuid";

const initialState: TodoListType[] = []; // для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой массив

export const TodolistsReducer = (state = initialState, action: tsarType): TodoListType[] => { // чистая ф-ция, т.е. входяшие данные не меняет, поэтому в каждый
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }

        case 'ADD-TODOLIST' : {
            // let newID = v1(); // закоментил в 9 уроке, когда добавили один ИД для одного актион для двух редьюсеров
            // let newTodo: TodoListType = {id: newID, title: action.payload.newTodolistTitle, filter: 'all'}; // закоментил в 9 уроке, когда добавили один ИД для одного актион для двух редьюсеров
            let newTodo: TodoListType = {id: action.payload.todoListId, title: action.payload.newTodolistTitle, filter: 'all'}; // добавил в 9 уроке
            return [...state, newTodo]
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, title: action.payload.newTodolistTitle} : el)
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, filter: action.payload.newFilter} : el)
        }

        default:
            return state //если switch не нашёл совпадения, то он должен вернуть state без изменения
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

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle,
            todoListId: v1() // добавил в 9 уроке, когда создали новый ТАскРедьюсер и поняли, что в двух редьюсерах исп-ся один и тот же action. Чтобы соотнести новый массив ТудуЛист с новымими тасками, которые в нем появяться добавили один и тот же ИД для них
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