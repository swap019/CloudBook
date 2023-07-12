import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
  const { note } = props;
  const context =useContext(noteContext);
  const {deleteNote}= context;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex align-tems-center">
            <h5 className="card-title">{note.title}</h5>
            <i class="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
