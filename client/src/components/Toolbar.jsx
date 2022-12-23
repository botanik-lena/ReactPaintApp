import React from 'react';
import '../styles/toolbar.scss';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Toolbar = () => {

    const handleChangeColor = (e) => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    };

    const handleDownload = () => {
        // Получение текущего изображения с canvas
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = canvasState.sessionId + ".jpeg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="toolbar">
            <button className="toolbar__btn toolbar__btn--brush" onClick={handleBrush}/>
            <button className="toolbar__btn toolbar__btn--rect" onClick={handleRect}/>
            <button className="toolbar__btn toolbar__btn--circle" onClick={handleCircle}/>
            <button className="toolbar__btn toolbar__btn--eraser" onClick={handleEraser}/>
            <button className="toolbar__btn toolbar__btn--line" onClick={handleLine}/>

            <input type="color"
                   className="toolbar__color-palette"
                   onChange={handleChangeColor}
            />

            <button className="toolbar__btn toolbar__btn--undo" onClick={handleUndoClick}/>
            <button className="toolbar__btn toolbar__btn--redo" onClick={handleRedoClick}/>
            <button className="toolbar__btn toolbar__btn--save" onClick={handleDownload}/>
        </div>
    );
}

const handleBrush = () => {
    toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId));
};

const handleRect = () => {
    toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId));
};

const handleCircle = () => {
    toolState.setTool(new Circle(canvasState.canvas));
};

const handleEraser = () => {
    toolState.setTool(new Eraser(canvasState.canvas));
};

const handleLine = () => {
    toolState.setTool(new Line(canvasState.canvas));
};

const handleUndoClick = () => {
    canvasState.undo();
};

const handleRedoClick = () => {
    canvasState.redo();
};

export default Toolbar;