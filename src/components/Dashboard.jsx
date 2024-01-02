import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteAnimation,
  getAnimations,
} from "../redux/animations/AnimationSlice";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBar from "./SearchBar";
// import TocIcon from "@mui/icons-material/Toc";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import QrCodeGenerator from "./QrCodeGenerator";

export default function Dashboard() {
  const dispatch = useDispatch();
  const animations = useSelector((state) => state.animations.animations);
  const role = localStorage.getItem("role");
  const [displayedAnimations, setDisplayedAnimations] = useState([]);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to dispatch the `getAnimations` action to fetch animations from the Redux store when the
component mounts or when the `dispatch` function changes. The `getAnimations` action is dispatched
to fetch the animations and update the Redux store with the fetched data. */
  useEffect(() => {
    dispatch(getAnimations());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedAnimations(animations);
  }, [animations]);

  const handleDownload = (animation) => {
    const blob = new Blob([animation.jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${animation.fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteOneAnimation = async (animation) => {
    try {
      await dispatch(deleteAnimation(animation.id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting animation:", error);
    }
  };
  const filterAnim = () => {
    console.log("filterAnim");
    if (Array.isArray(animations)) {
      /* The line `const reversedArray = [...animations].reverse();` is creating a new array called
  `reversedArray` that is a copy of the `animations` array, but with its elements in reverse order.
  The spread operator (`[...animations]`) is used to create a new array with the same elements as
  `animations`, and the `reverse()` method is then called on this new array to reverse the order of
  its elements. */
      const reversedArray = [...displayedAnimations].reverse();
      setDisplayedAnimations(reversedArray);
      console.log("reversedArray:", reversedArray);
      return reversedArray;
    }
    return animations; // Return the original value if it's not an array
  };

  return (
    <>
      <SwapVertIcon
        style={{
          float: "right",
          padding: 0.1 + "em",
          cursor: "pointer",
          position: "absolute",
          right: 0,
          top: 2 + "rem",
          left: 7 + "rem",
        }}
        className="reorder"
        onClick={filterAnim}
      ></SwapVertIcon>
      <SearchBar />
      <div data-comp="dashboard">
        <h1>Dashboard</h1>
        <p>Frankly's Lottie Animations</p>
        {/* <Filter /> */}
        <div data-comp="lottiePlayer">
          {/* By adding Array.isArray(animations) before the map function, you ensure that you only attempt to map over animations if it's an array.  */}
          {Array.isArray(displayedAnimations) &&
            displayedAnimations.map((animation) => (
              <div key={animation.id}>
                {role === "user" ? (
                  <FileDownloadIcon
                    style={{
                      float: "right",
                      padding: 0.1 + "em",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDownload(animation)}
                  >
                    Download
                  </FileDownloadIcon>
                ) : (
                  <DeleteIcon
                    style={{
                      float: "right",
                      padding: 0.1 + "em",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteOneAnimation(animation)}
                  ></DeleteIcon>
                )}

                <div data-comp="lottie">
                  <div className="container">
                    <p data-color="text-black">
                      <strong>{animation.fileName}</strong>
                    </p>
                    <p data-color="text-black"> - {animation.projectName} - </p>

                    <Player
                      autoplay
                      loop
                      src={animation.jsonData}
                      style={{ height: "300px", width: "300px" }}
                    >
                      <Controls
                        visible={true}
                        darkTheme={false}
                        buttons={["play", "repeat", "frame", "stop"]}
                      />
                    </Player>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
