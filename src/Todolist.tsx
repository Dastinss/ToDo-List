import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {FilterValueTypes} from "./AppWithRedux";
//import {Button} from "./components/Button";
import styles from "./Todolist.module.css"
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolist-api";
//import {CheckBox} from "./components/CheckBox";
// import Button from '@material-ui/core/Button'; // прописал "через колено" - штатным способом не работало
// import DeleteIcon from '@material-ui/icons/Delete'; // прописал "через колено" - штатным способом не работало
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Button from '@material-ui/core/Button'; // прописал "через колено" - штатным способом не работало
import Checkbox from '@material-ui/core/Checkbox';
import {Task} from "./components/Task";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useAppDispatch} from "./state/store";

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskID: string) => void
    filterTasks: (todoListId: string, value: FilterValueTypes) => void
    addTask: (valueTitle: string, todoListId: string) => void
    // updateIsDone: (taskId: string, newIsDone: boolean, todoListId: string,) => void // 14 заменил на changeTaskStatus
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    filterValueKey: FilterValueTypes
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, taskID: string, newTitle: string) => void
    updateTodoList: (todoListId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => { // обернули в React.memo в уроке 11, мемо работает в связке с useCallback если есть колл беки. В данном случае колл беки есть (callBack: (valueTitle: string) => void)
    // let [title, setTitle] = useState(' ')   // создаем хук которій нам выводит из инпут введенный текст в строку ниже
    // const [error, setError] = useState(false)
    const [clickedButton, setClickedButton] = useState('all')

    const dispatch = useAppDispatch()

    useEffect(() => { // 14  задиспатчили санку (вызвав санк-криетор и передав туда свою id) для подгружать таски для наших тудулистов
        dispatch(fetchTasksTC(props.todoListId))
    }, [])

    // const updateIsDoneHandler = (elId: string, newIsDone: boolean) => { //скопировали типизацию из PropsType CheckBox
    //     props.updateIsDone(elId, newIsDone)
    // }

    // const addTask = () => {
    //     if (title.trim() !== '') { //добавили защиту от возможности добавления в input поля без текста (если "+" нажимаем без текста)
    //         props.addTask(props.todoListId, title.trim()) //добавили защиту от возможности ввода текста с пробелами перед/после
    //     } else {
    //         setError(true) // если пытаемся ввести пробел или пустую строку, выводит красный текст Title is required
    //     }
    //     setTitle(' ') // обнуляем поле инпут после ввода текста и нажатия "+"
    // }

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.currentTarget.value)
    //     setError(false) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
    // }

    // const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         addTask()       // после if идет условие, которое в инпуте реагирует на кнопку Ентер!
    //     }
    // }

    const onAllClickHandler = () => {
        props.filterTasks(props.todoListId, 'all')
        setClickedButton('all')
    }
    const onActiveClickHandler = () => {
        props.filterTasks(props.todoListId, 'active')
        setClickedButton('active')
    }
    const onCompletedClickHandler = () => {
        props.filterTasks(props.todoListId, 'completed')
        setClickedButton('completed')
    }

    const addTaskHandler = useCallback((valueTitle: string) => { //  обернули (и еще 2 ф-ции "по цепочке" которые выступают коллбеками AddItemForm) в уроке 11 эту ф-цию в useCallback
        props.addTask(valueTitle, props.todoListId)
    }, [props.addTask, props.todoListId])

    const removeTodoListHandler = () => { //создаем ф-цию по удалению ТоДоЛиста
        props.removeTodoList(props.todoListId)
    }

    const updateTodoListHandler = useCallback((newTitle: string) => {
        props.updateTodoList(props.todoListId, newTitle)
    }, [props.updateTodoList, props.todoListId]);

    let tasksForTodolist = props.tasks; // перенесли в уроке 11 ИЗ AppWithRedux, поменял некоторые моменты из dowload к уроку. Т.о. решили проблему с лишней перерисовкой при фильтрации (нажатии клавищ)

    if (props.filterValueKey === 'active') { // если фильтр 'active' то, отрисуй el.isDone. Тут название свойства (фильтр) = названию метода фильтр ниже. Простое совпадение
        // tasksForTodolist = props.tasks.filter(el => el.isDone === false) // 14 закоментил, т.к. изза isDone пошел конфликт между ТудуЛист и ТудулистАПИ
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filterValueKey === 'completed') { // если фильтр 'active' то, отрисуй !el.isDone
        // tasksForTodolist = props.tasks.filter(el => el.isDone === true) // 14 закоментил, т.к. изза isDone пошел конфликт между ТудуЛист и ТудулистАПИ
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan OLDtitle={props.title} callBack={updateTodoListHandler}/>
            {/*<button onClick={removeTodoListHandler}>X</button> // закоментил в уроке 7 когда добавил кнопку с material-ui.com*/}
            {/*<Button onClick={removeTodoListHandler} variant="outlined" startIcon={<DeleteIcon /> }> // прописал "через колено" - штатным способом не работало*/}
            {/*    Delete*/}
            {/*</Button>*/}
            <IconButton onClick={removeTodoListHandler}>
                <Delete/>
            </IconButton>
        </h3>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyDown={onKeyDownHandler}*/}
        {/*           className={error ? styles.error : ''} //вводим красную рамку, если будет невверный текст (пустота)*/}
        {/*    />*/}

        {/*    <button onClick={() => addTask()}>+</button>*/}
        {/*    /!*<button onClick={(event) => props.addTask(title)}>+</button>*!/*/}
        {/*    {error && <div className={styles.errorMessage}>Title is required</div>}*/}
        {/*</div>*/}
        <AddItemForm callBack={addTaskHandler}/>
        <ul>{
            tasksForTodolist.map((el, index) =>
                    <Task
                        key={el.id}
                        task={el} // поставил task вместо el, чтобы совпадало с тем, что есть в шаблоне
                        todoListId={props.todoListId}
                        removeTask={props.removeTask}
                        // updateIsDone={props.updateIsDone} // 14 закоментил глобально при замене IsDone на status
                        changeTaskStatus={props.changeTaskStatus}
                        updateTask={props.updateTask}
                    />
                //ВЫНЕС В ОТДЕЛЬНУЮ КОМПОНЕНТУ TASK
                // { // отрисовываем уже отфильтрованные таски
                //     const removeTaskHandler = () => {
                //         props.removeTask(props.todoListId, el.id)
                //     }
                //
                //     //удали стр 34-36 при выносе чек бокс в отдельную компоненту, переписали по новой строчкой ниже
                //     const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {     // убираем ошибки красные в конс лог в хром, т.к. isDone жестко прошито (стоит или true или false). переносим в App как updateIsDone
                //         props.updateIsDone(el.id, event.currentTarget.checked, props.todoListId)
                //     }
                //     //
                //     // const updateIsDoneHandler = (newIsDone: boolean) => { //скопировали типизацию из PropsType CheckBox
                //     //   props.updateIsDone(el.id, newIsDone)
                //     // }
                //
                //     const updateTaskHandler = (newTitle: string) => {
                //         props.updateTask(props.todoListId, el.id, newTitle)
                //     }
                //
                //     return (
                //         <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                //             <Checkbox
                //                 onChange={updateIsDoneHandler}
                //                 checked={el.isDone}
                //             />
                //
                //             {/*<input type="checkbox" onChange={updateIsDoneHandler} checked={el.isDone}/> // закоментил в уроке 7 когда добавил Checkbox с material-ui.com*/}
                //             {/*<CheckBox checked={el.isDone} callBack={(newIsDone) => updateIsDoneHandler(el.id, newIsDone)}/>*/}
                //             {/*<span>{el.title}</span> // перенесли в новую компоненту EditableSpan*/}
                //
                //             <EditableSpan OLDtitle={el.title} callBack={updateTaskHandler}/>
                //             <IconButton onClick={removeTaskHandler}>
                //                 <Delete/>
                //             </IconButton>
                //             {/*<button onClick={removeTaskHandler}>X</button> // закоментил в уроке 7 когда добавил кнопку с material-ui.com*/}
                //             {/*<button onClick={()=>removeTaskHandler(el.id)}>X</button>*/}
                //             {/*<Button buttonName={'X'} callBack={removeTaskHandler}/>*/}
                //         </li>
                //     )
                // }
            )
        }
        </ul>
        <div>
            <Button
                onClick={onAllClickHandler}
                variant={clickedButton === 'all' ? "outlined" : "contained"}
                color="primary"> All </Button>

            <Button
                onClick={onActiveClickHandler}
                variant={clickedButton === 'active' ? "outlined" : "contained"}
                color="inherit"> Active </Button>

            <Button
                onClick={onCompletedClickHandler}
                variant={clickedButton === 'completed' ? "outlined" : "contained"}
                color="secondary"> Completed </Button>

            {/*<button className={clickedButton === 'all' ? styles.activeFilter : ''} // закоментил в уроке 7 когда добавил кнопку с material-ui.com*!/*/}
            {/*        onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={clickedButton === 'active' ? styles.activeFilter : ''} // закоментил в уроке 7 когда добавил кнопку с material-ui.com*!/*/}
            {/*        onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={clickedButton === 'completed' ? styles.activeFilter : ''} // закоментил в уроке 7 когда добавил кнопку с material-ui.com*!/*/}
            {/*        onClick={onCompletedClickHandler}>Completed</button>*/}

        </div>
    </div>
})

// закоментил в уроке 7 когда добавил кнопку с material-ui.com