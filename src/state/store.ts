import {tasksReducer} from './tasks-reducer';
import {TodolistsReducer} from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import {useDispatch} from "react-redux";
import thunk, {ThunkDispatch} from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk)); //14 добавили второй аргумент applyMiddleware(thunk), что помогло устранить ошибку "action должен быть простым объектом, а мы подсовываем какую-функцию. Но нам нужно задиспатчить функция. И для этого мы подключим и будем использовать middleware"

type ThunkDispatchType = ThunkDispatch<AppRootStateType,any,AnyAction> // 14 типизаруем (?) санку, раньше не было, появилась необходиомсть при переходе Реакта на 18 версию, тянем все из библиоотеки, содержит ВСЕГДА три параметра, -все слова зарезервированы

export const useAppDispatch = () => useDispatch<ThunkDispatchType>() // 14 после того как типизаровали хук, показали что он возвращает. т.о. тип диспатч может принимать в себя и санки и еще AnyAction, т.е. любые action

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

