import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props)=>{
  const host = process.env.REACT_APP_BACKEND_HOST;
const initialNotes = [];
  const [Notes, setNotes] = useState(initialNotes)
  let userTheme = localStorage.getItem('usertheme')
  const [darkTheme,setdarkTheme] = useState(userTheme || "false"); //Theme toggle state
  const  [alert, setalert] = useState(null);
  const showalert = (type,message)=> {
    setalert({type:type, message:message})
    setTimeout(() => {
      setalert(null);
    }, 5000);
  }

  //GEt all note
  const getNote = async ()=>{
    try {
      
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
     
      headers: {
        'Content-Type': 'application/json',
        'auth-token'  : localStorage.getItem('token')
        
      },
    });
    const json = await response.json()
    json.reverse()
     setNotes(json)
    

    } catch (error) {
      setNotes([ {
        "user": "NULL",
        "title": "NO Notes Available",
        "description": "",
        "tag": "PageDefault",
        "_id": "61a74175c0c8895dd689c8a7",
        "date": "2003-1-01T15:44:50.593Z",
        "__v": 0
      }])
      console.error(error)
      showalert('Failure',"Invalid response recieved")
    }
  
  }


 
  const addNote = async (title,description,tag)=>{
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
     
      headers: {
        'Content-Type': 'application/json',
       'auth-token'  : localStorage.getItem('token')
        
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    
    
    setNotes(Notes.concat(json))
    showalert('Success',"Note Added")
  }

  //Update NOtes
  const editNote = async (id,title,description,tag)=>{
    let newnotes = JSON.parse(JSON.stringify(Notes))
    for (let index = 0; index < newnotes.length; index++) {
          const element = newnotes[index];
          if(element._id=== id){
            newnotes[index].title = title;
            newnotes[index].description = description;
            newnotes[index].tag = tag;
            break;
           
          }
        }
        
        
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
     
      headers: {
        'Content-Type': 'application/json',
       'auth-token'  : localStorage.getItem('token')
        
      },
      body: JSON.stringify({title,description,tag})
    });// eslint-disable-next-line
    const json = await response.json();
    setNotes(newnotes)
     //code for updating note on client side
   
  }
  //Delete
  const deleteNote = async (id)=>{
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
     
      headers: {
        'Content-Type': 'application/json',
       'auth-token'  : localStorage.getItem('token')
        
      },
    });

    let newNotes = Notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

return(
    <NoteContext.Provider value={{alert,showalert,Notes,darkTheme,userTheme,setdarkTheme, addNote, editNote, deleteNote,getNote,host}}>
    {props.children}
    </NoteContext.Provider> 
    ) 
}

export default NoteState