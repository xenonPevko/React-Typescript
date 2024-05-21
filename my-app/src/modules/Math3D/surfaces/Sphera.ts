import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class Sphera extends Surface {
    constructor(r: number = 20, center: Point = new Point(), color?: string) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        const count: number = 20;
        const da: number = Math.PI * 2 / count;
        for (let phi = 0; phi <= Math.PI; phi += da) {
            for (let psi = 0; psi < Math.PI * 2; psi += da) {
                const x = r * Math.cos(psi) * Math.sin(phi) + center.x;
                const y = r * Math.cos(phi) + center.y;
                const z = r * Math.sin(psi) * Math.sin(phi) + center.z;
                points.push(new Point(x, y, z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            //грани в колечках
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    if (i - count >= 0)
                        edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            //грани между колечками
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            } else {
                edges.push(new Edge(i, i % count));
            }
        }

        //полигоны
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color ||'#ffff00'));
            }
            if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#ffff00'))
            }
        }
        super(points, edges, polygons, center);
    }
}

export default Sphera;