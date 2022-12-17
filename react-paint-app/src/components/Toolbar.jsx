import React from 'react';
import '../styles/toolbar.scss';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";

const Toolbar = () => {

    const handleBrush = () => {
        toolState.setTool(new Brush(canvasState.canvas))
    };

    const handleRect = () => {
        toolState.setTool(new Rect(canvasState.canvas))
    };

    const handleCircle = () => {
        toolState.setTool(new Circle(canvasState.canvas))
    };

    return (
        <div className="toolbar">
            <button className="toolbar__btn toolbar__btn--brush" onClick={handleBrush}/>
            <button className="toolbar__btn toolbar__btn--rect" onClick={handleRect}/>
            <button className="toolbar__btn toolbar__btn--circle" onClick={handleCircle}/>
            <button className="toolbar__btn toolbar__btn--eraser" />
            <button className="toolbar__btn toolbar__btn--line" />
            <input type="color" className="toolbar__color-palette"/>

            <button className="toolbar__btn toolbar__btn--undo" />
            <button className="toolbar__btn toolbar__btn--redo" />
            <button className="toolbar__btn toolbar__btn--save" />
        </div>
    );
}

export default Toolbar;