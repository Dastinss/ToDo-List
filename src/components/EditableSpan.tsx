import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    OLDtitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.OLDtitle)   // создаем хук которій нам выводит из инпут введенный текст в строку ниже

    const onDoubleClickHandler = () => { // срабатівает ф-ция когда счелкам по молоку , делает вводимое поле неактивным
        setEdit(!edit) // прикол!! взяли противоположное значение ,чтобы не обыгрывать тру\фалс через тернарник или иф\элс
        addTask()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
        // setError(false) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
    }

    const addTask = () => {
        props.callBack(newTitle) //добавили защиту от возможности ввода текста с пробелами перед/после
    }

    // const onBlurHandler = () => {
    //     setEdit(false)
    // }

    return (
        edit
            // ? <input value={props.title} onBlur={onBlurHandler} autoFocus/>
            ? <input value={newTitle} onBlur={onDoubleClickHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.OLDtitle}</span>
        // {/*<span>{el.title}</span>  // старый, перенесенный тег*/}
    )
}