import { FC, HTMLAttributes } from "react";

interface SearchProps extends HTMLAttributes<HTMLElement> {
  text: string;
  onSearch: (text: string) => void;
}

const Search: FC<SearchProps> = ({ text, onSearch }) => {
  return (
    <form>
      <input value={text}></input>
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          onSearch(text);
        }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
