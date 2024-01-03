"use client";

import React, { useState, FormEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_NOTES } from "@/graphql/queries";
import Note from "./Note";
import { Button, Divider } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { ADD_NOTE } from "@/graphql/mutation";

const Notes = () => {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data, loading, error } = useQuery(GET_NOTES);
  const [addNote] = useMutation(ADD_NOTE, {
    variables: { title, body },
    refetchQueries: [{ query: GET_NOTES }],
  });

  const notes: INote[] = data?.notes;

  if (loading)
    return (
      <p className="text-white w-screen h-screen flex items-center justify-center text-5xl">
        Loading ....
      </p>
    );
//tess
  if (error)
    return (
      <p className="text-white w-screen h-screen flex items-center justify-center text-5xl">
        Oops! Something went wrong ....
      </p>
    );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !body)
      return toast({
        title: "Title or Description is empty.",
        description: "Fill all fields to add note.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    addNote({ variables: { title, body } });
    setTitle("");
    setBody("");
    return toast({
      title: "Note added successfully..",
      description: `Title : ${title} Description : ${body}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className="pt-10 md:mx-24 px-2 ">
      <Button colorScheme="red">Delete All</Button>
      <h1 className="text-6xl text-white font-extrabold text-center">
        Noteify
      </h1>
      <Divider className="my-5" />
      <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
          className="bg-transparent border text-white p-2 rounded-lg placeholder:font-bold md:w-56 w-20 "
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Enter Description"
          className="bg-transparent border text-white p-2 rounded-lg placeholder:font-bold w-full "
        />
        <button className="bg-green-600 p-2 px-8 text-white rounded-lg font-extrabold ">
          Add Note
        </button>
      </form>
      {notes?.length === 0 ? (
        <div className="text-white text-6xl grid place-items-center mt-48">
          No notes
        </div>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-2 w-full h-full">
          {notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Notes;
