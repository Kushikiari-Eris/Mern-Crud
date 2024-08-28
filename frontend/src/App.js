import { useState, useEffect } from "react";
import axios from "axios";
function App() {

  //States
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  //Use Effect
  useEffect( () =>{
    fetchNotes();
  }, []);
  

  //Functions
  const fetchNotes = async() => {
    //Fetch the notes
    const res = await axios.get("http://localhost:3000/notes");
    //Set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) =>{
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });

  };

  const createNote = async (e) =>{
    e.preventDefault();
    //Create Note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    //Update State
    setNotes([...notes, res.data.note ]);

    //Clear Form State
    setCreateForm({title: "", body: ""});
  };

  const deleteNote = async (_id) => {
    //Delete the note
    await axios.delete(`http://localhost:3000/notes/${_id}`);
    
    //Update State
    const newNote = [...notes].filter((note) =>{
      return note._id !== _id;
    });

    setNotes(newNote);
  }

  const handleUpdateFieldChange = (e) =>{
    const {value, name} = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) =>{
    //set state on update form
    setUpdateForm({title: note.title, body: note.body, _id: note._id});
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const {title, body} = updateForm;
    //Send the update request
    const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {title, body});

    //Update State
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) =>{
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    //Clear update Form
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };

  return(<div className="App">
    <div>
      <h2>Notes:</h2>
      {notes &&
        notes.map((note) => {
          return(
            <div key={note._id}>
              <h3>{note.title}</h3>
              <button onClick={() => deleteNote(note._id)}>Delete Note</button>
              <button onClick={() => toggleUpdate(note)}>Update Note</button>
            </div>
          );
        })}
    </div>

    {updateForm._id && (
      <div>
      <h2>Update Note</h2>
      <form onSubmit={updateNote}>
        <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title"/>
        <input onChange={handleUpdateFieldChange} value={updateForm.body} name="body"/>
        <button type="submit">Update Note</button>
      </form>
    </div>
    )}

    {!updateForm._id && (
      <div>
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
        <input onChange={updateCreateFormField} value={createForm.body} name="body"/>
        <button type="submit">Create Note</button>
      </form>
    </div>
    )}

  </div>);
  
}

export default App;
