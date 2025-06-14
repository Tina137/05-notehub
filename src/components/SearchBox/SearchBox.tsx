import css from "./SearchBox.module.css";
// import { searchList } from "../../services/noteService";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SearchBoxProps {
  inputValue: string;
  changeInput: (e: string) => void;
}

export default function SearchBox({ inputValue, changeInput }: SearchBoxProps) {
  //   const queryClient = useQueryClient();
  //   const { mutate } = useMutation({
  //     mutationFn: (searchWord: string) => searchList(searchWord),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["notes"] });
  //     },
  //   });

  const handleChange = (e: string) => {
    console.log("sucsses");
    changeInput(e);
  };

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
