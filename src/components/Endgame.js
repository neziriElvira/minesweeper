import React, { useState, useEffect } from "react";

export default function Endgame({ restartGame, result }) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);
    return (
        <div
            style={{
                opacity: render ? 1 : 0,
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                background: "rgba(0,0,0,0.5)",
            }}
        >
            <div className="modal">
                <div className="glow-on-hover div" onClick={() => restartGame()}>
                    {result}
                </div>
            </div>
        </div>
    );
}
