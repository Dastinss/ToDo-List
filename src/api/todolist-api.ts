// DAL уровень - уровень взаимодействия с бек єндом. Своеобразная прослойка

import axios from "axios";


const settings = { // свойство чтобы цеплялась кука и не было ошибки 401
    withCredentials: true, // withCredentials говорит нам, чтобы кука устанавливалась с каждым запросом (определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie))
    headers: {
        'API-KEY': 'a7ac1bc5-0d23-4742-ab18-200ee19c5490'
    }
}

// объект-экземпляр аксиоса, c помощью него делаем запросы для сокращения кода - чтобы не писать длинный url и чтобі не передавать  settings запрос
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todoListAPI = {
    getTodoList() {
        const promise =
            // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            instance.get<TodoListType[]>('todo-lists')
        return promise
    },

    postTodoList(title: string) {
        const promise =
            // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
            instance.post<ResponseType<TodoListType>>('todo-lists', {title: title})
        return promise
    },

    deleteTodoList(todolistId: string) {
        const promise =
            // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },

    putTodoList(todolistId: string, title: string) {
        const promise =
            // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
            instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    }
}

export type ResponseType<D={}> = { // объединим эти 3 типа в один generic-тип:
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


type TodoListType = {
    addedDate: string
    id: string
    order: number
    title: string
}
//
// type CreateTodoListType = {
//     data: {}
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }