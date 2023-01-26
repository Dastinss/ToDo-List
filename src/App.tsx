import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTypes = 'all' | 'active' | 'completed'

type TodoListType = {id: string, title: string, filter: FilterValueTypes} // добавили новый массив в уроке 5

function App() {

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([ // добавили новый массив в уроке 5
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    // let tasks1 = [
    //     {id: 1, title: "HTML&CSS", isDone: false},
    //     {id: 2, title: "JS", isDone: false},
    //     {id: 3, title: "ReactJS", isDone: true},
    //     {id: 4, title: "ReactAPI", isDone: true},
    //     {id: 5, title: "GraphQL", isDone: true},
    // ]

    let [tasks1, setTask1] = useState([           //ЄТО КАСТРЮЛЯ с макаронами
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "ReactAPI", isDone: true},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    const updateIsDone = (taskId: string, newIsDone: boolean) => { // чтобы привызяать к конкретной строке из п.17 указваем id & isDone. Цель - вяжем єту функцию у тегу updateIsDoneHandler из TodoList
        setTask1 (tasks1.map(el=> el.id === taskId ? {...el, isDone: newIsDone}  : el ))
        //console.log(taskId, newIsDone) было перед тем, как прописали строку выше, которая начала ставит галочки сразу в браузере
    };

    const addTask = (valueTitle: string) => { //создаем ф-цию АддТаск для того, чтобі с поля input через + вводить новые значения в строки ниже
                                                // далее из ТудуЛист переносим вводиміе значение в консолькоторую в последствии меняем на setTask1
        const newType: TaskType = {id: v1(), title: valueTitle, isDone: false}; //добавляем вводиміе в инпут данніе как строку ниже тайловских. Ввод TaskType при этом это типизация!!

        setTask1([newType,...tasks1]) //"раздели" старый массив, т.е. достали яблоки из ящика, добавили новый эллемент и снова обернули в массивЕсли поставить вместо setTask1 - consol.log, то текст останется в полу инпут (так біло до setTask1)
    }

    // const [filterValueKey, setfilterValueKey] = useState<FilterValueTypes>('all') //засетаем filterKey в глобальній ЮсСтейт и его имя становится глобальным, т.к его имя ренее не видели разные блоки кода
    // убрали строку выше, т.к. в новом массиве todoLists уже есть метод filter

    const removeTask = (taskID: string) => {
        // tasks1 = tasks1.filter((el) => el.id !== taskID)
        setTask1(tasks1.filter((el) => el.id !== taskID))
    }

    // let filteredTasks = tasks1;// перенесли єтот блок в "мозги" метода мап, чтобы
    // if (filterValueKey === 'active') { // если фильтр 'active' то, отрисуй el.isDone
    //     filteredTasks = tasks1.filter((el) => el.isDone)    }
    // if (filterValueKey === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
    //     filteredTasks = tasks1.filter((el) => !el.isDone)    }
    //
    // console.log(filterKey)

    const filterTasks = (todoListId: string, value: FilterValueTypes) => {       //в ф-цию filterTasks приходит значение - название кнопки FilterValueTypes
        // setfilterValueKey(value) // убрали єту ф-цию, т.к. берем фильтр напрямую со второго массива (вместо filterValueKey берем filter)
        setTodoLists()
    }

// let filteredTasks = tasks1.filter((el) => el.isDone) //ЄТО "ДРУШЛАК для макаронов"ищем только елементы с isDone: true, далее упростили т.к. ===true можно пренебречь

    //пример как мультиплицировать три раза вызов массива   Todolist : let arrViktory = [0,0]
    // делее строка 75 {arrViktory.map((el) => { ....... и т.д.

    return (
        <div className="App">
            {todoLists.map((el) => {
                let filteredTasks = tasks1;

                if (el.filter === 'active') { // если фильтр 'active' то, отрисуй el.isDone
                    filteredTasks = tasks1.filter((el) => el.isDone)
                }
                if (el.filter === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
                    filteredTasks = tasks1.filter((el) => !el.isDone)
                }
                return (
                    <Todolist
                        key ={el.id} //НЕ типизируем! єто номер как в Москвиче, как номер дома для одинаковіх массивов, Ключ для НЕлюдей ))
                        todoListId = {el.id} // в отличие от строки выше типизаруем, это номер для Людей
                        title={el.title} // вызываем второе св=во каждого элемента массива todoLists, т.е. имя!! это 'What to learn' и 'What to buy'
                        tasks={filteredTasks}    //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        updateIsDone={updateIsDone}
                        filterValueKey={el.filter} // замениили filterValueKey на filter из второго массива
                    />
                )
            })}

            {/*<Todolist // перенесли эту компоненту выше, чтобы перересовать ее через мап столько раз сколько элементов в массиве todoLists*/}
            {/*    title="What to learn"*/}
            {/*    tasks={filteredTasks}    //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!*/}
            {/*    removeTask={removeTask}*/}
            {/*    filterTasks={filterTasks}*/}
            {/*    addTask={addTask}*/}
            {/*    updateIsDone={updateIsDone}*/}
            {/*    filterValueKey={filterValueKey}*/}
            {/*/>*/}

        </div>
    );
}

export default App;
