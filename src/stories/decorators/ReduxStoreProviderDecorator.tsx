// // создаем HOC, который принимает и возвращает компоненту
//
// import React from 'react'
// import {Provider} from 'react-redux';
// import {combineReducers} from 'redux'
// import {tasksReducer} from '../../state/tasks-reducer'
// import {TodolistsReducer} from '../../state/todolists-reducer'
// import {v1} from 'uuid'
// import {store} from "../../state/store";
// import {AppRootStateType} from '../../state/store'
// import { legacy_createStore as createStore} from 'redux'
//
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: TodolistsReducer
// })
//
// const initialGlobalState = {
//     todolists: [
//         {id: "todolistId1", title: "What to learn", filter: "all"},
//         {id: "todolistId2", title: "What to buy", filter: "all"}
//     ] ,
//     tasks: {
//         ["todolistId1"]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         ["todolistId2"]: [
//             {id: v1(), title: "Beer", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     }
// };
//
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
//
// export const ReduxStoreProviderDecorator = (storyFn: any) => ( //ф-ция которая принимаем компоненту -историю
//     <Provider
//         store={storyBookStore}>{storyFn()}
//     </Provider>)