import {AddItemForm} from '../../components/AddItemForm';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../../components/EditableSpan";
import {TaskType} from "../../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    args: {
        callBack: {
            description: 'Value EditableSpan changed'
        },

    }
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const EditableSpanExample = {
    args: {
        callBack: action('Value EditableSpan changed'),
        // OLDtitle: {
        //     defaultValue: 'HTML',
        //     description: 'Start value EditableSpan'
        // }
    },
};

