import React from 'react'
import { useContext , useState} from 'react'
import noteContext from '../context/notes/noteContext'
// import Allnotes from './Allnotes'

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote,showalert} = context
    let d = new Date();
    const [page, setpage] = useState({title : '', description: '', tag: '',date: d.toDateString()})

    const handleSave = (e)=>{
        
        e.preventDefault();
        showalert('Success','Note Added');
        addNote(page.title,page.description,page.tag); 
        let clearedpage = {title : "" ,description: '', tag: '',date: '' } 
        setpage(clearedpage);
        
        
    }

    const handleOnchange = (e)=>{
        setpage({...page , [e.target.name] : e.target.value})
        
    }
    
    
    return (
        <div className="container flex flex-wrap  rounded">
            
            

<div className="flex justify-center items-center md:h-screen pt-7 pb-7  w-screen mt-3 rounded bg-gradient-to-r from-pink-300 via-purple-600  to-blue-700 dark:from-green-200  dark:to-blue-500 ">
    <div className="sm:w-3/4 w-full bg-white  dark:bg-gray-900 rounded shadow-2xl p-8 m-4">
        <h1 className=" w-full text-center dark:text-white text-gray-800 text-2xl font-bold mb-6">Add New Page</h1>
        <form action="/"  autoComplete="off"> <label className=" dark:text-white mb-2  font-sans italic text-center text-lg text-gray-900 "  > {d.toDateString()} </label>
        <div className="flex felx-row   justify-center md:justify-around">
           
            <div className="flex flex-col mb-4 sm:mb-2 mr-1 items-center">
                <label className="mb-2 dark:text-gray-400 font-mono text-center text-lg text-gray-900 "  >Title</label>
                <input className=" bg-gray-200 dark:bg-gray-800 dark:text-gray-400  w-full py-2 px-3 text-gray-800 shadow-inner" type="text" id="title" value={page.title} required minLength={3} name="title" onChange={handleOnchange}/>
            </div>
            <div className="flex flex-col mb-4 sm:mb-2 items-center">
                <label className="mb-2 dark:text-gray-400  font-mono text-center text-lg text-gray-900  "  >Tag</label>
                <input className=" bg-gray-200 dark:bg-gray-800 dark:text-gray-400 w-full py-2 px-3 text-gray-800 shadow-inner" type="text" id="tag" name="tag" value={page.tag} onChange={handleOnchange}/>
            </div>
        </div>
            <div className="flex flex-col mb-4 ">
            <label className="mb-2 dark:text-gray-400  font- text-center text-lg text-gray-900  "  >What's On Your mind?</label>
               <textarea  id="description" cols="30" rows="5" className="form-control mt-2  py-2  border  text-grey-800 dark:text-gray-200 bg-gray-100 dark:text-white dark:bg-gray-900 resize-none outline-none" type="text" name="description" required minLength={5} value={page.description} onChange={handleOnchange}></textarea>
            </div>
           
            <button className="block bg-gray-200 hover:bg-gray-100  dark:text-white text-lg mx-auto p-4 rounded  dark:bg-gray-800 dark:hover:bg-gray-700 "  type="submit" onClick={handleSave} disabled={page.title.length<3 || page.description.length<5}>Add Page <i className="fas fa-pen"></i></button>

        </form>
        
    </div>
</div>



        </div>
    )
}

export default AddNote
