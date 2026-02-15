import { useState, useEffect } from "react"
import type TodoInterface from "./interfaces/TodoInterface"
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";

function App() {

  //State för att lagra alla todos
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  // State för att hantera felmeddelanden
  const [error, setError] = useState<string | null>(null);
  // State för att visa laddningsstatus
  const [loading, setLoading] = useState<boolean>(false);

  //Körs när komponenten laddas
  useEffect(() => {
    fetchTodos();
  }, [])

  //Hämtar todos från API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://labb2dt210g.onrender.com/api/todos");

      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    } catch (error) {
      setError("Ett fel har uppstått, försök igen senare...")
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Todo-list</h1>
      {error && <p>{error}</p>}
      {loading && <p>Data laddas in...</p>}

      <AddTodo updatedTodo={fetchTodos} />

      {todos.map((todo) =>
        <Todo todo={todo} key={todo.id} updatedTodo={fetchTodos} />
      )}
    </>
  )
}

export default App
