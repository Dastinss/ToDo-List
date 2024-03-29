import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodoListAC,
    filterTasksAC, fetchTodoListsTC,
    removeTodoListAC, setTodolistsAC,
    TodolistsReducer,
    updateTodoListAC
} from "./state/todolists-reducer";
import {
    addTaskAC, addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC,
    tasksReducer, updateTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {todolistsAPI} from "./api/todolist-api";

export type FilterValueTypes = 'all' | 'active' | 'completed'

export type TodoListType = { id: string, title: string, filter: FilterValueTypes }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists) // первый аргумент в дженерике -AppRootStateType - тип с которым мы работаем (берем из стейта), второй - то что мы хотим из нешего селектора возвратить TodoListType[] (массив туду листов берем из редьюсера). А в параметрах колл бека сидит наш стейт
    let tasks1 = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) // первый аргумент в дженерике -AppRootStateType - тип с которым мы работаем (берем из стейта), второй - то что мы хотим из нешего селектора возвратить TasksStateType (обект таск из редьюсера). А в параметрах колл бека сидит наш стейт

    // let [todoLists, dispatchTodoLists] = useReducer(TodolistsReducer, //осталось с Арр при копировании компоненты, тут оставил, чтобы видеть разницу в подъодах
    //     [
    //         {id: todoListID1, title: 'What to know', filter: 'all'},
    //         {id: todoListID2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks1, dispatchTask1] = useReducer(tasksReducer, {
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSSs", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "ReactAPI", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Book", isDone: true},
    //         {id: v1(), title: "Beer", isDone: false},
    //         {id: v1(), title: "Gas", isDone: false},
    //         {id: v1(), title: "Sweets", isDone: false},
    //     ],
    // })

    // const dispatch = useDispatch(); // метод стора диспатч, вызов которого спровоцирует\оживит работу нашего флакс круговорота, соотве-но изменение нашего стейта и нашего UI
    const dispatch = useAppDispatch(); //14 вместо useDispatch прописали переменную, которой присвоиди в стор хук useDispatch и УЖЕ там же его вызвали

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        // let action = removeTaskAC(taskId, todoListId)
        // dispatchTask1(action)
        // dispatch(removeTaskAC(taskId, todoListId)) // 14 заменили на санки. Ранее при клике на иконку корзины, и сразу диспатчим экшен на изменение в глобальном стейте нужной таски
        dispatch(removeTaskTC(taskId, todoListId))  // 14 из компоненты будем диспатчить нашу санку- в которую предварително сделаем запрос на обновление на сервер, и только потом (then) отправим уже экшен в redux
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => { // обернули (и еще 2 ф-ции "по цепочке") в уроке 11 эту ф-цию в useCallback. Эта ф-ция идет "по цепочке", т.к. выступвет родительской копонентой по отношению к дочерней в ТудуЛист addTaskHandler и передает туда пропсы
        // dispatch(addTaskAC(title, todoListId)) // 14 закоментили т.к. заменили єтот блок на Thunk
        dispatch(addTaskTC(todoListId, title)) // 14 добавли т.к. получаем таску с сервера, а не создаем ее вручную
    }, [dispatch])

    // const updateIsDone = useCallback((taskId: string, newIsDone: boolean, todoListId: string,) => {
    //     dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    // }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // const action = changeTaskStatusAC(id, status, todolistId); // 14
        // dispatch(action);
        dispatch(updateTaskTC(todolistId, id, status))
    }, []);

    const updateTask = useCallback((todoListId: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskID, newTitle))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    //отвечает за добавление ТудуЛиста. Когда вызывается этот колл бек, т.е. при добавлении ТудуЛиста, создается новая ф-ция, и пропсы, соот-но, другие. Вызывается диспатч, изменились Тудулисты, и AppWithRedux ререндерится\вызывается
    const addTodoList = useCallback((newTitle: string) => { // обернули (и еще 2 ф-ции "по цепочке") в уроке 11 эту ф-цию в useCallback, которая приходит в пропсы ф-ции AddItemForm
        let action = addTodoListAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const updateTodoList = useCallback((todoListId: string, newTitle: string) => {
        dispatch(updateTodoListAC(todoListId, newTitle))
    }, [dispatch])

    const filterTasks = useCallback((todoListId: string, value: FilterValueTypes) => {
        dispatch(filterTasksAC(todoListId, value))
    }, [dispatch])

    useEffect(() => {
        // todolistsAPI.getTodolists() // 14 ассинхронный запрос на API Димыча, т.е. получается, что мы из UI дедаем запрос в DAL, что архитекрутрно неправильно, поэтому переносим эту логику в Thunk т.е. в todolist-reduser
        //     .then((res) => {
        //         dispatch (setTodolistsAC(res.data))
        //     })
        dispatch(fetchTodoListsTC()) // 14 для того, чтобы задиспатчить эту функцию, а не только обьект как ранее, подключили middleware в сторе
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {
                        // // let filteredTasks = tasks1;
                        // let filteredTasks = tasks1[el.id]; // перенесли в уроке 11 в ТудуЛист
                        //
                        // if (el.filter === 'active') { // если фильтр 'active' то, отрисуй el.isDone. Тут название свойства (фильтр) = названию метода фильтр ниже. Простое совпадение
                        //     filteredTasks = tasks1[el.id].filter((el) => el.isDone)
                        // }
                        // if (el.filter === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
                        //     filteredTasks = tasks1[el.id].filter((el) => !el.isDone)
                        // }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={el.id} //НЕ типизируем! єто номер как в Москвиче, как номер дома для одинаковіх массивов, Ключ для НЕлюдей ))
                                    todoListId={el.id} // в отличие от строки выше типизаруем, это номер для Людей
                                    title={el.title} // вызываем второе св=во каждого элемента массива todoLists, т.е. имя!! это 'What to learn' и 'What to buy'
                                    // tasks={filteredTasks}    //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!
                                    tasks={tasks1[el.id]}    // урок 11 вместо значения строкой выше после переноса в тудулист  filteredTasks. Отдаем все такси конкретного ТудуЛиста, а фмльтровать их будем уже в ТудуЛист
                                    removeTask={removeTask}
                                    filterTasks={filterTasks}
                                    addTask={addTask}
                                    // updateIsDone={updateIsDone} // 14 заменил на
                                    changeTaskStatus={changeStatus}
                                    filterValueKey={el.filter} // замениили filterValueKey на filter из второго массива
                                    removeTodoList={removeTodoList}
                                    updateTask={updateTask}
                                    updateTodoList={updateTodoList}
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;