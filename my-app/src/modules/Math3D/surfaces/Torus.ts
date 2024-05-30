import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class Torus extends Surface {
    constructor(count = 20, R = 20, r = 5, color?: string, center = new Point()) {
        const da = Math.PI * 2 / count;
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];
        for (let phi = 0; phi < Math.PI * 2; phi += da) {
            for (let psi = -Math.PI; psi < Math.PI; psi += da) {
                const x = center.x + (R + r * Math.cos(psi)) * Math.cos(phi);
                const y = center.y + (R + r * Math.cos(psi)) * Math.sin(phi);
                const z = center.z + r * Math.sin(psi);
                points.push(new Point(x, z, y));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    if (i - count >= 0)
                        edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            } else {
                edges.push(new Edge(i, i % count));
            }
        }


        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#800080'));
            }
            if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#800080'))
            }
            if (!points[i + count] && i + 1 < points.length) {
                polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color || '#800080'));
            }
        }
        super(points, edges, polygons, center);
    }
}

export default Torus;