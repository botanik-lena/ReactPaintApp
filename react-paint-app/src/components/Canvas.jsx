import React, {useEffect, useRef} from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef();

    const handleMouseDown = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
    };

    useEffect(()=> {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current));
    }, []);
    return (
        <div className="canvas">
            <canvas width={600}
                    height={400}
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
            />
        </div>
    );
});

export default Canvas;