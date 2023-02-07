import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueTypes} from "./App";
//import {Button} from "./components/Button";
import styles from "./Todolist.module.css"
import {AddItemForm} from "./components/AddItemForm";
//import {CheckBox} from "./components/CheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskID: string) => void
    filterTasks: (todoListId: string, value: FilterValueTypes) => void
    addTask: (valueTitle: string, todoListId: string) => void
    updateIsDone: (todoListId: string, taskId: string, newIsDone: boolean) => void
    filterValueKey: FilterValueTypes
    removeTodoList: (todoListId: string)=> void
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState(' ')   // создаем хук которій нам выводит из инпут введенный текст в строку ниже
    // const [error, setError] = useState(false)
    const [clickedButton, setClickedButton] = useState('all')

    // const updateIsDoneHandler = (elId: string, newIsDone: boolean) => { //скопировали типизацию из PropsType CheckBox
    //     props.updateIsDone(elId, newIsDone)
    // }

    const mappedTasks = props.tasks.map((el, index) => {    //вінесли "по-челоловечески" ))) map
        const removeTaskHandler = () => {
            props.removeTask(props.todoListId, el.id)
        }

        //удали стр 34-36 при выносе чек бокс в отдельную компоненту, переписали по новой строчкой ниже
        const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {     // убираем ошибки красные в конс лог в хром, т.к. isDone жестко прошито (стоит или true или false). переносим в App как updateIsDone
            props.updateIsDone(props.todoListId, el.id, event.currentTarget.checked)
        }
        //
        // const updateIsDoneHandler = (newIsDone: boolean) => { //скопировали типизацию из PropsType CheckBox
        //   props.updateIsDone(el.id, newIsDone)
        // }

        return (
            <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                {/*<CheckBox checked={el.isDone} callBack={(newIsDone) => updateIsDoneHandler(el.id, newIsDone)}/>*/}
                <input type="checkbox" onChange={updateIsDoneHandler} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={removeTaskHandler}>X</button>
                {/*<button onClick={()=>removeTaskHandler(el.id)}>X</button>*/}
                {/*<Button buttonName={'X'} callBack={removeTaskHandler}/>*/}
            </li>
        )
    })

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
        props.filterTasks(props.todoListId,'active')
        setClickedButton('active')
    }
    const onCompletedClickHandler = () => {
        props.filterTasks(props.todoListId,'completed')
        setClickedButton('completed')
    }

    const removeTodoListHandler = () => { //создаем ф-цию по удалению ТоДоЛиста
        props.removeTodoList(props.todoListId)
    }

    const addTaskHandler = (valueTitle: string) => {
        props.addTask(valueTitle, props.todoListId)
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={removeTodoListHandler}>X</button>
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
        <AddItemForm callBack={addTaskHandler} />
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button className={clickedButton === 'all' ? styles.activeFilter : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={clickedButton === 'active' ? styles.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={clickedButton === 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed</button>

        </div>
    </div>
}