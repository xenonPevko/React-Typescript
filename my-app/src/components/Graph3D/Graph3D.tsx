/*
у каждой фигуры в идеале должна быть панелька отдельная 
типа заходишь такой и настройки там всякие дёргаешь
для этого надо создать свой реактовый компонент, где выписать все нужные свойства
из него торчит коллбек на изменение сцены

сделать UI3D 

доделать фигуры на зачёт: бутылка клейна, эллиптический цилиндр, пирамиду починить или забить на неё 
----------------------------------------
на счёт калькултора - смущает вычитание полиномов
VEctCalc починить!

*/

import React, { useEffect } from 'react';
import Point from '../../modules/Math3D/entites/Point.ts';
import Graph from '../../modules/Graph/Graph.ts';
import Math3D from '../../modules/Math3D/Math3D.ts';
import { EDistance, Light, Polygon, Surface } from '../../modules/Math3D/entites/index.ts';
import { TWIN3D } from '../../modules/Graph/Graph';
import {
    Cube, Pyramid, Sphera, Cone, Torus, Ellipsoid, ParabolicCylinder,
    HyperbolicCylinder, HyperbolicParaboloid, EllipticalCylinder, EllipticalParaboloid,
    DoubleStripHyperboloid, SingleStripHyperboloid,
    KleinBottle
} from '../../modules/Math3D/surfaces/index.ts'
import Checkbox3D from './Checkbox3D/Checkbox3D.tsx';

import './Graph3D.scss';

export enum ECustom {
    showPoints = 'showPoints',
    showEdges = 'showEdges',
    showPolygons = 'showPolygons',
    animationOn = 'animationOn'
}

enum EFigure {
    Cube = 'Cube',
    Sphera = 'Sphera',
    Pyramid = 'Pyramid',
    Cone = 'Cone',
    Torus = 'Torus',
    Ellipsoid = 'Ellipsoid',
    ParabolicCylinder = 'ParabolicCylinder',
    HyperbolicCylinder = 'HyperbolicCylinder',
    HyperbolicParaboloid = 'HyperbolicParaboloid',
    EllipticalCylinder = 'EllipticalCylinder',
    EllipticalParaboloid = 'EllipticalParaboloid',
    DoubleStripHyperboloid = 'DoubleStripHyperboloid',
    SingleStripHyperboloid = 'SingleStripHyperboloid',
    KleinBottle = 'KleinBottle'
}

const Graph3D: React.FC = () => {

    const WIN: TWIN3D = ({
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        CAMERA: new Point(0, 0, -50),
        CENTER: new Point(0, 0, -40)
    });

    let graph: Graph | null = null;
    let LIGHT: Light = new Light(-40, 15, 0, 1500);
    let math3D: Math3D = new Math3D({ WIN });
    let scene: Surface[] = [new Sphera()];

    let dx: number = 0;
    let dy: number = 0;

    // флажки
    let canMove: boolean = false;

    /* не надо??? мб
    let surface: Surface = new Surface();
    let surfaces = Surfaces();
    let options = new Surface(points, edges, polygons)
    let points = [new Point()];
    let edges = [new Edge()];
    let polygons = [new Polygon()];
    */

    const custom = {
        [ECustom.showPoints]: false,
        [ECustom.showEdges]: false,
        [ECustom.showPolygons]: true,
        [ECustom.animationOn]: true
    }

    const figure = {
        [EFigure.Cube]: Cube,
        [EFigure.Sphera]: Sphera,
        [EFigure.Pyramid]: Pyramid,
        [EFigure.Cone]: Cone,
        [EFigure.Torus]: Torus,
        [EFigure.Ellipsoid]: Ellipsoid,
        [EFigure.ParabolicCylinder]: ParabolicCylinder,
        [EFigure.HyperbolicCylinder]: HyperbolicCylinder,
        [EFigure.HyperbolicParaboloid]: HyperbolicParaboloid,
        [EFigure.EllipticalCylinder]: EllipticalCylinder,
        [EFigure.EllipticalParaboloid]: EllipticalParaboloid,
        [EFigure.DoubleStripHyperboloid]: DoubleStripHyperboloid,
        [EFigure.SingleStripHyperboloid]: SingleStripHyperboloid,
        [EFigure.KleinBottle]: KleinBottle
    }

    // коллбэки -----------------------------------

    const mouseup = (): void => {
        canMove = false;
    }

    const mousedown = (): void => {
        canMove = true;
    }

    const mouseleave = () => {
        canMove = false;
    };

    const mousemove = (event: MouseEvent): void => {
        const gradus = Math.PI / 180 / 4;
        if (canMove) {
            scene.forEach(surface => surface.points.forEach(point => {
                const T1 = math3D.rotateOy((dx - event.offsetX) * gradus);
                const T2 = math3D.rotateOx((dy - event.offsetY) * gradus);
                const T = math3D.getTransform(T1, T2);
                math3D.transform(T, point)
            }));
        }
        dx = event.offsetX;
        dy = event.offsetY;
    }

    const wheel = (event: WheelEvent): void => {
        event.preventDefault();
        const delta = (event.deltaY < 0) ? 1.1 : 0.9;
        const matrix = math3D.zoom(delta);
        scene.forEach(surface => surface.points.forEach(point =>
            math3D.transform(matrix, point)));
    }

    // рендер сцена  -----------------------------------

    const renderScene = (FPS: number): void => {
        if (!graph) {
            return;
        }

        graph.clear();

        if (custom.showPoints) {
            scene.forEach(surface => surface.points.forEach(point => {
                graph && graph.point(
                    math3D.xs(point),
                    math3D.ys(point),
                    '#ff0000');
            }));
        }

        if (custom.showEdges) {
            scene.forEach(surface => surface.edges.forEach(edge => {
                const point1 = surface.points[edge.p1];
                const point2 = surface.points[edge.p2];
                graph && graph.line(
                    math3D.xs(point1), math3D.ys(point1),
                    math3D.xs(point2), math3D.ys(point2),
                    '#00ff00');
            }));
        }

        if (custom.showPolygons) {
            const polygons: Polygon[] = [];
            scene.forEach((surface, index) => {
                math3D.calcDistance(surface, WIN.CAMERA, EDistance.distance);
                math3D.calcDistance(surface, LIGHT, EDistance.lumen);
                math3D.calcCenter(surface);
                math3D.calcRadius(surface);
                surface.polygons.forEach(polygon => {
                    polygon.index = index;
                    polygons.push(polygon);
                });
            });

            math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                const points = polygon.points.map(index =>
                    new Point(
                        math3D.xs(scene[polygon.index].points[index]),
                        math3D.ys(scene[polygon.index].points[index])
                    ));

                let { r, g, b } = polygon.color;

                const { isShadow, dark } = math3D.calcShadow(polygon, scene, LIGHT);
                const lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen * (isShadow && dark ? dark : 1));

                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
            })
        }
        graph.text(-4.8, 4.5, `фпс = ${FPS}`, '#b55a5d');
    }

    // для шняг в разметке -----------------------------------

    const changeValue = (flag: ECustom, value: boolean) => {
        custom[flag] = value;
    };

    const changeScene = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let value: string = event.target.value;
        if (value) {
            const currentFigure = figure[value];
            if (currentFigure)
                scene = [new currentFigure()]
            return scene;

            /*if (value == 'solarSystem') {
                scene = [];
                for (let i = 0; i < surfaces.solarSystem().length; i++) {
                    scene.push(surfaces.solarSystem()[i]);
                }
                return scene;
            } else {
                scene = [new window[value]()];
                return scene;
            }*/
        }
    };

    // -----------------------------------

    useEffect(() => {
        graph = new Graph({
            WIN,
            id: 'graph3DCanvas',
            width: 500,
            height: 500,
            callbacks: { wheel, mousemove, mouseleave, mouseup, mousedown }
        });

        const interval = setInterval(() => {
            scene.forEach(surface => surface.doAnimation(math3D));
        }, 50);

        let currentFPS: number = 0;
        let FPS: number = 0;
        let timestamp: number = Date.now();
        let idLoop: number;

        const animLoop = () => {
            FPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                timestamp = currentTimestamp;
                currentFPS = FPS;
                FPS = 0;
            }

            renderScene(currentFPS);

            window.requestAnimationFrame(animLoop);
        }

        animLoop();

        return () => {
            graph = null;
            window.cancelAnimationFrame(idLoop);
            clearInterval(interval);
        }
    }, [graph]);

    return (<div className='g3D_beautyDiv'>
        <div>
            <canvas className="g3D_bestCanvas" id='graph3DCanvas'> </canvas>
        </div>
        <div className='g3D_div3D'>
            <Checkbox3D
                text='точки ннада?'
                id="points"
                custom={ECustom.showPoints}
                customValue={custom[ECustom.showPoints]}
                changeValue={changeValue}
            />

            <Checkbox3D
                text='рёбра ннада?'
                id="edges"
                custom={ECustom.showEdges}
                customValue={custom[ECustom.showEdges]}
                changeValue={changeValue}
            />

            <Checkbox3D
                text='полигоны ннада?'
                id="polygons"
                custom={ECustom.showPolygons}
                customValue={custom[ECustom.showPolygons]}
                changeValue={changeValue}
            />

            <Checkbox3D
                text='анимацию ннада?'
                id="animation"
                custom={ECustom.animationOn}
                customValue={custom[ECustom.animationOn]}
                changeValue={changeValue}
            />
        </div>
        <div className='g3D_div3D'>
            <select className='g3D_selectFigures' onChange={changeScene} id="selectFigures">
                <option value={[EFigure.Sphera]}>сфера</option>
                <option value={[EFigure.Cube]}>кубик</option>
                <option value={[EFigure.Pyramid]}>пирамидка</option>
                <option value={[EFigure.Torus]}>Бог грома</option>
                <option value={[EFigure.Cone]}>конус</option>
                <option value={[EFigure.Ellipsoid]}>эллипсоид</option>
                <option value={[EFigure.HyperbolicCylinder]}>гиперболический цилиндр</option>
                <option value={[EFigure.ParabolicCylinder]}>параболический цилиндр</option>
                <option value={[EFigure.EllipticalCylinder]}>эллиптический цилиндр</option>
                <option value={[EFigure.SingleStripHyperboloid]}>однополосной гиперболоид</option>
                <option value={[EFigure.DoubleStripHyperboloid]}>двуполосной гиперболоид</option>
                <option value={[EFigure.EllipticalParaboloid]}>эллиптический параболоид</option>
                <option value={[EFigure.HyperbolicParaboloid]}>чипсина</option>
                <option value={[EFigure.KleinBottle]}>бутылочка Клейна</option>
            </select>
        </div>
    </div>)
}

export default Graph3D;