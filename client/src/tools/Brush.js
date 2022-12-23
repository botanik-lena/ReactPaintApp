import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }
//!
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler() {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
                type: 'finish'
                // color: this.ctx.fillStyle,
                // lineWidth: this.ctx.lineWidth
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    color: this.ctx.fillStyle,
                    lineWidth: this.ctx.lineWidth
                }
            }))
        }
    }

    static draw(ctx, x, y, color, lineWidth) {
        console.log("color brush ", color);
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}