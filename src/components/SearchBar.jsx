import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchAnimations } from "../redux/animations/AnimationSlice";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [searchQuery, setQuery] = useState("");

  // updates the value of the searchQuery whenever the target value changes
  const onQueryChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    dispatch(searchAnimations(searchQuery));
  };

  return (
    <>
      <div data-comp="searchBar">
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={onQueryChange}
        />
        <SearchIcon />
      </div>
    </>
  );
}
