import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhN2U2ODJkMDYwY2I3NjQ0MGI4NDg3In0sImlhdCI6MTY4ODczMDU5NX0.jkXvXnSQQeYvqZ5ea---r2TDN1qu98F2GEpoxFKTz5U"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhN2U2ODJkMDYwY2I3NjQ0MGI4NDg3In0sImlhdCI6MTY4ODczMDU5NX0.jkXvXnSQQeYvqZ5ea---r2TDN1qu98F2GEpoxFKTz5U"
      },
      body: JSON.stringify({ title, description, tag })
    });
    // let note = {
    //   "_id": "64abe211c6fabd1906668drn0f",
    //   "user": "64a7e682d060cb76440b8487",
    //   "title": title,
    //   "description": description,
    //   "tag": "Personal",
    //   "date": "2023-07-10T08:34:33.781Z",
    //   "__v": 0
    // };
    // setNotes(notes.concat(note));
    const json = await response.json();
    console.log(json);
    setNotes(notes.concat(json));
  }
  //Delete A Note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhN2U2ODJkMDYwY2I3NjQ0MGI4NDg3In0sImlhdCI6MTY4ODczMDU5NX0.jkXvXnSQQeYvqZ5ea---r2TDN1qu98F2GEpoxFKTz5U"
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  //Edit a Node
  const editNote = async (id, title, description, tag) => {
    //API CALLL 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhN2U2ODJkMDYwY2I3NjQ0MGI4NDg3In0sImlhdCI6MTY4ODczMDU5NX0.jkXvXnSQQeYvqZ5ea---r2TDN1qu98F2GEpoxFKTz5U"
      },
      body: JSON.stringify({ title, description, tag })
    });
    //Logic to edit
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
}

export default NoteState;
