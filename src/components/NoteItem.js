import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
export const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (

        <div className='col-md-3'>
            <div className="card text-center my-3 mx-3">
                {/* <div className="card-header">
                    Featured
                </div> */}
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => {
                        deleteNote(note._id)
                        props.showAlert("Congrats!! Note Deleted Successfully","success")}}></i>
                    <i className="fa-solid fa-user-pen mx-2" onClick={() => {
                        updateNote(note)
                        // props.showAlert("Congrats!! Note updated Successfully","success")
                    }}></i>
                </div>

                <div className="card-footer text-muted">{new Date(note.date).toUTCString()}

                </div>


            </div>

            {/* {note.title}
            {note.description} */}
        </div>
    )
}
