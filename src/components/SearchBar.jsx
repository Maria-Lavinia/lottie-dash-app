import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchAnimations } from "../redux/animations/AnimationSlice";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [searchQuery, setQuery] = useState("");

  const onQueryChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    dispatch(searchAnimations(searchQuery));
  };

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          className="searchBarInput"
          value={searchQuery}
          onChange={onQueryChange}
        />
        <SearchIcon />
      </div>
    </>
  );
}
