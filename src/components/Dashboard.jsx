import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAnimation,
  getAnimations,
} from "../redux/animations/AnimationSlice";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const dispatch = useDispatch();
  const animations = useSelector((state) => state.animations.animations);
  const role = localStorage.getItem("role");

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to dispatch the `getAnimations` action to fetch animations from the Redux store when the
component mounts or when the `dispatch` function changes. The `getAnimations` action is dispatched
to fetch the animations and update the Redux store with the fetched data. */
  useEffect(() => {
    dispatch(getAnimations());
  }, [dispatch]);

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
  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Frankly's Lottie Animations</p>
        <div className="player-container">
          {/* By adding Array.isArray(animations) before the map function, you ensure that you only attempt to map over animations if it's an array.  */}
          {Array.isArray(animations) &&
            animations.map((animation) => (
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

                <div className="lottieCard">
                  <div className="container">
                    <p style={{ color: "black" }}>
                      <strong>{animation.fileName}</strong>
                    </p>
                    <p style={{ color: "black" }}>
                      {" "}
                      - {animation.projectName} -{" "}
                    </p>

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
