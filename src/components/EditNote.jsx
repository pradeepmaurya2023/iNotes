import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditNote = () => {
  // extractinng passed id param
  const { id } = useParams();

  // fetching all notes from local Storage
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  // fetching specific note we need to edit
  const [editNote, setEditNote] = useState(() => {
    const note = notes.find((item) => item.id === id.slice(1));
    return note ? { ...note } : null;
  });

  // saving notes to Local Storage
  const saveToLS = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // triggers when notes get changed
  useEffect(() => {
    saveToLS(notes);
  }, [notes]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // setting initial values for input fields
  useEffect(() => {
    if (editNote) {
      setValue("title", editNote.title);
      setValue("content", editNote.content);
    }
  }, [setValue]);

  // using watch to keep track of input field changes in react hook form
  const watchedTitle = watch("title");
  const watchedContent = watch("content");

  // updating value in input fields 
  useEffect(() => {
    setEditNote((prev) => ({ ...prev, title: watchedTitle, content: watchedContent }));
  }, [watchedTitle, watchedContent]);

  const onSubmit = (data) => {
    const { title, content } = data;
    const currentTime = new Date().toLocaleString();
    const updatedNotes = notes.map((note) =>
      note.id === editNote.id ? { ...note, title, content, timeStamp: currentTime } : note
    );
    setNotes(updatedNotes);

    toast.success("Note updated successfully!");

    reset(data);
  };
  if (!editNote) {
    return <div>Note not found!</div>;
  }

  return (
    <>
      <div className="w-full h-full py-5">
        <Link to="/" className="mx-2 underline text-xl text-purple-800">
          ⬅️ back to Notes{" "}
        </Link>
        <div className="m-auto bg-slate-100 w-10/12 tablet:w-1/2 laptop:w-1/3 tablet:h-1/2 items-center flex flex-col gap-5 py-3 rounded-md">
          <h1 className="text-4xl font-bold text-purple-800">Edit Your Notes</h1>
          {isSubmitting && <div>Saving...</div>}
          <form
            className="w-full h-full flex flex-col gap-5 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="w-5/6 h-10 border-2 rounded-md border-purple-900 outline-none px-3"
              placeholder="Title"
              type="text"
              onChange={(e) => setValue("title", e.target.value)}
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
              name="title"
            />
            {errors.title && (
              <div className="text-red-700 text-sm">{errors.title.message}</div>
            )}

            <textarea
              className="w-5/6 h-40 border-2 rounded-md border-purple-900 outline-none px-3"
              placeholder="Content"
              type="text"
              onChange={(e) => setValue("content", e.target.value)}
              {...register("content", {
                required: {
                  value: true,
                  message: "Above field cannot be empty",
                },
              })}
              name="content"
            />
            {errors.content && (
              <div className="text-red-700 text-sm">{errors.content.message}</div>
            )}

            <input
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-md font-bold text-white rounded-md mx-6 hover:scale-110 duration-200"
              type="submit"
              value="Update"
            />
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default EditNote;
