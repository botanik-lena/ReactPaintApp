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

    const handleBrush = () => {
        toolState.setTool(new Brush(canvasState.canvas));
    };

    const handleRect = () => {
        toolState.setTool(new Rect(canvasState.canvas));
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

    const handleChangeColor = (e) => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    };

    const handleUndoClick = () => {
        canvasState.undo();
    };

    const handleRedoClick = () => {
        canvasState.redo();
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
            <button className="toolbar__btn toolbar__btn--save" />
        </div>
    );
}

export default Toolbar;