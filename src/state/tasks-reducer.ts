// Lesson # 9

import {FilterValueTypes, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

type ActionType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }

        case 'ADD-TASK' :
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todoListId]: [newTask, ...state[action.todoListId]]
    }

        default:
            throw new Error('I dont understand this type')
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => { //это наш собранный action
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}

export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', title, todoListId} as const
}