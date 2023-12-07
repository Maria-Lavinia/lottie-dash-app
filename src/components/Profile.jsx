import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAnimations } from "../redux/animations/AnimationSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import { getOneUser } from "../redux/users/UserSlice";
import { updateUser } from "../redux/users/UserSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const animations = useSelector((state) => state.animations.animations);
  const user = useSelector((state) => state.user.user);
  // const [userId, setUserid] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdStored = await localStorage.getItem("userId");
        dispatch(getOneUser());
        dispatch(getUserAnimations(userIdStored));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update the state when user data changes
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
  }, [user]);

  const handleUpdate = async (e) => {
    let userUpdates = {
      firstName: firstName,
      lastName: lastName,
    };

    try {
      dispatch(updateUser(userUpdates));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <>
      <div data-comp="profile">
        <div>
          <section>
            <h1
              className="headingProfile"
              style={{ marginBottom: 1 + "em", marginTop: 2 + "em" }}
            >
              Hi, {user?.firstName}! ({user?.role}) 🫶🏻
            </h1>
            <p
              style={{
                color: "black",
                marginBottom: 1 + "em",
                fontSize: 0.8 + "em",
              }}
            >
              <i>Click on the field you would like to update</i>
            </p>

            <form className="update" onSubmit={handleUpdate}>
              <label htmlFor="firstName">
                First name:
                <input
                  data-color="text-black"
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  defaultValue={user?.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label htmlFor="lastName">
                Last name:
                <input
                  data-color="text-black"
                  type="text"
                  id="lastName"
                  defaultValue={user?.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              {/* {error && <p className="error">{error}</p>} */}
              <button data-comp="button" type="submit">
                Update info{" "}
              </button>
            </form>
          </section>
        </div>

        <div>
          {Array.isArray(animations) && animations.length > 0 ? (
            <>
              <h2>A couple of my Lotties</h2>
              <div className="player-container-profile">
                {/* By adding Array.isArray(animations) before the map function, you ensure that you only attempt to map over animations if it's an array.  */}
                {Array.isArray(animations) &&
                  animations.slice(0, 4).map((animation) => (
                    <div key={animation.id}>
                      <div data-comp="lottie">
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
                          ></Player>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="noLottieContainer">
              <h1>Sorry...</h1>
              <p>No animations to show. Uplaod a Lottie yourself!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
