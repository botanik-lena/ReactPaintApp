import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import axios from "axios";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [isShowModal, setIsShowModal] = useState(true);
    const params = useParams();

    useEffect(()=> {
        canvasState.setCanvas(canvasRef.current);
        const ctx = canvasRef.current.getContext('2d');

        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            });
    }, []);

    useEffect(()=> {
            const socket = new WebSocket('ws://localhost:5000/');
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            toolState.setTool(new Brush(canvasRef.current, socket, params.id));

            socket.onopen = () => {
                console.log("Canvas connect");
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            };
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method) {
                    case "connection":
                        console.log(`Пользователь ${msg.username} подключился`);
                        break;

                    case "draw":
                        drawHandler(msg);
                        break;
                }
            };
    }, [canvasState.username]);

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
                break;

            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                break;

            case "finish":
                ctx.beginPath();
                break;
        }
    };

    const handleMouseDown = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data));
    };

    const handleClickButton = () => {
        connectHandler();
    };

    const connectHandler = () => {
        if (usernameRef.current.value.length > 0) {
            canvasState.setUsername(usernameRef.current.value);
            setIsShowModal(false);
        } else {
            console.error("Введите своё имя");
        }
    };


    return (
        <div className="canvas">
            <Modal show={isShowModal} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Введите Ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClickButton}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas width={600}
                    height={400}
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}/>
        </div>
    );
});

export default Canvas;