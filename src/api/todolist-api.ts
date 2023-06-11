// DAL уровень - уровень взаимодействия с бек єндом. Своеобразная прослойка

import axios, {AxiosResponse} from "axios";

// //закоментил после 13 урока сделал с\но шаблону входящему к уроку 14 (без стори бук)
// const settings = { // свойство чтобы цеплялась кука и не было ошибки 401
//     withCredentials: true, // withCredentials говорит нам, чтобы кука устанавливалась с каждым запросом (определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie))
//     headers: {
//         'API-KEY': 'a7ac1bc5-0d23-4742-ab18-200ee19c5490'
//     }
// }
//
// //закоментил после 13 урока сделал с\но шаблону входящему к уроку 14 (без стори бук)
// // объект-экземпляр аксиоса, c помощью него делаем запросы для сокращения кода - чтобы не писать длинный url и чтобі не передавать  settings запрос
// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     ...settings
// })

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a7ac1bc5-0d23-4742-ab18-200ee19c5490'
    }
})


// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, {title});
    },


    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

// types
export type TodolistType = { // TodolistType то, что мы непосредственно получаем с бек энда, в отличие от TodolistDomainType- , который мы дополняем еще одним свойством filter
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

// //закоментил после 13 урока сделал с\но шаблону входящему к уроку 14 (без стори бук)
// export const todoListAPI = {
//     getTodoList() {
//         const promise =
//             // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
//             instance.get<TodoListType[]>('todo-lists')
//         return promise
//     },
//
//     postTodoList(title: string) {
//         const promise =
//             // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
//             instance.post<ResponseType<TodoListType>>('todo-lists', {title: title})
//         return promise
//     },
//
//     deleteTodoList(todolistId: string) {
//         const promise =
//             // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
//             instance.delete<ResponseType>(`todo-lists/${todolistId}`)
//         return promise
//     },
//
//     putTodoList(todolistId: string, title: string) {
//         const promise =
//             // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
//             instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
//         return promise
//     },
//
//     getTasks() {
//         const promise =
//             // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
//             instance.get<TodoListType[]>('todo-lists/${todolistId}/tasks')
//         return promise
//     },
//
//     postTasks(title: string) {
//         const promise =
//             instance.post<ResponseType<TodoListType>>('todo-lists/${todolistId}/tasks', {title: title})
//         return promise
//     },
//
//     deleteTasks(todolistId: string) {
//         const promise =
//             instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
//         return promise
//     },
//
//     putTasks(todolistId: string, title: string) {
//         const promise =
//             instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
//         return promise
//     },
//
// }
//
// export type ResponseType<D={}> = { // объединим эти 3 типа в один generic-тип:
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
//
//
// type TodoListType = {
//     addedDate: string
//     id: string
//     order: number
//     title: string
// }
// //
// // type CreateTodoListType = {
// //     data: {}
// //     fieldsErrors: string[]
// //     messages: string[]
// //     resultCode: number
// // }