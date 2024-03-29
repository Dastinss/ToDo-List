// import React, {useEffect, useState} from 'react';
// import './App.css';
// import {Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import ButtonAppBar from "./components/ButtonAppBar";
// import {Container, Grid, Paper} from "@material-ui/core";
// import {TaskPriorities, TaskStatuses} from "./api/todolist-api";
// // import {TaskType, todolistsAPI} from "./api/todolist-api";
//
// export type FilterValueTypes = 'all' | 'active' | 'completed'
//
// export type TodoListType = { id: string, title: string, filter: FilterValueTypes } // добавили новый массив в уроке 5
//
// export type TasksStateType = { // добавил в уроке 9 т.к. в шаблоне урока это было, а у меня нет ...
//     [key: string]: Array<TaskType>
// }
//
// // type TaskType1 = { // типизация ключа
// //     [key: string] : TaskType1[]
// // }
//
//
// type TaskType = { // 14 перенес типизацию в Арр, т.к. изза isDone пошел конфликт между ТудуЛист и ТудулистАПИ
//     id: string
//     title: string
//     isDone?: boolean
//     description?: string
//     status?: TaskStatuses
//     priority?: TaskPriorities
//     startDate?: string
//     deadline?: string
//     todoListId?: string
//     order?: number
//     addedDate?: string
// }
//
// function App() {
//
//     let todoListID1 = v1(); //универсальный Моссадовский ключ (урок 5)
//     let todoListID2 = v1(); //универсальный Моссадовский ключ (урок 5)
//
//
//     let [todoLists, setTodoLists] = useState<Array<TodoListType>>([ // добавили новый массив в уроке 5
//         {id: todoListID1, title: 'What to learn', filter: 'all'},
//         {id: todoListID2, title: 'What to buy', filter: 'all'},
//     ])
//
//     let [tasks1, setTask1] = useState<TasksStateType>({    //добавили новый массив (урок 5). Старую "КАСТРЮЛЮ" закоментили
//         [todoListID1]: [
//             {id: v1(), title: "HTML&CSSs", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "ReactAPI", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todoListID2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "Book", isDone: true},
//             {id: v1(), title: "Beer", isDone: false},
//             {id: v1(), title: "Gas", isDone: false},
//             {id: v1(), title: "Bike", isDone: false},
//         ],
//     })
//
//     // let tasks1 = [
//     //     {id: 1, title: "HTML&CSS", isDone: false},
//     //     {id: 2, title: "JS", isDone: false},
//     //     {id: 3, title: "ReactJS", isDone: true},
//     //     {id: 4, title: "ReactAPI", isDone: true},
//     //     {id: 5, title: "GraphQL", isDone: true},
//     // ]
//
//     // let [tasks1, setTask1] = useState([           //ЄТО КАСТРЮЛЯ с макаронами
//     //     {id: v1(), title: "HTML&CSS", isDone: true},
//     //     {id: v1(), title: "JS", isDone: false},
//     //     {id: v1(), title: "ReactJS", isDone: true},
//     //     {id: v1(), title: "ReactAPI", isDone: true},
//     //     {id: v1(), title: "GraphQL", isDone: false},
//     // ])
//
//     const updateTask = (todoListId: string, taskID: string, newTitle: string) => { // ввели новый атрибут taskID - єто квартира)). Сама же  ф-ция которая вносит измнения в стейт -когда даблклик делаем на "Milk", вводим текст, а он затем должен сохраниться
//         // console.log(newTitle) //прозвонили, и увидели в консоли изменеяющийся вводимый текст "GraphQLизменение"
//         setTask1({
//             ...tasks1,
//             [todoListId]: tasks1[todoListId].map(el => el.id === taskID ? {...el, title: newTitle} : el)
//         })
//     }
//
//     const updateTodoList = (todoListId: string, newTitle: string) => {
//         setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, title: newTitle} : el))
//     }
//
//     const removeTodoList = (todoListId: string) => {
//         // console.log(todoListId)
//         setTodoLists(todoLists.filter((el) => el.id !== todoListId))
//         delete tasks1[todoListId] // удаляем индекс массива (т.е. свойство из объекта) ?
//         console.log(tasks1)
//     }
//
//     const updateIsDone = (taskId: string, newIsDone: boolean, todoListId: string) => { // у.5 : добавили глобальную Id (номер подьезда перед номером квартиры)  и перенесли его в тапизацию в Тудулист
//         // чтобы привызяать к конкретной строке из п.17 указваем id & isDone. Цель - вяжем єту функцию у тегу updateIsDoneHandler из TodoList
//         // setTask1 (tasks1.map(el=> el.id === taskId ? {...el, isDone: newIsDone}  : el ))
//         //console.log(taskId, newIsDone) было перед тем, как прописали строку выше, которая начала ставит галочки сразу в браузере
//         setTask1({
//             ...tasks1, [todoListId]: tasks1[todoListId].map((el) => el.id === taskId ? {...el, isDone: newIsDone} : el)//меняем статус квартиры. копия здоровой мартрешки {...tasks1}, т.е. взяли дом (ВСЕ подьезды); создали старый\новый ключ [todoListId], в виде значения выбираем массив (дом) tasks1, в котором выбрали элемент1 (подьезд) [todoListId] и далее квартиру из которой нужно кого-то віселить () (удалить какойто таск) через метод filter
//         })
//     };
//
//     const addTask = (valueTitle: string, todoListId: string) => {   // у.5 : добавили глобальную Id (номер подьезда перед номером квартиры)  и перенесли его в тапизацию в Тудулист
//         //создаем ф-цию АддТаск для того, чтобі с поля input через + вводить новые значения в строки ниже
//         // далее из ТудуЛист переносим вводиміе значение в консолькоторую в последствии меняем на setTask1
//         // const newType: TaskType = {id: v1(), title: valueTitle, isDone: false}; //добавляем вводиміе в инпут данніе как строку ниже тайловских. Ввод TaskType при этом это типизация!!
//         //
//         // setTask1([newType,...tasks1]) //"раздели" старый массив, т.е. достали яблоки из ящика, добавили новый эллемент и снова обернули в массивЕсли поставить вместо setTask1 - consol.log, то текст останется в полу инпут (так біло до setTask1)
//         let newTask = {id: v1(), title: valueTitle, isDone: false}
//         setTask1({...tasks1, [todoListId]: [...tasks1[todoListId], newTask]}) //"раздели" старый массив, т.е. достали яблоки из ящика, добавили новый эллемент В КОНЕЦ МАССИВА и снова обернули в массив
//     }
//
//     const addTodoList = (newTitle: string) => {
//         let newID = v1();
//         let newTodo: TodoListType = {id: newID, title: newTitle, filter: 'all'}; // для пустого ТудуЛиста
//         setTodoLists([newTodo, ...todoLists])
//         setTask1({
//                 ...tasks1,
//                 [newID]: [
//                     {id: v1(), title: "Bear", isDone: true},
//                     {id: v1(), title: "Coca-Cola", isDone: true}
//                 ]
//             }
//         )
//     }
//
//     // const [filterValueKey, setfilterValueKey] = useState<FilterValueTypes>('all') //засетаем filterKey в глобальній ЮсСтейт и его имя становится глобальным, т.к его имя ренее не видели разные блоки кода
//     // убрали строку выше, т.к. в новом массиве todoLists уже есть метод filter
//
//     const removeTask = (todoListId: string, taskId: string) => { // у.5 : добавили глобальную Id (номер подьезда перед номером квартиры) и перенесли его в тапизацию в Тудулист
//         // tasks1 = tasks1.filter((el) => el.id !== taskID)
//         // setTask1(tasks1.filter((el) => el.id !== taskID))
//         setTask1({...tasks1, [todoListId]: tasks1[todoListId].filter((el) => el.id !== taskId)}) //в отличие от метода map где находили нужный подьезд, тут мы прямо указываем на этот подьезд. Для этого копия здоровой мартрешки {...tasks1}, т.е. взяли дом (ВСЕ подьезды); создали старый\новый ключ [todoListId], в виде значения выбираем массив (дом) tasks1, в котором выбрали элемент1 (подьезд) [todoListId] и далее квартиру из которой нужно кого-то віселить () (удалить какойто таск) через метод filter
//     }
//     // let filteredTasks = tasks1;// перенесли єтот блок в "мозги" метода мап, чтобы
//     // if (filterValueKey === 'active') { // если фильтр 'active' то, отрисуй el.isDone
//     //     filteredTasks = tasks1.filter((el) => el.isDone)    }
//     // if (filterValueKey === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
//     //     filteredTasks = tasks1.filter((el) => !el.isDone)    }
//     //
//     // console.log(filterKey)
//
//     const filterTasks = (todoListId: string, value: FilterValueTypes) => {       //в ф-цию filterTasks приходит значение - название кнопки FilterValueTypes
//         // setfilterValueKey(value) // убрали єту ф-цию, т.к. берем фильтр напрямую со второго массива (вместо filterValueKey берем filter)
//         setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el)) //1.создали новый массив с помощью map (єто тот же массив) 2. вызвали колл бек 3.определили какой элемент массива взять (0 или 1) 4. если нашел нужный элемент, то перезаписываем старый элемент,НО! перезаписываем (меняем) новое значение в старое название filter, т.е. вместо 'all' записали 'value' 5.если не нашли нужный эелемент, перезаписываем его без изменений
//     }
//
// // let filteredTasks = tasks1.filter((el) => el.isDone) //ЄТО "ДРУШЛАК для макаронов"ищем только елементы с isDone: true, далее упростили т.к. ===true можно пренебречь
//
//     //пример как мультиплицировать три раза вызов массива   Todolist : let arrViktory = [0,0]
//     // делее строка 75 {arrViktory.map((el) => { ....... и т.д.
//
//     return ( //  урок 7 <ButtonAppBar/> и <Container fixed> добавил из material-ui.com. Далее для  упорядочивания <Grid container>
//         <div className="App">
//             <ButtonAppBar/>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm callBack={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todoLists.map((el) => {
//                         // let filteredTasks = tasks1;
//                         let filteredTasks = tasks1[el.id];
//
//                         if (el.filter === 'active') { // если фильтр 'active' то, отрисуй el.isDone. Тут название свойства (фильтр) = названию метода фильтр ниже. Простое совпадение
//                             // filteredTasks = tasks1.filter((el) => el.isDone) // єтот массив закоментили в у.5
//                             filteredTasks = tasks1[el.id].filter((el) => el.isDone)
//                         }
//                         if (el.filter === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
//                             filteredTasks = tasks1[el.id].filter((el) => !el.isDone)
//                         }
//                         return <Grid item>
//                             <Paper style={{padding: '10px'}}>
//                                 <Todolist
//                                     key={el.id} //НЕ типизируем! єто номер как в Москвиче, как номер дома для одинаковіх массивов, Ключ для НЕлюдей ))
//                                     todoListId={el.id} // в отличие от строки выше типизаруем, это номер для Людей
//                                     title={el.title} // вызываем второе св=во каждого элемента массива todoLists, т.е. имя!! это 'What to learn' и 'What to buy'
//                                     // tasks={filteredTasks}   // 14 закоментил, т.к. ругалось на типі - насовместимые //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!
//                                     tasks={filteredTasks} // 14 поставил заг
//                                     tasks={} // 14 поставил заг
//                                     removeTask={removeTask}
//                                     filterTasks={filterTasks}
//                                     addTask={addTask}
//                                     updateIsDone={updateIsDone}
//                                     filterValueKey={el.filter} // замениили filterValueKey на filter из второго массива
//                                     removeTodoList={removeTodoList}
//                                     updateTask={updateTask}
//                                     updateTodoList={updateTodoList}
//                                 />
//                             </Paper>
//                         </Grid>
//                     })}
//
//                     {/*<Todolist // перенесли эту компоненту выше, чтобы перересовать ее через мап столько раз сколько элементов в массиве todoLists*/}
//                     {/*    title="What to learn"*/}
//                     {/*    tasks={filteredTasks}    //поставили переменную(НЕ функцию!!) filteredTasks вместо переменной {tasks1}, т.е. наш друшлак!!!*/}
//                     {/*    removeTask={removeTask}*/}
//                     {/*    filterTasks={filterTasks}*/}
//                     {/*    addTask={addTask}*/}
//                     {/*    updateIsDone={updateIsDone}*/}
//                     {/*    filterValueKey={filterValueKey}*/}
//                     {/*/>*/}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;