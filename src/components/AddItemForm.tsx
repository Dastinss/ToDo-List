import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../Todolist.module.css";

type PropsType = {
    callBack: (valueTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState(' ')   // создаем хук которій нам выводит из инпут введенный текст в строку ниже
    const [error, setError] = useState(false)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') { //добавили защиту от возможности добавления в input поля без текста (если "+" нажимаем без текста)
            props.callBack(newTitle) //добавили защиту от возможности ввода текста с пробелами перед/после
        } else {
            setError(true) // если пытаемся ввести пробел или пустую строку, выводит красный текст Title is required
        }
        setTitle(' ') // обнуляем поле инпут после ввода текста и нажатия "+"
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()       // после if идет условие, которое в инпуте реагирует на кнопку Ентер!
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? styles.error : ''} //вводим красную рамку, если будет невверный текст (пустота)
            />
            <button onClick={() => addTask()}>+</button>
            {/*<button onClick={(event) => props.addTask(title)}>+</button>*/}
            {/*{error && <div className={styles.errorMessage}>Title is required</div>}*/}
        </div>
    );
};
