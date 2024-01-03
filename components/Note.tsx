import { DELETE_NOTE } from "@/graphql/mutation";
import { GET_NOTES } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

type Props = {
  note: INote;
};

const Note = ({ note }: Props) => {
  const toast = useToast();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteNote({ variables: { id: note.id } });
    toast({
      title: "Note Deleted.",
      description: `${note.title} Note was deleted.`,
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  };

  const parseDate = (unix_timestamp: number) => {
    const date = new Date(unix_timestamp);

    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      hour12: true,
    });
  };

  return (
    <Card
      maxW="sm"
      className="hover:shadow-lg hover:bg-slate-300 transition duration-300 ease-out hover:scale-110"
    >
      <CardBody className="bg-[#2b2d31]">
        <Stack mt="4" spacing="3">
          <Heading size="md" className="text-white font-bold">
            {note.title}
          </Heading>
          <Text className="text-ellipsis line-clamp-5 text-white">
            {parseDate(parseInt(note.createdAt))}
          </Text>
          <Text className="text-ellipsis line-clamp-5 text-white">
            {note.body}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter className="bg-[#2b2d31]">
        <div className="flex justify-between w-full">
          <Button variant="solid" colorScheme="red" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
          <Link href={`/note/${note.id}`}>
            <Button variant="solid" colorScheme="yellow">
              <EditIcon />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Note;
