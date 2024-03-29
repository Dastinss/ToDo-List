import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../Todolist.module.css";
import Button from '@material-ui/core/Button'; // прописал "через колено" - штатным способом не работало
import TextField from '@material-ui/core/TextField'; // прописал "через колено" - штатным способом не работало

type PropsType = {
    callBack: (valueTitle: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => { // обернули в React.memo в уроке 11, мемо работает в связке с useCallback если есть колл беки. В данном случае колл беки есть (callBack: (valueTitle: string) => void)
    let [title, setTitle] = useState(' ')   // создаем хук которій нам выводит из инпут введенный текст в строку ниже
    const [error, setError] = useState<string|null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') { //добавили защиту от возможности добавления в input поля без текста (если "+" нажимаем без текста)
            props.callBack(newTitle) //добавили защиту от возможности ввода текста с пробелами перед/после
        } else {
            setError('Title is required') // если пытаемся ввести пробел или пустую строку, выводит красный текст Title is required
        }
        setTitle(' ') // обнуляем поле инпут после ввода текста и нажатия "+"
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (event.key === 'Enter') {
            addTask()       // после if идет условие, которое в инпуте реагирует на кнопку Ентер!
        }
    }

    const buttonSettings = {
        maxWidth: '30px',
        maxHeight: '40px',
        minWidth: '30px',
        minHeight: '40px',
        backgroundColor: 'blue'
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                id="outlined-basic"
                label={error ? 'Title is required' : 'Welcome'}
                variant="outlined"
                size = "small"
                error = {!!error} // єто значит true, т.е. преобразовали string b
            />

            {/*<input value={title} // // закоментил в уроке 7 когда добавил TextField с material-ui.com*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       className={error ? styles.error : ''} //вводим красную рамку, если будет невверный текст (пустота) *!/*/}
            {/*/>*/}
            {/*<button onClick={() => addTask()}>+</button> // закоментил в уроке 7 когда добавил кнопку с material-ui.com*/}
            <Button
                variant="contained"
                style={buttonSettings}
                onClick={() => addTask()}>+</Button>
            {/*<button onClick={(event) => props.addTask(title)}>+</button> // закоментил в уроке 7 когда добавил TextField с material-ui.com*/}
            {/*{error && <div className={styles.errorMessage}>Title is required</div>} // закоментил в уроке 7 когда добавил TextField с material-ui.com*/}
        </div>
    );
});

//