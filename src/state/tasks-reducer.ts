// Lesson # 9

import {FilterValueTypes, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {addTodoListACType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeStatusTaskActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTitleTaskActionType = ReturnType<typeof changeTaskTitleAC>

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | addTodoListACType //єкспортировали тип с файла todolists-reducer
    | RemoveTodolistActionType

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => { // для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой обьект
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }

        case 'ADD-TASK' :
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todoListId]: [newTask, ...state[action.todoListId]]
            }

        case 'CHANGE-STATUS-TASK' : {
            // return {  ///// ЄТОТ ВАРИАНТ НАПИСАЛИ НА ЛЕКЦИИ НЕ ИДЕТ!!! ставится одновременно галочка на всех тасках ((((
            //     ...state,
            //     [action.todoListId]: state[action.todoListId].map(task => task.id ? {
            //         ...task,
            //         isDone: action.isDone
            //     } : task)
            // }

            let todolistTasks = state[action.todoListId]; /// ЄТОТ вариант взял с download
            // найдём нужную таску:
            let task = todolistTasks.find(task => task.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
            }
            return ({...state});
        }


        case
        'CHANGE-TITLE-TASK' : {
            // return { ЄТОТ ВАРИАНТ НАПИСАЛИ НА ЛЕКЦИИ НЕ ИДЕТ!!! ставится одновременно галочка на всех тасках ((((
            //     ...state,
            //     [action.todoListId]: state[action.todoListId].map(task => task.id ? {
            //         ...task,
            //         title: action.title
            //     } : task)
            // }

            let todolistTasks = state[action.todoListId];
            // найдём нужную таску:
            let task = todolistTasks.find(task => task.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return ({...state});
        }

        case
        'ADD-TODOLIST'
        :
            return {
                ...state,
                [action.payload.todoListId]: []
            }

        case
        'REMOVE-TODOLIST'
        :
            const copyState = {...state}
            delete copyState[action.todoListId] // удаление чеоез delete
            return copyState

        // const {[action.todoListId]: [], ...rest} = {...state} // удаление чеоез деструктуризацию: выделили нужное нам свойство которое грохаем и выделяем вторую часть нашего объекта, куда будут входить оставшиеся св-ва нашего обьекта
        // return rest

        default:
            // throw new Error('I dont understand this type') // урок 10 закоментили, изменили на стейт,
            return state; //если switch не нашёл совпадения, то он должен вернуть state без изменения
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => { //это наш собранный action
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}

export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', title, todoListId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {type: 'CHANGE-STATUS-TASK', taskId, isDone, todoListId} as const
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TITLE-TASK', todoListId, taskId, title} as const
}

export const RemoveTodolistAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', todoListId} as const
}