import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// Importing uuid for generating Unique id for notes
import { v4 as uuidv4 } from "uuid";

const AddNotes = () => {
  // Fetching all notes stored in Local Storage
  const [notes, setNotes] = useState(() => {
    // Initialize notes state with data from localStorage or with an empty array if there is no data
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  // saving data to localStorage
  const saveToLS = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // console.log(JSON.parse(localStorage.getItem("todos")))
  };

  //   will be called when notes array gets updated
  useEffect(() => {
    saveToLS();
  }, [notes]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  //   Handling Form submitted data
  const onSubmit = (data) => {
    let { title, content } = data;
    let currentTime = String(new Date());
    currentTime = currentTime.split(" ").slice(0, 5).join(" ");
    let id = uuidv4();

    setNotes([
      ...notes,
      { id: uuidv4(), title: title, content: content, timeStamp: currentTime },
    ]);

    // Show a success notification
    toast.success("Note submitted successfully!");

    reset();
  };

  return (
    <>
      <div className="w-full h-full py-5">
        <Link to="/" className="mx-2 underline text-xl text-purple-800 ">
          ⬅️ back to Notes{" "}
        </Link>
        <div className="m-auto bg-slate-100 w-10/12 tablet:w-1/2 laptop:w-1/3 tablet:h-1/2 items-center flex flex-col gap-5 py-3 rounded-md">
          <h1 className="text-4xl font-bold text-purple-800">Add Your Notes</h1>
          {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit"*/}
          {isSubmitting && <div>Saving...</div>}
          <form
            className="w-full h-full flex flex-col gap-5 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              className=" w-5/6 h-10 border-2 rounded-md border-purple-900 outline-none px-3"
              placeholder="Title"
              type="text"
              {...register("title", {
                required: {
                  value: true,
                  message: "Above field cannot be empty",
                },
                minLength: {
                  value: 5,
                  message: "Minimum length should be 5 letters for Title",
                },
              })}
            />
            {errors.title && (
              <div className="text-red-700 text-sm">{errors.title.message}</div>
            )}

            {/* include validation with required or other standard HTML validation rules */}
            <textarea
              className=" w-5/6 h-40 border-2 rounded-md border-purple-900 outline-none px-3"
              placeholder="Content"
              type="text"
              {...register("content", {
                required: {
                  value: true,
                  message: "Above field cannot be empty",
                },
              })}
            />
            {errors.content && (
              <div className="text-red-700 text-sm">
                {errors.content.message}
              </div>
            )}

            <input
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-md font-bold text-white rounded-md mx-6 hover:scale-110 duration-200"
              type="submit"
            />
          </form>

          {/* to show notification when note is added to Local Storage */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AddNotes;
