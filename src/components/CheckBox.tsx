import React, {ChangeEvent} from 'react';
// import {TaskType} from "../Todolist";
import {TaskType} from "../api/todolist-api";

type PropsType = {
    checked: boolean
    callBack: (newIsDone: boolean) => void
    // updateIsDoneHandler: (event: ChangeEvent<HTMLInputElement>)=> void
}

export const CheckBox = (props: PropsType) => {
    const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)     // єто наш аргумент isDone из App который приходит транзитом из TodoList
    }

    return (
        <div>
            <input type="checkbox" onChange={updateIsDoneHandler} checked={props.checked}/>
        </div>
    );
};
