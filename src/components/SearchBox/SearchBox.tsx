import css from "./SearchBox.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchList } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (searchWord: string) => searchList(searchWord),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleChange = useDebouncedCallback((value: string) => {
    setInputValue(value);
    if (value.trim()) {
      mutate(value.trim());
    }
  }, 500);

  return (
    <input
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
