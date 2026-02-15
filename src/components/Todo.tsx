import { useState } from "react"
import type TodoInterface from "../interfaces/TodoInterface"

const Todo = ({ todo, updatedTodo }: { todo: TodoInterface, updatedTodo: Function }) => {

    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);

    //Uppdaterar status när användaren väljer nytt värde i select
    const updateStatus = async (e: any) => {
        //Hämtar nytt statusvärde från select
        const newStatus = e.target.value.toLowerCase();
        //Skapar ett uppdaterat todo-objekt
        const updatedStatus = {
            ...todo,
            status: newStatus
        }

        try {
            setError(null);

            //Skickar PUT-request till API
            const res = await fetch("https://labb2dt210g.onrender.com/api/todos/" + todo.id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(updatedStatus)
            })

            //Om uppdateringen lyckas hämtas alla todos igen
            if (res.ok) {
                updatedTodo();
            } else {
                setError(`Ett fel har uppstått, försök igen senare...`);
            }

        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    //Tar bort todo när användaren klickar på "Ta bort"
    const deleteTodo = async () => {
        try {
            setError(null);

            //Skickar DELETE-request till API
            const res = await fetch(`https://labb2dt210g.onrender.com/api/todos/` + todo.id, {
                method: "DELETE",
            });

            //Om delete lyckas hämtas alla todos igen
            if (res.ok) {
                updatedTodo();
            } else {
                setError("Ett fel har uppstått, försök igen senare...");
            }
        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    return (
        <article>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>{todo.status.toUpperCase()}</p>
            <form>
                <label htmlFor="status"><b>Ändra status:</b></label>
                <br />
                <select name="status" id="status" defaultValue={todo.status} onChange={updateStatus}>
                    <option value="ej påbörjad">EJ PÅBÖRJAD</option>
                    <option value="pågående">PÅGÅENDE</option>
                    <option value="avklarad">AVKLARAD</option>
                </select>
                <button type="button" onClick={deleteTodo}>
                    Ta bort
                </button>
            </form>
            {error && <p>{error}</p>}
        </article>
    )
}

export default Todo