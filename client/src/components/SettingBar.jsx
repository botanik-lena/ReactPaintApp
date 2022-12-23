import React from 'react';
import '../styles/toolbar.scss';
import toolState from "../store/toolState";

const SettingBar = () => {

    const handleChangeLineWidth = (e) => {
        toolState.setLineWidth(e.target.value);
    };

    const handleChangeStrokeColor = (e) => {
        toolState.setStrokeColor(e.target.value);
    };

    return (
        <div className="setting-bar">
            <label htmlFor="line-width">Толщина линии</label>
            <input id="line-width"
                   type="number"
                   defaultValue={1}
                   min={1}
                   max={50}
                   onChange={handleChangeLineWidth}
            />
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input id="stroke-color"
                   type="color"
                   onChange={handleChangeStrokeColor}
            />
        </div>
    );
}

export default SettingBar;