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

export type FilterValueTypes = 'all' | 'active' | 'completed'

export type TodoListType = { id: string, title: string, filter: FilterValueTypes }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(TodolistsReducer,
        [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks1, dispatchTask1] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSSs", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Gas", isDone: false},
            {id: v1(), title: "Bike", isDone: false},
        ],
    })

    const removeTask = (todoListId: string, taskId: string) => {
        // let action = removeTaskAC(taskId, todoListId)
        // dispatchTask1(action)
        dispatchTask1(removeTaskAC(taskId, todoListId))
    }

    const addTask = (valueTitle: string, todoListId: string) => {
        dispatchTask1(addTaskAC(valueTitle, todoListId))
    }

    const updateIsDone = (todoListId: string, taskId: string, newIsDone: boolean) => {
        dispatchTask1(changeTaskStatusAC(todoListId, taskId, newIsDone))
    };

    const updateTask = (todoListId: string, taskID: string, newTitle: string) => {
        dispatchTask1(changeTaskTitleAC(todoListId, taskID, newTitle))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchTodoLists(removeTodoListAC(todoListId))
        // dispatchTask1(removeTodoListAC(todoListId)) // в уроке 10 1:54 есть такое, но у меня система ругается ((
    }

    const addTodoList = (newTitle: string) => {
        let action = addTodoListAC(newTitle)
        dispatchTodoLists(action)
        dispatchTask1(action)
    }

    const updateTodoList = (todoListId: string, newTitle: string) => {
        dispatchTodoLists(updateTodoListAC(todoListId, newTitle))
    }

    const filterTasks = (todoListId: string, value: FilterValueTypes) => {
        dispatchTodoLists(filterTasksAC(todoListId, value))
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

export default AppWithReducers;