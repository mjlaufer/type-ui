import TodoHeader from './TodoHeader';
import TodoContainer from './TodoContainer';
// import TodoFooter from './TodoFooter';
import { ApiClient, Collection, ModelManager } from '../src';

export interface TodoProps {
    id?: number;
    title?: string;
    completed?: boolean;
}

const todoApiClient = new ApiClient<TodoProps>('http://localhost:3000/todos');

const todoManager = new ModelManager<TodoProps>(todoApiClient);

todoManager.fetch().then((todoCollection: Collection<TodoProps>) => {
    const viewOptions = {
        collection: todoCollection,
        modelManager: todoManager,
        sync: ['change'],
    };

    const header = document.querySelector('.header');
    const main = document.querySelector('.main');
    // const footer = document.querySelector('.footer');

    if (header) {
        const todoHeader = new TodoHeader(header, viewOptions);
        todoHeader.appendToDOM();
    } else {
        throw new Error("Selector '.header' not found.");
    }

    if (main) {
        const todoContainer = new TodoContainer(main, viewOptions);
        todoContainer.appendToDOM();
    } else {
        throw new Error("Selector '.main' not found.");
    }

    // if (footer) {
    //     const todoFooter = new TodoFooter(footer, viewOptions);
    //     todoFooter.appendToDOM();
    // } else {
    //     throw new Error("Selector '.footer' not found.");
    // }
});