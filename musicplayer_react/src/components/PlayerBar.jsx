import "../componet_css/PlayerBar.css"
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

const PlayerBar = () => {
  const [volume, setVolume] = useState(50);

  return (
    <div className="Track-bar">
        <div className="Current_track">
            <h1>text</h1>
        </div>
        <div className="Player">
            <div className="p-4">

            <button >▶ Play</button>
            <button >⏸ Pause</button>

            <div className="mt-2">
                <input
                type="range"
                min="0"
                className="w-full"
                />
            </div>
            </div>
        </div>
        <div className="Volume">
            <h1>icon</h1>
            <Slider
            value={volume}
            onChange={(e, newValue) => setVolume(newValue)}
            aria-label="Volume"
            valueLabelDisplay="auto"
            min={0}
            max={100}
            />
        </div>
    </div>
  );
};


export default PlayerBar;