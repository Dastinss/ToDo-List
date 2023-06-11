// Lesson # 8

import {FilterValueTypes, TodoListType} from "../App";
import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

// const initialState: TodoListType[] = []; // для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой массив

export type SetTodolistActionType = { //14
    type: 'SET-TODOLISTS',
    todoLists: TodolistType[]
}

const initialState: Array<TodolistDomainType> = [ // 14 ввел сам с/но образцу из урока 14 для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой массив
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type TodolistDomainType = TodolistType & {
    filter: FilterValueTypes
}

export const TodolistsReducer = (state = initialState, action: tsarType): Array<TodolistDomainType> => { // чистая ф-ция, т.е. входяшие данные не меняет, поэтому в каждый
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }

        case 'ADD-TODOLIST' : {
            // let newID = v1(); // закоментил в 9 уроке, когда добавили один ИД для одного актион для двух редьюсеров
            // let newTodo: TodoListType = {id: newID, title: action.payload.newTodolistTitle, filter: 'all'}; // закоментил в 9 уроке, когда добавили один ИД для одного актион для двух редьюсеров

            // let newTodo: TodoListType = {id: action.payload.todoListId, title: action.payload.newTodolistTitle, filter: 'all', }; // добавил в 9 уроке
            // return [...state, newTodo]
            //
            return [{
                id: action.payload.todoListId,
                title: action.payload.newTodolistTitle,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]

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

//14 создаем (по др схеме в отличие от верхних) АС который будет устанавливать наше значение в стейте
export const setTodolistsAC = (todoLists: Array<TodolistType>): SetTodolistActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
}

