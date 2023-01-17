/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import styles from "./ControlVideo.module.scss";
import { useElementOnScreen } from "../../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

const ControlVideo = ({ refVideo, index }) => {
  const [playing, setPlaying] = useState(false);

  const handlePlayVideo = () => {
    refVideo.current.play();
    setPlaying(false);
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, refVideo);

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        refVideo.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        refVideo.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  return (
    <div className={cx("wrapper")}>
      {playing && (
        <span
          onClick={() => {
            handlePlayVideo();
          }}
          className={cx("play")}
        >
          <FontAwesomeIcon icon={faPlay} />
        </span>
      )}

      {!playing && (
        <span
          onClick={() => {
            refVideo.current.pause();
            setPlaying(true);
          }}
          className={cx("pause")}
        >
          <FontAwesomeIcon icon={faPause} />
        </span>
      )}

      <div className={cx("speaker")}>
        <span className={cx("icon")}>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </span>
        <div className={cx("volume")}>
          <input
            onChange={(e) => {
              refVideo.current.volume = e.target.value / 100;
            }}
            type="range"
            min="0"
            max="100"
            step="1"
            orient="vertical"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlVideo;
