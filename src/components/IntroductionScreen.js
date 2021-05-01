/**
 * Main introduction screen shown to the user
 */
import React from "react";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import "./IntroductionScreen.css";
export default function IntroductionScreen() {
  const history = useHistory();
  return (
    <div className="intro-container flex flex-col items-center justify-center">
      <Fade top>
        <div className="intro-logo-container">
          <div className="intro-friends-block logo-block flex items-center justify-center">
            <span className="intro-logo-text">Friends</span>
          </div>
          <div className="intro-or-block">
            <span className="intro-logo-text">OR</span>
          </div>
          <div className="intro-foes-block logo-block flex items-center justify-center">
            <span className="intro-logo-text">Foes</span>
          </div>
        </div>

        <div className="intro-instructions md:w-2/3">
          Your objective in this game is to guess whether the two characters
          revealed are friends or foes
        </div>
      </Fade>
      <Fade bottom>
        <div className="intro-start-container flex justify-center w-full">
          <button
            className="intro-start-button w-4/6 md:w-2/6 focus:outline-none"
            onClick={() => history.push("/game")}
          >
            START
          </button>
        </div>
      </Fade>
    </div>
  );
}
