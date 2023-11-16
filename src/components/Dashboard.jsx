import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAnimations } from "../redux/animations/AnimationSlice";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function Dashboard() {
  const dispatch = useDispatch();
  const animations = useSelector((state) => state.animations.animations);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to dispatch the `getAnimations` action to fetch animations from the Redux store when the
component mounts or when the `dispatch` function changes. The `getAnimations` action is dispatched
to fetch the animations and update the Redux store with the fetched data. */
  useEffect(() => {
    dispatch(getAnimations());
  }, [dispatch]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Animations</p>
      <div className="player-container">
        {/* By adding Array.isArray(animations) before the map function, you ensure that you only attempt to map over animations if it's an array.  */}
        {Array.isArray(animations) &&
          animations.map((animation) => (
            <div key={animation.id}>
              <p>{animation.fileName}</p>
              <p>{animation.projectName}</p>

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
          ))}
      </div>
    </>
  );
}
