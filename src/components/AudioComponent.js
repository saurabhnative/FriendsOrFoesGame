import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import "./AudioComponent.css";
export default function AudioComponent() {
  const [audioPlayback, setAudioPlayback] = useState(false);
  const audioRef = useRef(null);
  function toggleAudio() {
    if (!audioPlayback) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setAudioPlayback(!audioPlayback);
  }
  return (
    <div className="audio-component-container mt-3 absolute mx-2 float-right">
      <audio src="/audio/Intro.mp3" ref={audioRef} />
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