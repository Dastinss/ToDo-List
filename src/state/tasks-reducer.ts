// Lesson # 9

import AppWithRedux, {FilterValueTypes, TasksStateType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodoListActionType, SetTodolistActionType, setTodolistsAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";

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
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}

        // case 'ADD-TASK' :
        //     let newTask = {id: v1(), title: action.title, isDone: false}
        //     return {
        //         ...state, [action.todoListId]: [newTask, ...state[action.todoListId]]
        //     }

        // case 'ADD-TASK': { // 14 закоментил, т.к. ранее мы создавали таску локально и нам приходилось самим генерировать id и создавать другие поля.  а с 14 урока получаем таску - т.к. в жизни эту работу на себя берет сервер и нам на основании title сервер возвращает уже всю таску. И соответственно нам нужно изменить addTaskAC и логику в редьюсере
        //     const stateCopy = {...state}
        //     const newTask: TaskType = {
        //         id: v1(),
        //         title: action.title,
        //         status: TaskStatuses.New,
        //         todoListId: action.todoListId, description: '',
        //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        //     }
        //     const tasks = stateCopy[action.todoListId];
        //     const newTasks = [newTask, ...tasks];
        //     stateCopy[action.todoListId] = newTasks;
        //     return stateCopy;
        // }


        case 'ADD-TASK': { // 14 вместо таски, которую создавали локально - см.выше. Т.е. нам на основании title сервер возвращает уже всю таску, нам не нужно самим генерировать id и создавать другие поля
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.todoListId]] // [нашли по ключу нужный нам массив в ассоциативном массиве]: [создали новый массив, положили туда сначала таску, которая нам пришла с бек энда, взяли стейт, нашли по ключу нужный нам массив и высыпали него деструктуризацией все элементы], т.е. записали новую таску в начало массива
            }
        }

        //то же самое что и сверху, но записанное не в одну строку
        // case 'ADD-TASK': {
        //     const stateCopy = {...state}
        //     const tasks = stateCopy[action.task.todoListId];
        //     const newTasks = [action.task, ...tasks];
        //     stateCopy[action.task.todoListId] = newTasks;
        //     return stateCopy;
        // }


        // [action.task, ...{...state}[action.task.todoListId]]

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

        case
        'CHANGE-TASK-STATUS' : { // 14 ЄТОТ вариант взял с download
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case 'CHANGE-TITLE-TASK' : {
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

        case 'ADD-TODOLIST' :
            return {
                ...state,
                [action.payload.todoListId]: []
            }

        case 'REMOVE-TODOLIST' : {
            const copyState = {...state}
            delete copyState[action.todoListId] // удаление через delete
            return copyState

            // const {[action.todoListId]: [], ...rest} = {...state} // удаление чеоез деструктуризацию: выделили нужное нам свойство которое грохаем и выделяем вторую часть нашего объекта, куда будут входить оставшиеся св-ва нашего обьекта
            // return rest
        }

        case 'SET-TODOLISTS' : { // // 14 добавили т.к. в тудулист редьюсер добавляем новій туду лист, соответственно,нужно добавить в каждый тудулист пустой массив для тасок
            const stateCopy = {...state}
            action.todoLists.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy;
        }

        case 'SET-TASKS' : // 14 Предполагаем, что таски у нас откуда-то взялись и нам нужно их засетать в стейт
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

// export const addTaskAC = (title: string, todoListId: string) => { // 14 закоментил, т.к. у нас теперь приходит таска
//     return {type: 'ADD-TASK', title, todoListId} as const
// }

export const addTaskAC = (task: TaskType, todoListId: string) => { // 14 заменил title на task, которая приходит с бекєнда
    return {type: 'ADD-TASK', task, todoListId} as const
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

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => { // 14 создали Thunk, параметры смотрим в https://social-network.samuraijs.com/docs?type=todolist#todo_lists__todolistid__tasks__taskid__delete, сделаем запрос на обновление на сервер, и только потом (then) отправим уже экшен в redux
    todolistsAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todoListId, taskId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => { // 14 создали Thunk, параметры смотрим в https://social-network.samuraijs.com/docs?type=todolist#todo_lists__todolistid__tasks__taskid__delete, сделаем запрос на обновление на сервер, и только потом (then) отправим уже экшен в redux
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item, todolistId)) // item - єто целый обьект с респонс с кучей полей с https://social-network.samuraijs.com/docs?type=todolist#todo_lists__todolistid__tasks_post
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) => // 14 создали Thunk,
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[taskId].find(t => t.id === taskId)// создвем модель для запроса с\но из типизиции (?) todolist-ap . getState: () возвращает целиком весь стейт

        if (task) { // делаем проверку ,что если есть у нас таска, то только в таком случае мы будем собирать модельку и только в таком случае мы будем делать запрос на api
            const model: UpdateTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                status: status // можно просто записать одно слово status
            }
            // собираем model с помощью getState, которая вернет нам целиком весь стейт
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                })
        }
    }