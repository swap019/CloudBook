import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const Addnote = () => {
    const context=useContext(noteContext);
    const {notes,addNote} =context;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.desc, note.tag);
    }
    const [note,setNote] = useState({title:"",desc:"",tag:"default"});
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="tile" className="form-label">Title</label>
                    <input type="text" className="form-control" id="tile" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="md-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="desc" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
