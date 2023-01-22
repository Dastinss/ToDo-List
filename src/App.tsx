import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTypes = 'all' | 'active' | 'completed'

function App() {
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

    const [filterValueKey, setfilterValueKey] = useState<FilterValueTypes>('all') //засетаем filterKey в глобальній ЮсСтейт и его имя становится глобальным, т.к его имя ренее не видели разные блоки кода

    const removeTask = (taskID: string) => {
        // tasks1 = tasks1.filter((el) => el.id !== taskID)
        setTask1(tasks1.filter((el) => el.id !== taskID))
    }

    let filteredTasks = tasks1;

    if (filterValueKey === 'active') {
        filteredTasks = tasks1.filter((el) => el.isDone)
    }
    if (filterValueKey === 'completed') {
        filteredTasks = tasks1.filter((el) => !el.isDone)
    }
    //
    // console.log(filterKey)

    const filterTasks = (value: FilterValueTypes) => {       //в ф-цию filterTasks приходит значение - название кнопки FilterValueTypes
        setfilterValueKey(value)
    }

// let filteredTasks = tasks1.filter((el) => el.isDone) //ЄТО "ДРУШЛАК для макаронов"ищем только елементы с isDone: true, далее упростили т.к. ===true можно пренебречь

    return (
        <div className="App">

            <Todolist
                title="What to learn"
                tasks={filteredTasks}    //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
                updateIsDone={updateIsDone}
                filterValueKey={filterValueKey}
            />

        </div>
    );
}

export default App;
