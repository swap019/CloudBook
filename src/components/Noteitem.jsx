import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
  const { note , updateNote } = props;
  const context =useContext(noteContext);
  const {deleteNote}= context;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex ">
            <div className="p-2">
            <h5 className="card-title">{note.title}</h5>
            </div>
            <div className="ml-auto p-2 justify-content-end align-items-center">
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
