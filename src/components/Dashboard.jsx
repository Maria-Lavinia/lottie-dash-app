import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAnimations } from "../redux/animations/AnimationSlice";
import { Player } from "@lottiefiles/react-lottie-player";

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
        {animations &&
          animations.map((animation) => (
            <div key={animation.id}>
              <p>{animation.fileName}</p>
              <p>{animation.projectName}</p>

              <Player
                autoplay
                loop
                src={animation.jsonData}
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          ))}
      </div>
    </>
  );
}
