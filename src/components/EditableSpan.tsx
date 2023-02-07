import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    OLDtitle: string
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.OLDtitle)   // создаем хук которій нам выводит из инпут введенный текст в строку ниже

    const onDoubleClickHandler = () => {
        setEdit(!edit) // прикол!! взяли противоположное значение ,чтобы не обыгрывать тру\фалс через тернарник или иф\элс
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
        // setError(false) // если начинаем что то путнее печатать после выведения красного текста Title is required, то этот красный текст исчезает
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