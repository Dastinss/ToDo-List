// Lesson # 8

import {FilterValueTypes, TodoListType} from "../App";
import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

// const initialState: TodoListType[] = []; // для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой массив

export type SetTodolistActionType = { //14 добавил новый АС. Такая типизация не испольщуется в пробакшене в отлисие от ReturnType<typeof SmrhAC>
    type: 'SET-TODOLISTS',
    todoLists: TodolistType[]
}

const initialState: Array<TodolistDomainType> = [ // 14 ввел сам с/но образцу из урока 14 для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой массив
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type TodolistDomainType = TodolistType & { // 14 дополняем TodolistType- то что мі получаем с бєк єнда и дополняем еще одним свойством filter который необходим для нашего типа локально, т.е. бек энд его не содержит
    filter: FilterValueTypes
}

type ActionsType = removeTodoListActionType
    | addTodoListActionType
    | updateTodoListActionType
    | filterTasksActionType
    | SetTodolistActionType // 14 добавили новый тип, после чего в редьсере будет виден новый кейс

export const TodolistsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => { // чистая ф-ция, т.е. входяшие данные не меняет, поэтому в каждый
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
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                filter: action.payload.newFilter
            } : el)
        }

        case 'SET-TODOLISTS' : {
            return action.todoLists.map( (el) => ( {...el, filter: "all"} ) ) // 14 case добавили. Если бы в TodolistDomainType не было filter, то мы бы оставили все без мар, т.е. return action.todoLists
        }

        default:
            return state //если switch не нашёл совпадения, то он должен вернуть state без изменения
    }
}

type removeTodoListActionType = ReturnType<typeof removeTodoListAC> // такая типизация более универсальная, чем типизация с указанием типов, т.к. подтягивает все автоматом и при добавлении новых типов, не нужно пподправлять все
export const removeTodoListAC = (todolistId1: string) => { //это наш собранный action
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId1
        }
    } as const
}

export type addTodoListActionType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle,
            todoListId: v1() // добавил в 9 уроке, когда создали новый ТАскРедьюсер и поняли, что в двух редьюсерах исп-ся один и тот же action. Чтобы соотнести новый массив ТудуЛист с новымими тасками, которые в нем появяться добавили один и тот же ИД для них
        }
    } as const
}

type updateTodoListActionType = ReturnType<typeof updateTodoListAC>
export const updateTodoListAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    } as const
}

type filterTasksActionType = ReturnType<typeof filterTasksAC>
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
// type SetTodolistActionType = ReturnType<typeof setTodolistsAC>//14 вариант № 2 типизации
export const setTodolistsAC = (todoLists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todoLists
    } as const
}