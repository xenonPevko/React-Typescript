import React, { useEffect } from "react";
import Graph from "../../modules/Graph/Graph.ts";
import UI2D from "./UI2D/UI2D.tsx";

import './Graph2D.scss';

export type TF = (x: number) => number;

export type TFunction = {
    f: TF;
    color: string;
    lineWidth: number;
}

const Graph2D: React.FC = () => {
    let graph: Graph | null = null;
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    }
    const funcs: TFunction[] = [];
    let canMove: boolean = false;

    const wheel = (event: WheelEvent) => {
        const ZOOM_STEP = 0.2;
        let delta = (event.deltaY > 0) ? -ZOOM_STEP : ZOOM_STEP;
        if (WIN.WIDTH + delta > 0) {
            WIN.WIDTH += delta;
            WIN.HEIGHT += delta;
            WIN.LEFT -= delta / 2;
            WIN.BOTTOM -= delta / 2;
            render();
        }
    };

    const mouseup = () => {
        canMove = false;
    };

    const mouseleave = () => {
        canMove = false;
    };

    const mousedown = () => {
        canMove = true;
    };

    const mousemove = (event: MouseEvent) => {
        if (canMove && graph) {
            WIN.LEFT -= graph.sx(event.movementX);
            WIN.BOTTOM -= graph.sy(event.movementY);
            render();
        }
    };

    const printOXY = () => {
        if (!graph) {
            return;
        }
        //сеточька
        for (let i = 1; i < WIN.WIDTH - WIN.LEFT; i++) {
            graph.line(-i, WIN.BOTTOM, -i, WIN.HEIGHT + WIN.BOTTOM, '#dbaeb5');
        }
        for (let i = 1; i < WIN.LEFT + WIN.WIDTH; i++) {
            graph.line(i, WIN.BOTTOM + WIN.HEIGHT, i, WIN.BOTTOM, '#dbaeb5');
        }
        for (let i = 1; i < WIN.HEIGHT + WIN.BOTTOM; i++) {
            graph.line(WIN.LEFT + WIN.WIDTH, i, WIN.LEFT, i, '#dbaeb5');
        }
        for (let i = 1; i < WIN.HEIGHT - WIN.BOTTOM; i++) {
            graph.line(WIN.LEFT + WIN.WIDTH, -i, WIN.LEFT, -i, '#dbaeb5');
        }

        //ось OX
        graph.line(WIN.LEFT, 0, WIN.LEFT + WIN.WIDTH, 0);
        //ось OY
        graph.line(0, WIN.BOTTOM + WIN.HEIGHT, 0, WIN.BOTTOM);

        //рисочки
        for (let i = 1; i < WIN.LEFT + WIN.WIDTH; i++) {
            graph.line(i, -0.1, i, 0.1)
            graph.text(i - 0.1, -0.7, `${i}`, "#000000", "12px arial")
        }
        for (let i = 1; i > WIN.LEFT; i--) {
            graph.line(i, -0.1, i, 0.1)
            if (i < 0) {
                graph.text(i - 0.2, -0.7, `${i}`, "#000000", "12px arial")
            }
        }
        for (let i = 1; i < WIN.HEIGHT + WIN.BOTTOM; i++) {
            graph.line(-0.1, i, 0.1, i)
            if (i > 0) {
                graph.text(-0.8, i - 0.2, `${i}`, "#000000", "12px arial")
            }
        }
        for (let i = 1; i < WIN.HEIGHT - WIN.BOTTOM; i++) {
            graph.line(-0.1, -i, 0.1, -i)
            if (i > 0) {
                graph.text(-0.9, - i - 0.2, '-' + i, "#000000", "12px arial")
            }
        }

        //стрелочьки
        //стрелка на оси Х
        graph.line(WIN.LEFT + WIN.WIDTH, 0, WIN.LEFT + WIN.WIDTH - 0.2, -0.2)
        graph.line(WIN.LEFT + WIN.WIDTH, 0, WIN.LEFT + WIN.WIDTH - 0.2, 0.2)

        //стрелка на оси У
        graph.line(0, WIN.BOTTOM + WIN.HEIGHT, - 0.2, WIN.BOTTOM + WIN.HEIGHT - 0.2)
        graph.line(0, WIN.HEIGHT + WIN.BOTTOM, 0.2, WIN.BOTTOM + WIN.HEIGHT - 0.2)
    };

    const printFunction = ({ f, color = "#010101", lineWidth = 2 }: TFunction): void => {
        if (graph) {
            const n = 200;
            let x: number = WIN.LEFT;
            let dx: number = WIN.WIDTH / n;
            while (x <= WIN.WIDTH + WIN.LEFT) {
                graph.line(x, f(x), x + dx, f(x + dx), color, lineWidth)
                x += dx;
            };
        }
    };

    //рендер.
    const render = () => {
        if (graph) {
            graph.clear();
            printOXY();
            funcs.forEach(func => {
                if (func) {
                    printFunction(func);
                }
            });
        }
    };

    useEffect(() => {
        graph = new Graph({
            WIN,
            id: 'canvas2D',
            width: 500,
            height: 500,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });
        render();
        
        return () => {
            graph = null;
        }
    }, [graph]);

    return (<div className="g2D_beautyDiv">
        <div>
            <canvas id='canvas2D' width='300' height='300'></canvas>
        </div>
        <UI2D funcs={funcs} reRender={render} />
    </div>);
}

export default Graph2D;