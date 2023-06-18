import React, {ChangeEvent, useCallback} from 'react';
import styles from "../Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
// import {TaskType} from "../Todolist"; // 14 закоментил
import {TaskStatuses, TaskType} from "../api/todolist-api";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTask: (todoListId: string, taskID: string) => void
    // updateIsDone: (taskId: string, newIsDone: boolean, todoListId: string,) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    updateTask: (todoListId: string, taskID: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => { // выделенная компонента из Todolist, т.к. нужно в т.ч. использовать хук useCallback, а в методе мар где эта компонента была до этого жто делать запрещено
    const removeTaskHandler = () => {
        props.removeTask(props.todoListId, props.task.id)
    }

    // const updateIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {     // 14 закоментил - заменил на ф-цию с "коробки". ранее -убираем ошибки красные в конс лог в хром, т.к. isDone жестко прошито (стоит или true или false). переносим в App как updateIsDone
    //     props.updateIsDone(props.task.id, event.currentTarget.checked, props.todoListId)
    // }

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    }, [props.task.id, props.todoListId]);

    const updateTaskHandler = useCallback( (newTitle: string) => {
        props.updateTask(props.todoListId, props.task.id, newTitle)
    }, [ props.updateTask, props.todoListId, props.task.id ])

    console.log('Task')

    return (
        // <li key={props.task.id} className={props.task.isDone ? styles.isDone : ''}> // 14 закоментил, т.к. изза isDone пошел конфликт между ТудуЛист и ТудулистАПИ
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                // onChange={updateIsDoneHandler} // 14 заменил на ф-цию которая шла в "коробке с уроком"
                onChange={onChangeHandler}
                // checked={props.task.isDone} // 14 закоментил, т.к. изза isDone пошел конфликт между ТудуЛист и ТудулистАПИ
                checked={props.task.status === TaskStatuses.Completed}
            />

            <EditableSpan OLDtitle={props.task.title} callBack={updateTaskHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
});