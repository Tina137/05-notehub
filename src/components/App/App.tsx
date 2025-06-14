import { useState } from "react";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import getList from "../../services/noteService";
import { useDebounce } from "use-debounce";

// Components
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput] = useDebounce(inputValue, 500);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedInput],
    queryFn: async () => await getList(page, debouncedInput),
    placeholderData: keepPreviousData,
  });
  const onPageChange = (selected: number) => {
    setPage(selected + 1);
  };
  const modalOpen = () => {
    setisModalOpen(true);
  };
  const modalClose = () => {
    setisModalOpen(false);
  };
  const changeInput = (e: string) => {
    setPage(1);
    setInputValue(e);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox inputValue={inputValue} changeInput={changeInput} />
          {data && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              setPage={onPageChange}
            />
          )}
          <button onClick={modalOpen} className={css.button}>
            Create note +
          </button>
        </header>
        {data && <NoteList notesArr={data?.notes} />}
        {isModalOpen && <NoteModal onClose={modalClose} />}
      </div>
    </>
  );
}

export default App;
