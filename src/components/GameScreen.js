/**
 * Game screen in which questions are presented to the user
 */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import Fade from "react-reveal/Fade";
import Flash from "react-reveal/Flash";

import "./GameScreen.css";
import gameData from "../datasource/gameData.json";

import CreditsPopUp from "./CreditsPopUp";

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [shouldShowNextButon, updateShouldShowNextButton] = useState(false);
  const [areCreditsShown, setAreCreditsShown] = useState(false);
  const history = useHistory();

  function checkAnswer(userSelectedOption) {
    const currentGameData = gameData.results[currentIndex];
    const isCorrectAnswer = userSelectedOption === currentGameData.answer;
    const answerObject = {
      userSelectedOption,
      correctAnswer: currentGameData.answer,
      isCorrectAnswer,
    };
    setUserAnswers([...userAnswers, answerObject]);
    if (isCorrectAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    updateShouldShowNextButton(true);
  }
  function isGameCompleted() {
    return (
      currentIndex === gameData.results.length - 1 && userAnswers[currentIndex]
    );
  }
  function renderCharacters() {
    const currentGameData = gameData.results[currentIndex];
    if (!isGameCompleted()) {
      return (
        <>
          <Fade left spy={currentIndex} appear delay={500}>
            <div className="character left">
              <img
                src={`${currentGameData.character1.imageName}`}
                alt="character 1"
                loading="eager"
              />
            </div>
          </Fade>
          <Fade>
            <div className="flex flex-col">
              <button
                className={classNames(
                  "action-button friends action-text focus:outline-none",
                  {
                    "opacity-60": userAnswers[currentIndex] !== undefined,
                  }
                )}
                onClick={() => checkAnswer("friends")}
                disabled={userAnswers[currentIndex] !== undefined}
              >
                FRIENDS
              </button>
              <div className="or-button action-text">OR</div>
              <button
                className={classNames(
                  "action-button foes action-text focus:outline-none",
                  {
                    "opacity-60": userAnswers[currentIndex] !== undefined,
                  }
                )}
                onClick={() => checkAnswer("foes")}
                disabled={userAnswers[currentIndex] !== undefined}
              >
                FOES
              </button>
            </div>
          </Fade>
          <Fade right spy={currentIndex} appear delay={500}>
            <div className="character right">
              <img
                src={`${currentGameData.character2.imageName}`}
                alt="character 2"
                loading="eager"
              />
            </div>
          </Fade>
        </>
      );
    }
  }
  function renderResult() {
    if (userAnswers[currentIndex] && userAnswers[currentIndex].isCorrectAnswer)
      return (
        <Flash>
          <div className="result-text">
            <span>🥳</span>
            <p>Your answer is correct</p>
          </div>
        </Flash>
      );
    else if (
      userAnswers[currentIndex] &&
      !userAnswers[currentIndex].isCorrectAnswer
    ) {
      return (
        <Flash>
          <div className="result-text">
            <p>😔</p>
            <span>Oh no! Your answer is incorrect</span>
          </div>
        </Flash>
      );
    }
  }
  function renderNextQuestionButton() {
    if (
      shouldShowNextButon &&
      currentIndex !== gameData.results.length - 1 &&
      userAnswers[currentIndex]
    ) {
      return (
        <>
          {renderResult()}
          <Fade bottom delay={800}>
            <button
              className="next-question next-question-text"
              onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
            >
              Next Question
            </button>
          </Fade>
        </>
      );
    } else if (isGameCompleted()) {
      return (
        <div className="final-score-text flex justify-center items-center flex-col">
          <div className="flex justify-center items-center flex-col">
            {score > 1 ? <div>🥳</div> : null}
            Your final score is: {score}/{gameData.results.length}
          </div>
          <div>
            <button
              className="next-question next-question-text"
              onClick={() => history.push("/")}
            >
              Start Again
            </button>
          </div>
          <div>
            <button
              className="next-question next-question-text red"
              onClick={() => setAreCreditsShown(true)}
            >
              View Credits
            </button>
          </div>
        </div>
      );
    }
  }
  function renderTopSection() {
    if (!isGameCompleted()) {
      return (
        <>
          <div className="question-number">
            Question: {currentIndex + 1}/{gameData.results.length}
          </div>
          <div className="score-text my-4 flex justify-center items-center">
            Score: {score}
          </div>
        </>
      );
    }
  }
  function renderCreditsPopUp() {
    if (areCreditsShown) {
      return <CreditsPopUp setAreCreditsShown={setAreCreditsShown} />;
    }
  }
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {renderTopSection()}
      <div className="flex items-center justify-center characters-container">
        {renderCharacters()}
      </div>
      <div className="lower-portion mt-6 flex items-center justify-center flex-col">
        {renderNextQuestionButton()}
      </div>
      <div>{renderCreditsPopUp()}</div>
    </div>
  );
}
