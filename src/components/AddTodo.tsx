import { useState } from "react";

const AddTodo = ({ updatedTodo }: { updatedTodo: () => void }) => {
  //State för titel
  const [title, setTitle] = useState("");
  // State för beskrivning
  const [description, setDescription] = useState("");
  //State för status
  const [selectedStatus, setSelectedStatus] = useState("ej påbörjad");
  //State för att hantera felmeddelanden
  const [error, setError] = useState<string | null>(null);

  //Lägger till en ny todo till listan med hjälp av ett formulär
  const addTodo = async (e: any) => {
    e.preventDefault();
    setError(null);

    //Validering av titel
    if (title.trim().length < 3) {
      setError("Titel måste vara minst 3 tecken.");
      return;
    }

    //Validering av beskrivning
    if (description.length > 200) {
      setError("Beskrivningen får vara max 200 tecken.");
      return;
    }

    //Skapar ett nytt todo-objekt
    const newTodo = {
      title,
      description,
      status: selectedStatus,
    };

    try {
      //Skickar POST-anrop till API 
      const res = await fetch("https://labb2dt210g.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo),
      });

      if (res.ok) {
        //Rensa formulär
        setTitle("");
        setDescription("");
        setSelectedStatus("ej påbörjad");
        //Hämta uppdaterad lista
        updatedTodo();
      } else {
        setError("Ett fel har uppstått, försök igen senare...");
      }
    } catch {
      setError("Ett fel har uppstått, försök igen senare...");
    }
  };

  return (
    <form onSubmit={addTodo}>
      <h3>Lägg till ny Todo</h3>

      <label htmlFor="title">Titel:</label>
      <br />
      <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="description">Beskrivning:</label>
      <br />
      <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label htmlFor="status">Status:</label>
      <br />
      <select name="select" id="value" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="ej påbörjad">EJ PÅBÖRJAD</option>
        <option value="pågående">PÅGÅENDE</option>
        <option value="avklarad">AVKLARAD</option>
      </select>

      <button type="submit">Lägg till</button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default AddTodo;