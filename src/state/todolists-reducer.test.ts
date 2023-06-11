// import {addTodoListAC, filterTasksAC, removeTodoListAC, TodolistsReducer, updateTodoListAC} from './todolists-reducer';
// import {v1} from 'uuid';
// import {FilterValueTypes, TodoListType} from "../App";
//
// // вынесли наши данные наверх в уроке 10, т.к. TodolistsReducer чистая ф-ция (т.е. данные не изменяет) и мы не только тесты запускаем, но еще тестируем что наша ф-ция чистая
// //
// let todolistId1: string;
// let todolistId2: string;
// let startState: Array<TodoListType> = [];
//
// beforeEach( ()=>{ // инициализировали наши переменные. Данная ф-ция срабатівает перд каждім тестом
//     todolistId1 = v1();
//     todolistId2 = v1();
//
//     startState = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
// } )
//
// test('correct todolist should be removed', () => {
//
//     // let todolistId1 = v1();
//     // let todolistId2 = v1();
//
//     // const startState: Array<TodoListType> = [
//     //     {id: todolistId1, title: "What to learn", filter: "all"},
//     //     {id: todolistId2, title: "What to buy", filter: "all"}
//     // ]
//
//     // const endState = TodolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})
//     const endState = TodolistsReducer( startState, removeTodoListAC (todolistId1) )
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });
//
// test('correct todolist should be added', () => {
//     // let todolistId1 = v1();
//     // let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     // const startState: Array<TodoListType> = [
//     //     {id: todolistId1, title: "What to learn", filter: "all"},
//     //     {id: todolistId2, title: "What to buy", filter: "all"}
//     // ]
//
//     // const endState = TodolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})
//     const endState = TodolistsReducer(startState, addTodoListAC (newTodolistTitle) )
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
// });
//
// test('correct todolist should change its name', () => {
//     // let todolistId1 = v1();
//     // let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     // const startState: Array<TodoListType> = [
//     //     {id: todolistId1, title: "What to learn", filter: "all"},
//     //     {id: todolistId2, title: "What to buy", filter: "all"}
//     // ]
//
//     const action = {
//         type: 'CHANGE-TODOLIST-TITLE',
//         id: todolistId2,
//         title: newTodolistTitle
//     };
//
//     // const endState = TodolistsReducer(startState, action);
//     const endState = TodolistsReducer(startState, updateTodoListAC (todolistId2, newTodolistTitle) );
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//     // let todolistId1 = v1();
//     // let todolistId2 = v1();
//
//     let newFilter: FilterValueTypes = "completed";
//
//     // const startState: Array<TodoListType> = [
//     //     {id: todolistId1, title: "What to learn", filter: "all"},
//     //     {id: todolistId2, title: "What to buy", filter: "all"}
//     // ]
//
//     const action = {
//         type: 'CHANGE-TODOLIST-FILTER',
//         id: todolistId2,
//         filter: newFilter
//     };
//
//     // const endState = TodolistsReducer(startState, action);
//     const endState = TodolistsReducer(startState, filterTasksAC (todolistId2, newFilter));
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
//
