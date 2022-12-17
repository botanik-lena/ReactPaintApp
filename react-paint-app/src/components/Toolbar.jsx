import React from 'react';
import '../styles/toolbar.scss';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";

const Toolbar = () => {

    const handleBrush = () => {
        toolState.setTool(new Brush(canvasState.canvas))
    };

    const handleRect = () => {
        toolState.setTool(new Rect(canvasState.canvas))
    };

    return (
        <div className="toolbar">
            <button className="toolbar__btn toolbar__btn--brush" onClick={handleBrush}/>
            <button className="toolbar__btn toolbar__btn--rect" onClick={handleRect}/>
            <button className="toolbar__btn toolbar__btn--circle" />
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