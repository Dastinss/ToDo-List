// Lesson # 9

import AppWithRedux, {FilterValueTypes, TasksStateType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodoListActionType, SetTodolistActionType, setTodolistsAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses,TaskType, todolistsAPI} from "../api/todolist-api";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

// export type ChangeStatusTaskActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTitleTaskActionType = ReturnType<typeof changeTaskTitleAC>

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    // | ChangeStatusTaskActionType
    | ChangeTaskStatusActionType // 14 менял глобально
    | ChangeTitleTaskActionType
    | addTodoListActionType //єкспортировали тип с файла todolists-reducer
    | RemoveTodolistActionType
    | SetTodolistActionType // 14 добавил такой же тип как в тудулист редьсере для добавления массива
    | ReturnType<typeof setTasksAC> // 14

const initialState: TasksStateType = {};

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => { // для параметра state мы задаем значение по дефолту, равное начальному состоянию. У нас это будет пустой обьект
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }

        // case 'ADD-TASK' :
        //     let newTask = {id: v1(), title: action.title, isDone: false}
        //     return {
        //         ...state, [action.todoListId]: [newTask, ...state[action.todoListId]]
        //     }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            const tasks = stateCopy[action.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }

        // case 'CHANGE-STATUS-TASK' : {
        //     // let todolistTasks = state[action.todoListId]; /// ЄТОТ вариант взял с download // закоментил в уроке 11, написали другой ретурн, т.к. добавили React.memo а для React.memo сам массив с тасками не изменился внутри стейта, а значит по правилам иммутабельности внутри ничего не должно было поменяться. Поєтому для React.memo сам массив с тасками не изменился внутри стейта, а значит по правилам иммутабельности внутри ничего не должно было поменяться
        //     // // найдём нужную таску:
        //     // let task = todolistTasks.find(task => task.id === action.taskId);
        //     // //изменим таску, если она нашлась
        //     // if (task) {
        //     //     task.isDone = action.isDone;
        //     // }
        //     // return ({...state});
        //     return {
        //         ...state,
        //         [action.todoListId]: state[action.todoListId]
        //             .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
        //     }
        // }

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case
        'CHANGE-TITLE-TASK' : {
            // let todolistTasks = state[action.todoListId]; /// ЄТОТ вариант взял с download // закоментил в уроке 11, написали другой ретурн, т.к. добавили React.memo а для React.memo сам массив с тасками не изменился внутри стейта, а значит по правилам иммутабельности внутри ничего не должно было поменяться. Поєтому для React.memo сам массив с тасками не изменился внутри стейта, а значит по правилам иммутабельности внутри ничего не должно было поменяться
            // // найдём нужную таску:
            // let task = todolistTasks.find(task => task.id === action.taskId);
            // //изменим таску, если она нашлась
            // if (task) {
            //     task.title = action.title;
            // }
            // return ({...state});
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
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
        : {
            const copyState = {...state}
            delete copyState[action.todoListId] // удаление через delete
            return copyState

            // const {[action.todoListId]: [], ...rest} = {...state} // удаление чеоез деструктуризацию: выделили нужное нам свойство которое грохаем и выделяем вторую часть нашего объекта, куда будут входить оставшиеся св-ва нашего обьекта
            // return rest
        }

        case 'SET-TODOLISTS': { // // 14 добавили т.к. в тудулист редьюсер добавляем новій туду лист, соответственно,нужно добавить в каждый тудулист пустой массив для тасок
            const stateCopy = {...state}
            action.todoLists.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy;
        }

        case 'SET-TASKS': // 14 добавили для добавления конкретной таски в конерктный тудулист (?)
            return {
                ...state, // скопировли полностью наш обьект
                [action.todoListId]: action.tasks // обратились к нужному нам массиву и записали туда то, что нам пришло из актиона
            }
        //  та же запись, но не в одну строку:
        // case 'SET-TASKS': {
        //     const stateCopy = {...state}
        //     stateCopy[action.todolistId] = action.tasks
        //     return stateCopy
        // }


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

// export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => { // 14 закоментил т.к. менял глобально isDone на status changeTaskStatusAC
//     return {type: 'CHANGE-STATUS-TASK', taskId, isDone, todoListId} as const
// }

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TITLE-TASK', todoListId, taskId, title} as const
}

export const RemoveTodolistAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', todoListId} as const
}

export const setTasksAC = (tasks: TaskType[], todoListId: string) => {
    return {type: 'SET-TASKS', tasks, todoListId} as const
}

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => { // 14 создали Thunk для общения этого редьюсера как BLL с DAL уровнем
    todolistsAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoListId))
        })
}