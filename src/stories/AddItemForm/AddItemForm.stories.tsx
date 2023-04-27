import {AddItemForm} from '../../components/AddItemForm';
import {action} from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        callBack: { // PropsType из AddItemForm
            description: 'Button clicked inside form'
        }
    },
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const AddItemFormStory = {
    args: {
        callBack: action('Button clicked inside form')
    },
};