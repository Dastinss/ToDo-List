// import {TasksStateType, TodoListType} from "../App";
// import {addTodoListAC, TodolistsReducer} from "./todolists-reducer";
// import {tasksReducer} from "./tasks-reducer";
//
// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {}; // создаем стартовое состояние клеточки данных отвечающей за таски, что это пустой объект тип данных которого отвечает заявленному типу
//     const startTodolistsState: Array<TodoListType> = []; //создаем стартовое состояние для второй ветки - TodoList-ов
//
//     const action = addTodoListAC("new todolist");
//
//     const endTasksState = tasksReducer(startTasksState, action) // результатом будет одно свойство у которого ключем будет todoListId, а значением будет пустой массив
//     const endTodolistsState = TodolistsReducer(startTodolistsState, action) // в єтой переменной будет лежать массив, с кол-вом єлементов 1, и єтот элемент будет ТудуЛист, у которого будет ИД\Тайтл которые будут взятЫ из action, фильтр по умолчанию
//
//     const keys = Object.keys(endTasksState); // массив из одного элемента - строка ИД ТудуЛиста
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id; // берем обьект с индексом 1, и у этого объекта берем ИД
//
//     expect(idFromTasks).toBe(action.payload.todoListId);
//     expect(idFromTodolists).toBe(action.payload.todoListId);
// });
