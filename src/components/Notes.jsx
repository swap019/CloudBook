import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import Anime from './Anime';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      window.location.href='/login';
    }
  }, []);

  const ref = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnote />
      {/* modal to edit a node */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                  <div id="emailHelp" className="form-text">Add the title of your note</div>
                </div>
                <div className="md-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea type="text" rows="3" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control " id="tag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary " onClick={handleClick} data-bs-dismiss="modal">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div>
          {
            (notes.length === 0 && <Anime/>)
          }
        </div>

        {
          notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
          })
        }
      </div>
    </>
  )
}

export default Notes
