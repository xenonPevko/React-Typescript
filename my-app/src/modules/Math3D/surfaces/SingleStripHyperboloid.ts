import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class SingleStripHyperboloid extends Surface {
    constructor(count: number = 20, center: Point = new Point(), color?: string) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        // точки
        const a: number = 1;
        const b: number = 1;
        const c: number = 1;
        const dt = Math.PI * 2 / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.cosh(i) * Math.cos(j),
                    c * Math.sinh(i),
                    b * Math.cosh(i) * Math.sin(j)
                ));

            }
        }

        // ребра
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

        // полигоны
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#AFEEEE'));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#AFEEEE'))
            }
        }
        super(points, edges, polygons, center);
    }
}

export default SingleStripHyperboloid;