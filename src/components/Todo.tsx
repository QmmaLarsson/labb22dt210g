import type TodoInterface from "../interfaces/TodoInterface"

const Todo = ({ todo }: { todo: TodoInterface }) => {
    return (
        <article>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>{todo.status.toUpperCase()}</p>
        </article>
    )
}

export default Todo