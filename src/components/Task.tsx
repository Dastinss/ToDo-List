import React, {ChangeEvent, useCallback} from 'react';
import styles from "../Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../Todolist";

type PropsType = {
    task: TaskType
    todoListId: string
    removeTask: (todoListId: string, taskID: string) => void
    updateIsDone: (taskId: string, newIsDone: boolean, todoListId: string,) => void
    updateTask: (todoListId: string, taskID: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => { // выделенная компонента из Todolist
    const removeTaskHandler = () => {
        props.removeTask(props.todoListId, props.task.id)
    }
    const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {     // убираем ошибки красные в конс лог в хром, т.к. isDone жестко прошито (стоит или true или false). переносим в App как updateIsDone
        props.updateIsDone(props.task.id, event.currentTarget.checked, props.todoListId)
    }
    const updateTaskHandler = useCallback( (newTitle: string) => {
        props.updateTask(props.todoListId, props.task.id, newTitle)
    }, [ props.updateTask, props.todoListId, props.task.id ])

    return (
        <li key={props.task.id} className={props.task.isDone ? styles.isDone : ''}>
            <Checkbox
                onChange={updateIsDoneHandler}
                checked={props.task.isDone}
            />

            <EditableSpan OLDtitle={props.task.title} callBack={updateTaskHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
});