import React, { useEffect } from 'react';
import Point from '../../modules/Math3D/entites/Point.ts';
import Graph from '../../modules/Graph/Graph.ts';
import Math3D from '../../modules/Math3D/Math3D.ts';
import { Edge, Light, Polygon, Surface } from '../../modules/Math3D/entites/index.ts';
import { TWIN3D } from '../../modules/Graph/Graph';
import Surfaces from '../../modules/Math3D/surfaces/Surfaces.ts';
import empty from '../../modules/Math3D/surfaces/empty.ts';

import './Graph3D.css';

const Graph3D: React.FC = () => {

    let graph: Graph | null = null;
    let surfaces = Surfaces();
    let surface: Surface = new Surface();
    let LIGHT: Light = new Light(-40, 15, 0, 1500);
    const WIN: TWIN3D = ({
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        CAMERA: new Point(0, 0, -50),
        CENTER: new Point(0, 0, -40)
    });
    let math3D: Math3D = new Math3D({ WIN });


    let points = [new Point()];
    let edges = [new Edge()];
    let polygons = [new Polygon()];
    let options = new Surface(points, edges, polygons)
    let scene: Surface[] = [new empty(options)];

    // флажки
    let canMove: boolean = false;
    let showPoints: boolean = false;
    let showEdges: boolean = false;
    let showPolygons: boolean = true;

    const mouseup = (): void => {
        canMove = false;
    }

    const mousedown = (): void => {
        canMove = true;
    }

    const mouseleave = (): void => {}

    const mousemove = (event): void => {
        const gradus = Math.PI / 180 / 4;
        if (canMove) {
            scene.forEach(surface => surface.points.forEach(point => {
                const T1 = math3D.rotateOy((dx - event.offsetX) * gradus);
                const T2 = math3D.rotateOx((dy - event.offsetY) * gradus);
                const T = math3D.getTransform(T1, T2);
                math3D.transform(T, point)
            }));
        }
        let dx: number = event.offsetX;
        let dy: number = event.offsetY;
    }

    const wheel = (event): void => {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 1.1 : 0.9;
        const matrix = math3D.zoom(delta);
        scene.forEach(surface => surface.points.forEach(point =>
            math3D.transform(matrix, point)));
    }

    useEffect(() => {
        graph = new Graph({
            WIN,
            id: 'graph3DCanvas',
            width: 500,
            height: 500,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });

        return () => {
            graph = null;
        }
    }, [graph]);

    return (<>
        <div className='beautyDiv'>
            <canvas id='graph3DCanvas'> </canvas>
        </div>


    </>)
}

/*return (<div>
    <div className="beautyDiv">
        <canvas id='graph3DCanvas'> </canvas>
    </div>

    <div className="checkbox">
        <br><input className="customScene" data-custom="showPoints" type="checkbox" id="showPoints">точки ннада?</input></br>
        <br><input className="customScene" data-custom="showEdges" type="checkbox" id="showEdges">рёбра ннада?</input> </br>
        <br><input className="customScene" data-custom="showPolygons" type="checkbox" id="showPolygons" checked>грани ннада?</input> </br>
        <br><input className="customScene" data-custom="animationOn" type="checkbox" id="animationOn" checked>анимацию ннада?</input></br>
        <br><input className="customScene" data-custom="shadowOn" type="checkbox" id="shadowOn">тени ннада?</input></br>
    </div>

    <div>
        <select id="selectFigures" class="selectFigures">
            <option value="empty">выберите фигурку</option>
            <option value="cube">кубик</option>
            <option value="pyramid">пирамидка</option>
            <option value="sphera">сфера</option>
            <option value="torus">Бог грома</option>
            <option value="ring">колечко</option>
            <option value="solarSystem">солнечная система</option>

            <option value="KleinBottle">бутылка Клейна</option>
            <option value="cone">конус</option>
            <option value="ellipsoid">эллипсоид</option>
            <option value="hyperbolicCylinder">гиперболический цилиндр</option>
            <option value="parabolicCylinder">параболический цилиндр</option>
            <option value="ellipticalCylinder">эллиптический цилиндр</option>
            <option value="singleStripHyperboloid">однополосной гиперболоид</option>
            <option value="doubleStripHyperboloid">двуполосной гиперболоид</option>
            <option value="ellipticalParaboloid">эллиптический параболоид</option>
            <option value="hyperbolicParaboloid">чипсина</option>
        </select>
    </div>
</div>)*/

export default Graph3D;