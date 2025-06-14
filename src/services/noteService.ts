import axios from "axios";

import { type Note } from "../types/note";
import type { InitialValuesProps } from "../types/note";

interface ResProps {
  notes: Note[];
  totalPages: number;
}

export default async function getList(page: number, debouncedInput: string) {
  const params: Record<string, string | number> = { page };
  if (debouncedInput) {
    params.search = debouncedInput;
  }

  const res = await axios.get<ResProps>(
    "https://notehub-public.goit.study/api/notes",
    {
      params,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res.data;
}
async function postList(newList: InitialValuesProps) {
  const res = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    newList,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res;
}

async function deleteList(listId: number) {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${listId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res;
}

export { postList, deleteList };

// https://notehub-public.goit.study/api/notes?search=${inputText}
