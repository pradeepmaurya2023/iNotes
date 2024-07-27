import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const ListNotes = () => {
  // Fetching all notes stored in Local Storage
  const [notes, setNotes] = useState(() => {
    // Initialize notes state with data from localStorage or with an empty array if there is no data
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  // to update local storage notes evertime we delete any note
  useEffect(() => {
    saveToLS();
    // console.log("from UseEffect");
  }, [notes]);

  // to add search functionality which will render only searched notes
  const [renderSearch, setRenderSearch] = useState(notes);

  // search input state
  const [search, setSearch] = useState("");

  // searching handler
  const searchHandler = (e) => {
    let search = e.target.value;
    setSearch(search);

    const newNotes = notes.filter((item) => {
      // converting title and content to lowercae to ignore case sensitive while searching
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase())
      );
    });
    setRenderSearch(newNotes);
  };

  // state to store page numbers
  const [pages, setPages] = useState(1);

  // selecting pages
  const selectPageHandler = (selectedPage) => {
    setPages(selectedPage);
  };

  // move to previous page
  const handlePreviousPage = () => {
    setPages(pages - 1);
  };
  // move to next page
  const handlerNextPage = () => {
    setPages(pages + 1);
  };

  // saving data to localStorage
  const saveToLS = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // handler to delete tast
  const handlerDelete = (id) => {
    let newNotes = notes.filter((item) => {
      return item.id !== id;
    });
    toast.error("Your note has been deleted successfully");
    setNotes(newNotes);
    setRenderSearch(newNotes);
  };

  return (
    <>
      {/* to display notification of deleting note  */}
      <ToastContainer />
      <div className="w-full py-5">
        <div className="m-auto bg-slate-100 w-11/12  laptop:w-1/2 flex flex-col items-center p-10 gap-5 rounded-md ">
          <div className="w-full  flex flex-col gap-4 tablet:flex-row justify-between">
            <h1 className="text-4xl  font-serif font-bold text-purple-800">
              Your Notes
            </h1>
            <input
              onChange={searchHandler}
              className="border-2 border-purple-800 outline-none rounded-md w-10/12 h-10 tablet:w-4/12 px-2"
              type="text"
              placeholder="Search"
              value={search}
            />
          </div>
          {/* if there is no notes to render */}
          {renderSearch.length == 0 && (
            <div className="">You don't have any notes yet!!!</div>
          )}
          {/* rendering all notes */}
          <div className="notes flex flex-col gap-4 w-full  box-border overflow-hidden">
            {renderSearch.slice(pages * 10 - 10, pages * 10).map((item) => {
              return (
                // Note component
                <div
                  key={item.id}
                  className="bg-gray-200 p-4 border-2  border-purple-800 rounded-md"
                >
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <div className="w-full   flex flex-col tablet:flex-row gap-5">
                    <p className=" tablet:w-4/5 overflow-auto break-words gap-2">
                      {item.content}
                    </p>
                    {/* buttons :- edit and delete */}
                    <div className="tablet:w-1/5 flex justify-center items-center gap-5 ">
                      <Link to={`/editNote/:${item.id}`}>
                        <button className="bg-violet-800 hover:text-black  hover:bg-violet-200 ease-in transition-all p-2 py-1 text-md font-bold text-white rounded-md mx-1">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handlerDelete(item.id)}
                        className="bg-violet-800 hover:text-red-700 hover:bg-violet-200 ease-in transition-all p-2 py-1 text-md font-bold text-white rounded-md mx-1"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-purple-800 float-end m-2">
                    {item.timeStamp}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Pagination of notes */}
          <div>
            {renderSearch.length > 0 && (
              <div>
                {pages > 1 && (
                  <span
                    onClick={() => handlePreviousPage()}
                    className="text-2xl  mx-1  cursor-pointer"
                  >
                    ⬅️
                  </span>
                )}
                {/* Math.ceil so if after dividing result is in DECIMAL still it can create pages number */}
                {[...Array(Math.ceil(renderSearch.length / 10))].map((_, i) => {
                  return (
                    <span
                      onClick={() => selectPageHandler(i + 1)}
                      key={i}
                      className={
                        pages == i + 1
                          ? "text-xl font-bold bg-gray-300 border-2 border-gray-400 rounded-md mx-1 px-2 cursor-pointer"
                          : "text-xl border-2 border-gray-400 rounded-md mx-1 px-2 cursor-pointer"
                      }
                    >
                      {i + 1}
                    </span>
                  );
                })}
                {pages < Math.ceil(notes.length / 10) && (
                  <span
                    onClick={() => handlerNextPage()}
                    className="text-2xl  mx-1  cursor-pointer"
                  >
                    ➡️
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListNotes;
