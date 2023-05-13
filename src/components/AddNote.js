import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useState } from 'react';
export const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })
    const handleClick = (e) => {
        e.preventDefault();

        addNote(note.title, note.description, note.tag);
        props.showAlert("Congrats!! Note Added Successfully","success")
    
    }
    const onChange = (e) => {
        // setNote({...note, [e.target.name]: e.target.value})

        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <div><div className='container my-4'>
            <h3 className="fw-bold" style={{ color: "#565656" }}>ADD YOUR NOTE</h3>
            <form className='container my-4'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"
                        name="title"

                        aria-describedby="emailHelp" onChange={onChange} />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text"
                        name="description" className="form-control" id="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button disabled={note.title < 5 || note.description < 5} type="submit" className="btn btn-success" onClick={handleClick} >ADD NOTE</button>
            </form>
        </div></div>
    )
}
