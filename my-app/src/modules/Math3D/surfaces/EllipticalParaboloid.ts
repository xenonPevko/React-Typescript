import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class EllipticalParaboloid extends Surface {
    constructor(count: number = 20, color?: string, center: Point = new Point()) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        const a: number = 6;
        const b: number = 5;
        const dt: number = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    i * i,
                    b * i * Math.sin(j)
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
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#808000'));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#F0E68C'))
            }
        }

        super(points, edges, polygons, center);
    }
}

export default EllipticalParaboloid;