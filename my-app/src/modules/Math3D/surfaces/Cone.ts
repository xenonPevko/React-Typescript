import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class Cone extends Surface {
    constructor(count: number = 10, color?: string, center: Point = new Point()) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        const a: number = 4;
        const b: number = 4;
        const c: number = 4;
        const dt = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    c * i,
                    Math.sin(j) * b * i
                ));
            }
        }
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    c * Math.PI,
                    Math.sin(j) * b * i
                ));
            }
        }
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * i * Math.cos(j), -c * Math.PI,
                    Math.sin(j) * b * i
                ));
            }
        }
    
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
    
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#7FFFD4'));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#7FFFD4'))
            }
        }

        super(points, edges, polygons, center);
    }

}

export default Cone;