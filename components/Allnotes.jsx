import React, { useEffect,useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom';

const Allnotes = () => {
    const context = useContext(noteContext)
    const {Notes,getNote,deleteNote,showalert} = context
    let navigate = useNavigate()
    
    useEffect(() => {
      if(localStorage.getItem('token')){

        getNote()
      }else{
        navigate("/login", { replace: true });
      }
      // eslint-disable-next-line
    }, [])

    const [noteid, setnoteid] = useState(Notes[0] || {
      "user": "NULL",
      "title": "Please Select A Note to view it.",
      "description": "",
      "tag": "PageDefault",
      "_id": "61a74175c0c8895dd689c8a7",
      "date": "2003-1-01T15:44:50.593Z",
      "__v": 0
    })

    return (
        <>
<div>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap ">
   
    <div className="flex flex-wrap w-full">
 <div className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-5 mt-6 " >
      <Noteitem  noteid={noteid} setnoteid={setnoteid} />
      </div>
      <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
        {Notes.length===0 && "No notes to display"}
            {
    Notes.map((note,index)=>{
        let d = new Date(note.date);
        let dlen = note.description.length;
    return (
      
        <div className="flex relative pb-12 md:ml-3 " key={note._id}>
          <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-9">
     
            <i className="fas fa-book" ></i>
          </div>
          <div className=" ml-2 flex-grow pl-4 bg-gray-200 p-3 rounded dark:bg-gray-800">
            <h2 className="font-medium title-font text-lg font-bold text-gray-900 mb-1 tracking-wider dark:text-white">{note.title} <span className="text-gray-500 pl-2 text-sm font-mono">{d.toLocaleDateString()} </span> <span className="text-gray-500 pl-2 text-sm font-mono float-right"> <i className="fas fa-trash" onClick={()=>{deleteNote(note._id); showalert('Success','Note Deleted')} }></i></span></h2>
          
          
            <p className="leading-relaxed dark:text-gray-300">{ dlen > 25 ? note.description.slice(0,45)+'...' : note.description}</p>
            <button className="text-indigo-500 dark:text-indigo-400 inline-flex items-center mt-1" onClick={()=>setnoteid(note)}>Read More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
          </div>
        </div>
    ) 
})}
  </div>
      
    </div>
  </div>
</section>
      </div>
        </>
    )
}

export default Allnotes
