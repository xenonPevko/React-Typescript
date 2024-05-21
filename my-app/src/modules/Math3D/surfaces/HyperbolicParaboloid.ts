import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class HyperbolicParaboloid extends Surface {
    constructor(count: number = 20, color?: string, center: Point = new Point()) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        // z = x**2 / 2q - y**2 / 2p
        const size: number  = 10;
        const delta: number  = size / count;

        // точки
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i * delta - size / 2;
                const y = j * delta - size / 2;
                const z = x * x / 6 - y * y / 6;
                points.push(new Point(x, y, z));
            }
        }

        // рёбра
        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1))
            }
            if (i + count < points.length) {
                edges.push(new Edge(i, i + count));
            }
        }

        // полигоны
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#F0E68C'));
            }
        }


        super(points, edges, polygons, center);
    }
}

export default HyperbolicParaboloid;