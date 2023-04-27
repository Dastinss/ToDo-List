import {AddItemForm} from '../../components/AddItemForm';
import {action} from '@storybook/addon-actions'
import {Task} from "../../components/Task";
import {TaskType} from "../../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        task: {id: '#id_done', title: 'JS', isDone: true},
        todoListId: '#toDoListId_my_storybook',
        removeTask: action('removeTask'),
        updateIsDone: action('updateIsDone'),
        updateTask: action('updateTask')
    }
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const TaskIsDoneStory = {};

export const TaskIsNotDoneStory = {
    args: {
        task: {id: '#id_NOT_done_&che?', title: 'CSS', isDone: false},
        todoListId: '#toDoListId_my_storybook',
    },
};

