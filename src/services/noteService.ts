import axios from "axios";

import type Note from "../types/note";
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
  return res;
}
async function postList(newList: InitialValuesProps) {
  const res = await axios.post<ResProps>(
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

async function deleteList(listId: string) {
  const res = await axios.delete<ResProps>(
    `https://notehub-public.goit.study/api/notes/${listId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res;
}

async function searchList(inputText: string) {
  const res = await axios.get<ResProps>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
        search: inputText,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res.data.notes;
}

export { postList, deleteList, searchList };

// https://notehub-public.goit.study/api/notes?search=${inputText}
