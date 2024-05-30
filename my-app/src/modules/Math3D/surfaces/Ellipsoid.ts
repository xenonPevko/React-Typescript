import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class Ellipsoid extends Surface {
    constructor(count: number = 20, color?: string, center: Point = new Point()) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        //точки
        const dt: number = Math.PI * 2 / count;
        const a: number = 18; 
        const b: number = 14;
        const c: number = 10;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < Math.PI * 2; j += dt) {
                points.push(new Point(
                    a * Math.sin(i) * Math.cos(j),
                    b * Math.sin(i) * Math.sin(j),
                    c * Math.cos(i)
                ));
            }
        }

        //ребра
        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
            if (i < points.length - count) {
                edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }

        //полигоны
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#DA70D6'));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#DA70D6'))
            }
        }

        super(points, edges, polygons, center)
    }
}

export default Ellipsoid;