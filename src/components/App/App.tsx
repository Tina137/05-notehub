import { useState } from "react";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import getList from "../../services/noteService";

// Components
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setisModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", page],
    queryFn: async () => await getList(page),
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
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          {data && (
            <Pagination
              totalPages={data.data.totalPages}
              page={page}
              setPage={onPageChange}
            />
          )}
          <button onClick={modalOpen} className={css.button}>
            Create note +
          </button>
        </header>
        {data && <NoteList notesArr={data?.data.notes} />}
        {isModalOpen && <NoteModal onClose={modalClose} />}
      </div>
    </>
  );
}

export default App;
