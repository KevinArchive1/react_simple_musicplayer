import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import {
  Shuffle,
  SkipPrevious,
  PlayArrow,
  Pause,
  SkipNext,
  Repeat,
  FavoriteBorder,
  VolumeUp
} from '@mui/icons-material';
import '../componet_css/PlayerBar.css';

const PlayerBar = () => {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(100);

  return (
    <div className="player-container">
      <div className="player-bar">
        <div className="top-section">

          {/* Left: Album Art + Song Info */}
          <div className="unknown-section">
            <img src="/path/to/album-art.png" alt="Album" className="album-art" />
            <div className="song-info">
              <div className="song-title">Cherry on Top</div>
              <div className="artist-name">BINI</div>
            </div>
          </div>

          {/* Center: Controls + Progress */}
          <div className="controls-container">
            <div className="icon-row">
              <Shuffle />
              <SkipPrevious />
              {isPlaying ? (
                <Pause onClick={() => setIsPlaying(false)} />
              ) : (
                <PlayArrow onClick={() => setIsPlaying(true)} />
              )}
              <SkipNext />
              <Repeat />
              <FavoriteBorder />
            </div>
            <div className="progress-row">
              <span className="time-text">1:40</span>
              <input
                type="range"
                min="0"
                max="175"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="progress-bar"
              />
              <span className="time-text">2:55</span>
            </div>
          </div>

          {/* Right: Volume */}
          <div className="volume-container">
            <VolumeUp />
            <Slider
              className="volume-slider"
              value={volume}
              onChange={(e, newValue) => setVolume(newValue)}
              aria-label="Volume"
              size="small"
              min={0}
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
