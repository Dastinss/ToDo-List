import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueTypes} from "./App";
import {Button} from "./components/Button";
import styles from "./Todolist.module.css"
import {CheckBox} from "./components/CheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    filterTasks: (value: FilterValueTypes) => void
    addTask: (valueTitle: string) => void
    updateIsDone: (taskId: string, newIsDone: boolean) => void
    filterValueKey: FilterValueTypes
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState(' ')   // создаем хук которій нам выводит из инпут введенный текст в строку ниже
    const [error, setError] = useState(false)
    const [clickedButton, setClickedButton] = useState('all')

    // const updateIsDoneHandler = (elId: string, newIsDone: boolean) => { //скопировали типизацию из PropsType CheckBox
    //     props.updateIsDone(elId, newIsDone)
    // }

    const mappedTasks = props.tasks.map((el, index) => {    //вінесли "по-челоловечески" ))) map
        const removeTaskHandler = () => {
            props.removeTask(el.id)
        }

        //удали стр 34-36 при выносе чек бокс в отдельную компоненту, переписали по новой строчкой ниже
        const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {     // убираем ошибки красные в конс лог в хром, т.к. isDone жестко прошито (стоит или true или false). переносим в App как updateIsDone
            props.updateIsDone(el.id, event.currentTarget.checked)
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

    const addTaskHandler = () => {
        if (title.trim() !== '') { //добавили защиту от возможности добавления в input поля без текста (если "+" нажимаем без текста)
            props.addTask(title.trim()) //добавили защиту от возможности ввода текста с пробелами перед/после
        } else {
            setError(true) // если пытаемся ввести пробел или пустую строку, выводит красный текст Title is required
        }
        setTitle(' ') // обнуляем поле инпут после ввода текста и нажатия "+"
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
    }

    // const filterTasksHandlerAll = () => {
    //     props.filterTasks('all')
    // }
    //
    // const filterTasksHandlerActive = () => {
    //     props.filterTasks('active')
    // }
    //
    // const filterTasksHandlerCompleted = () => {
    //     props.filterTasks('completed')
    // }

    // const removeTaskHandler = (elId: string) => {     //наша ф-ция ждет аргумент elId: string, т.о. на строке 69 превращаем ссілку на ф-цию в ф-цию добавив перед ней  после нее скобки() передавая elID
    //     props.removeTask(elId)
    // }


    // const changeFilterTsarHandler = (filterValue: FilterValueTypes, musor?: number) => {
    // const changeFilterTsarHandler = (filterValue: FilterValueTypes) => {
    //     {
    //         props.filterTasks(filterValue)
    //         setClickedButton(filterValue)
    //     }     // обьединение трех батонов в одит. Ставим filterValue т.к. нужно несколько аргументов поставить (Алл, Актив, Соиплитед), а похволяетсятся только один
    // }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()       // после if идет условие, которое в инпуте реагирует на кнопку Ентер!
        }
    }

    const onAllClickHandler = () => {
        props.filterTasks('all')
        setClickedButton('all')
    }
    const onActiveClickHandler = () => {
        props.filterTasks('active')
        setClickedButton('active')
    }
    const onCompletedClickHandler = () => {
        props.filterTasks('completed')
        setClickedButton('completed')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? styles.error : ''} //вводим красную рамку, если будет невверный текст (пустота)
            />


            {/*onChangeHandler выше не ф-ция, а ссылка на ф-цию. Это как указатель "город Минск"*/}
            {/*<input onChange={(event) => setTitle(event.currentTarget.value)}/>//вынесли вверх из инпута функцию добавления текста*/}
            {/*<Button buttonName={'+'} callBack={() => addTaskHandler()}/>*/}
            <button onClick={() => addTaskHandler()}>+</button>
            {/*<button onClick={(event) => props.addTask(title)}>+</button>*/}
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {mappedTasks}
            {/*{props.tasks.map((el, index) => {*/}
            {/*    const removeTaskHandler = () => {*/}
            {/*        props.removeTask(el.id)*/}
            {/*    }*/}
            {/*    return (*/}
            {/*        <li key={el.id}>*/}
            {/*            <button onClick={()=>removeTaskHandler(el.id)}>X</button>*/}
            {/*            <input type="checkbox" checked={el.isDone}/>*/}
            {/*            <span>{el.title}</span>*/}
            {/*        </li>*/}

            {/*    )*/}
            {/*})}*/}

            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button className={clickedButton === 'all' ? styles.activeFilter : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={clickedButton === 'active' ? styles.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={clickedButton === 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            {/*<Button buttonName={'All'} callBack={() => changeFilterTsarHandler('all')}/>*/}
            {/*<Button buttonName={'Active'} callBack={() => changeFilterTsarHandler('active')}/>*/}
            {/*<Button buttonName={'Completed'} callBack={() => changeFilterTsarHandler('completed')}/>*/}
            {/*<button onClick={() => changeFilterTsarHandler('all', 100200)}>All</button>  //100200 єто под "musor" */}
            {/*<button onClick={() => changeFilterTsarHandler('active')}>Active</button>*/}
            {/*<button onClick={() => changeFilterTsarHandler('completed')}>Completed</button>*/}
            {/*<button onClick={filterTasksHandlerCompleted}>Completed</button>*/}
            {/*<button onClick={() => props.filterTasks('Completed')}>Completed</button>         //как пример для всех трех */}
        </div>
    </div>
}