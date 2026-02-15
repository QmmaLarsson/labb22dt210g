import { useState, useEffect } from "react"
import type TodoInterface from "./interfaces/TodoInterface"
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./index.css";
import Footer from './components/Footer'

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
      <div className="page">
        <main>
          <h1>Todo-list</h1>
          {error && <p className="error">{error}</p>}

          <AddTodo updatedTodo={fetchTodos} />

          <section>
            {loading && <p style={{ textAlign: "center", fontStyle: "italic" }}>Data laddas in...</p>}
            {todos.map((todo) =>
              <Todo todo={todo} key={todo.id} updatedTodo={fetchTodos} />
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
