import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote,showalert } = context;
  const { noteid, setnoteid } = props;
  let d = new Date(noteid.date);

  const [editvalue, seteditvalue] = useState({
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const handleSave = (e) => {
    e.preventDefault();
    editNote(
      noteid._id,
      editvalue.etitle,
      editvalue.edescription,
      editvalue.etag
    );
    document.getElementById("modal").classList.toggle("hidden");
    setnoteid({
      ...noteid,
      title: editvalue.etitle,
      description: editvalue.edescription,
      tag: editvalue.etag,
    });
    showalert('Success','Note was saved')
  };
  const updateNote2 = () => {
    seteditvalue({
      etitle: noteid.title,
      edescription: noteid.description,
      etag: noteid.tag,
    });
  };

  const handleOnchange = (e) => {
    seteditvalue({ ...editvalue, [e.target.name]: e.target.value });
  };
   
  const handledelete =()=>{
     deleteNote(noteid._id);
 showalert('Success','Note Deleted')
  setnoteid({...noteid,
 title: 'Please Select Another Note',
  description: '',})
  }
  
  
  return (
    <div>
      <section className="text-gray-600 body-font  rounded">
        <div id='singlenote' className="container min-w-300 dark:bg-gray-800 bg-gray-200 mx-auto flex my-5 mx-5 py-12 md:flex-row flex-col items-center rounded">
          <div className="lg:flex-grow  lg:p-9 md:pr-4 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
              {noteid.title}
              <br className="hidden lg:inline-block" />
            </h1>
            <div className="italic inline-block text-bold">{d.toDateString()} at {d.getHours()}:{d.getMinutes( )}</div>
            <span className="mb-8  leading-relaxed break-all dark:text-gray-300 p-1">
              {noteid.description}
            </span>
            <div className="flex justify-center">
              <button
                className="inline-flex text-white bg-indigo-500 border-0 p-3 px-5 focus:outline-none hover:bg-indigo-600 rounded text-lg fas fa-trash rounded-full"
                onClick={handledelete}
                disabled={noteid.description.length<2}
              >
                {" "}
              </button>
              <button
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg items-center"
                onClick={() => {
                  document.getElementById("modal").classList.toggle("hidden");
                  updateNote2();
                }} disabled={noteid.description.length<2}
              >
                {" "}
                Edit <i className="fas fa-pen-nib p-1"></i>
              </button>
            </div>
          </div>
         
          {/* this is modal */}

          <div
            className="fixed z-100 overflow-y-auto top-0 w-full left-0 hidden"
            id="modal"
          >
            <form action="/" autoComplete="off">
              <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <label className="w-full">Title</label>
                    <input
                      type="text"
                      name="etitle"
                      minLength={3}
                      required
                      onChange={handleOnchange}
                      className="w-2/4 bg-gray-100  dark:bg-gray-700 rounded  dark:text-white outline-none   p-2 mt-2 mb-3 mx-3"
                      value={editvalue.etitle} />
                    <label className="w-full">TAG </label>
                    <input
                      type="text"
                      name="etag"
                      value={editvalue.etag}
                      onChange={handleOnchange}
                      className="w-1/4 bg-gray-100  dark:bg-gray-700 rounded  dark:text-white outline-none  p-2 mt-2 mb-3"
                    />
                    <label className="w-full text-center block">Edit</label>
                    <textarea
                      name="edescription"
                      type="text"
                      autoFocus
                      minLength={5} required
                      rows="5"
                      onChange={handleOnchange}
                      className=" resize-none w-full dark:bg-gray-700 rounded  dark:text-white outline-none   bg-gray-100 p-2 mt-2 mb-3"
                      value={editvalue.edescription}
                    ></textarea>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-900 px-4 py-3 text-right">
                    <button
                      type="button"
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                      onClick={() =>
                        document
                          .getElementById("modal")
                          .classList.toggle("hidden")
                      }
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                      onClick={handleSave} 
                    >
                      <i
                        className="fas fa-plus"
                        onClick={() => {
                          document
                            .getElementById("modal")
                            .classList.toggle("hidden");
                        }}
                      ></i>{" "}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Noteitem;
