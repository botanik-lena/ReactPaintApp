import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null;
    lineWidth = 1;
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setFillColor(color) {
        this.tool.fillColor = color;
        console.log("fill in state ", color);
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color;
        console.log("stroke in state ", color);
    }

    setLineWidth(width) {
        this.tool.lineWidth = width;
    }
}

export default new ToolState();