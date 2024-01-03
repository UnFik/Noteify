"use client";
import { UPDATE_NOTE } from "@/graphql/mutation";
import { GET_NOTE } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { parseDate } from "@/libs/util";

type Props = {
  params: {
    id: string;
  };
};

const Note = ({ params: { id } }: Props) => {
  const toast = useToast()
  
  const { data, loading, error } = useQuery(GET_NOTE, {
    variables: { id },
  });
  const note: INote = data?.note;

  const [newTitle, setNewTitle] = useState(note?.title || "");
  const [newBody, setNewBody] = useState(note?.body || "");


  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: { id: id, title: newTitle, body: newBody },
    refetchQueries: [{ query: GET_NOTE, variables: { id } }],
  });


  const handleUpdateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle === "" || newBody === "")
      return toast({
        title: "Title or Description is empty.",
        description: "Fill all fields to update note.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    updateNote({ variables: { id: id, title: newTitle, body: newBody } });
    setNewTitle("");
    setNewBody("");
    return toast({
      title: "Note updated successfully..",
      description: `New Title : ${newTitle} New Description : ${newBody}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  if (loading)
    return (
      <p className="text-white w-screen h-screen flex items-center justify-center text-5xl">
        Loading ....
      </p>
    );

  if (error || !note)
    return (
      <p className="text-white w-screen h-screen flex items-center justify-center text-5xl">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <div className="bg-background w-full h-full text-white">
      <article className="mx-12 flex flex-col justify-between h-full py-10">
        <section className="flex gap-2 ">
          <div className="p-2 flex flex-col gap-5">
            <Link href="/" className="flex gap-5">
              <ArrowBackIcon
                w={35}
                h={35}
                className="mb-5 border-2 border-white rounded-lg hover:bg-white/50 hover:rounded-md active:bg-white/30"
              />
              <div className="text-white text-3xl">Back</div>
            </Link>
            <h1 className="text-4xl ">Title : {note.title} </h1>
            <p className="text-white/60">{parseDate(parseInt(note.createdAt))}</p>
            <div className="flex gap-2"></div>
            <p className="text-slate-400 ">{note.body}</p>
          </div>
        </section>
        {/* update form */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl">Update Note</h1>
          <form onSubmit={handleUpdateNote} className="flex gap-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              placeholder="Enter new title"
              className="bg-transparent border text-white p-2 rounded-lg"
            />
            <input
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              type="text"
              placeholder="new Description"
              className="bg-transparent border text-white p-2 rounded-lg w-full"
            />
            <button className="bg-yellow-500 rounded-lg p-2 font-extrabold">
              Update
            </button>
          </form>
        </div>
      </article>
    </div>
  );
};

export default Note;
