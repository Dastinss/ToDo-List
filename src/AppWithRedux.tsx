import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodoListAC,
    filterTasksAC,
    removeTodoListAC,
    TodolistsReducer,
    updateTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueTypes = 'all' | 'active' | 'completed'

export type TodoListType = { id: string, title: string, filter: FilterValueTypes }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let todoLists = useSelector<AppRootStateType, TodoListType[]>( state=> state.todolists ) // первый аргумент в дженерике -AppRootStateType - тип с которым мы работаем (берем из стейта), второй - то что мы хотим из нешего селектора возвратить TodoListType[] (массив туду листов берем из редьюсера). А в параметрах колл бека сидит наш стейт
    let tasks1 = useSelector<AppRootStateType, TasksStateType>( state => state.tasks ) // первый аргумент в дженерике -AppRootStateType - тип с которым мы работаем (берем из стейта), второй - то что мы хотим из нешего селектора возвратить TasksStateType (обект таск из редьюсера). А в параметрах колл бека сидит наш стейт

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

    const dispatch = useDispatch(); // метод стора диспатч, вызов которого спровоцирует\оживит работу нашего флакс круговорота, соотве-но изменение нашего стейта и нашего UI

    const removeTask = (todoListId: string, taskId: string) => {
        // let action = removeTaskAC(taskId, todoListId)
        // dispatchTask1(action)
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (valueTitle: string, todoListId: string) => {
        dispatch(addTaskAC(valueTitle, todoListId))
    }

    const updateIsDone = (taskId: string, newIsDone: boolean, todoListId: string, ) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    };

    const updateTask = (todoListId: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskID, newTitle))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    const addTodoList = (newTitle: string) => {
        let action = addTodoListAC(newTitle)
        dispatch(action)
    }

    const updateTodoList = (todoListId: string, newTitle: string) => {
        dispatch(updateTodoListAC(todoListId, newTitle))
    }

    const filterTasks = (todoListId: string, value: FilterValueTypes) => {
        dispatch(filterTasksAC(todoListId, value))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {
                        // let filteredTasks = tasks1;
                        let filteredTasks = tasks1[el.id];

                        if (el.filter === 'active') { // если фильтр 'active' то, отрисуй el.isDone. Тут название свойства (фильтр) = названию метода фильтр ниже. Простое совпадение
                            filteredTasks = tasks1[el.id].filter((el) => el.isDone)
                        }
                        if (el.filter === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
                            filteredTasks = tasks1[el.id].filter((el) => !el.isDone)
                        }
                        return <Grid item>
                            <Paper style = {{padding: '10px'}}>
                            <Todolist
                                key={el.id} //НЕ типизируем! єто номер как в Москвиче, как номер дома для одинаковіх массивов, Ключ для НЕлюдей ))
                                todoListId={el.id} // в отличие от строки выше типизаруем, это номер для Людей
                                title={el.title} // вызываем второе св=во каждого элемента массива todoLists, т.е. имя!! это 'What to learn' и 'What to buy'
                                tasks={filteredTasks}    //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!
                                removeTask={removeTask}
                                filterTasks={filterTasks}
                                addTask={addTask}
                                updateIsDone={updateIsDone}
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