import css from "./NoteList.module.css";
import { deleteList } from "../../services/noteService";
import type Note from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteListProps {
  notesArr: Note[];
}

export default function NoteList({ notesArr }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => await deleteList(id),
    onSuccess: () => {
      console.log("Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notesArr.length > 0 &&
        notesArr.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                onClick={() => mutate(String(note.id))}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
