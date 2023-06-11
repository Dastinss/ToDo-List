// import React, {useEffect, useState} from 'react'
// import axios from "axios";
// import {number} from "prop-types";
// import {todolistsAPI} from "../api/todolist-api";
//
// export default {
//     title: 'API'
// }
// // закоментил в 13 после переноса в todolist-api.ts
// // const settings = { // свойство чтобы цеплялась кука и не было ошибки 401
// //     withCredentials: true, // withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
// //     headers: {
// //         'API-KEY': 'a7ac1bc5-0d23-4742-ab18-200ee19c5490'
// //     }
// // }
//
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings) // закоментил в 13 после переноса в todolist-api.ts
//         todolistsAPI.getTodolists()
//             .then(res => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'REACT_TEST'}, settings)
//         todolistsAPI.createTodolist('REACT_21-05-23_OK')
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '4d9b29b7-7d63-499f-b422-eeba798e39e5'
//         // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '02e6931f-712f-4392-bf3f-e5991ab2c2b1'
//         // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'SERG THE BEST'}, settings)
//         todolistsAPI.updateTodolist(todolistId, '21-05-2023 EVERYTHING IS OK')
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
// export const GetTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks', settings) // закоментил в 13 после переноса в todolist-api.ts
//         todolistsAPI.getTasks()
//             .then(res => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks', {title: 'REACT_TEST'}, settings)
//         todolistsAPI.createTask('REACT_21-05-23_OK')
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '4d9b29b7-7d63-499f-b422-eeba798e39e5'
//         // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings)
//         todolistsAPI.deleteTask(todolistId)
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '02e6931f-712f-4392-bf3f-e5991ab2c2b1'
//         // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {title: 'SERG THE BEST'}, settings)
//         todolistsAPI.updateTask(todolistId, '21-05-2023 EVERYTHING IS OK')
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }