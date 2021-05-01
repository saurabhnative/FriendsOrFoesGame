/**
 * Audio component to play sound in background
 */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import "./AudioComponent.css";
export default function AudioComponent() {
  const [audioPlayback, setAudioPlayback] = useState(false);
  const [audioElement, setAudioElement] = useState([]);
  function toggleAudio() {
    // push audio tag when audio is to be played
    if (!audioPlayback) {
      const audioElement = [];
      audioElement.push(
        <>
          <audio
            src="https://res.cloudinary.com/dk22rcdch/video/upload/v1619806254/FriendsOrFoes/trimmedintro_s6baaj.mov"
            preload="none"
            loop="true"
            autoPlay="true"
          />
        </>
      );
      setAudioElement(audioElement);
    } else {
      setAudioElement([]);
    }
    setAudioPlayback(!audioPlayback);
  }
  return (
    <div className="audio-component-container mt-3 absolute mx-2 float-right">
      {audioElement}
      <div className="audio-component-icon" onClick={() => toggleAudio()}>
        {audioPlayback ? (
          <FontAwesomeIcon icon={faVolumeMute} />
        ) : (
          <FontAwesomeIcon icon={faVolumeUp} />
        )}
      </div>
    </div>
  );
}
