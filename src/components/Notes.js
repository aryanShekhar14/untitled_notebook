import React, { useContext, useRef } from 'react'
import noteContext from "../context/notes/noteContext"
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate=useNavigate();
 
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        // eslint-disable-next-line
        if(localStorage.getItem("token")){
            getNotes();
        }
        else{
            navigate("/login")
        }
        

    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        window.scrollTo(0, 0)
        // props.showAlert("Congrats!! Note updated Successfully","success")
    }


    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const handleClick = (e) => {

        console.log("updateing Note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        // addNote(note.title, note.description, note.tag);
        props.showAlert("Congrats!! Note Updated Successfully","success")
    }
    const onChange = (e) => {
        // setNote({...note, [e.target.name]: e.target.value})

        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit My Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container my-4'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle"
                                        name="etitle"

                                        aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text"
                                        name="edescription" className="form-control" id="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick} style={{ backgroundColor: "#2daaba" }}>ADD NOTE</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} style={{backgroundColor: "#565656"}}>Close</button>
                            <button disabled={note.etitle<5 || note.edescription<5}  type="button" className="btn btn-success" onClick={handleClick}>Update!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container row my-4'>
                <h3 className="fw-bold" style={{ color: "#565656" }}>Your Notes</h3>
                <div className='container'>
                {notes.length===0 && "Nothing to Display :)"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}
