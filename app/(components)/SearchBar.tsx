import { ChangeEvent, FC } from "react";

interface ISearchBar {
  searchTerm: (query: string) => void;
}

const SearchBar: FC<ISearchBar> = ({ searchTerm }) => {
  const handleSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    searchTerm(event.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearchTerm}
      className="w-full max-w-md px-4 py-2 bg-white border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
    />
  );
};
export default SearchBar;
