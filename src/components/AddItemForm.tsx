import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../Todolist.module.css";

type PropsType = {
    callBack: (todoListId: string, valueTitle: string) => void
    todoListId: string
}

export const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState(' ')   // создаем хук которій нам выводит из инпут введенный текст в строку ниже
    const [error, setError] = useState(false)

    const addTaskHandler = () => {
        if (title.trim() !== '') { //добавили защиту от возможности добавления в input поля без текста (если "+" нажимаем без текста)
            props.callBack(props.todoListId, title.trim()) //добавили защиту от возможности ввода текста с пробелами перед/после
        } else {
            setError(true) // если пытаемся ввести пробел или пустую строку, выводит красный текст Title is required
        }
        setTitle(' ') // обнуляем поле инпут после ввода текста и нажатия "+"
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => { // перенесли в компоненту AddItemForm
        if (event.key === 'Enter') {
            addTaskHandler()       // после if идет условие, которое в инпуте реагирует на кнопку Ентер!
        }
    }

    return (
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
    );
};