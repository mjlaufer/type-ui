import { Collection, View } from 'simple-web';
import { TodoProps } from '../index';
import TodoPanel from './TodoPanel';

interface ViewOptions {
    collection: Collection<TodoProps>;
}

interface Children {
    [key: string]: string;
}

export default class TodoList extends View<ViewOptions, TodoProps> {
    mapChildren = (): Children => {
        const children = {} as Children;

        this.options.collection.models.forEach((todo, i) => {
            const title = todo.get('title');

            if (title) {
                children[title] = `#todo${i + 1}`;
            }
        });

        return children;
    };

    renderChildren(): void {
        this.options.collection.models.forEach(todo => {
            const title = todo.get('title');

            if (title) {
                const todoPanel = new TodoPanel(this.children[title], { model: todo });
                todoPanel.appendToDOM();
            }
        });
    }

    render(): string {
        let template = '';

        this.options.collection.models.forEach((todo, i) => {
            const title = todo.get('title');

            if (title) {
                template += `<li class="todo" id="todo${i + 1}"></li>`;
            }
        });

        return template;
    }
}