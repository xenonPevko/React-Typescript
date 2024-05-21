import { Point, Edge, Polygon, Surface } from "../entites/index.ts";

class HyperbolicCylinder extends Surface {
    constructor(count: number = 10, color?: string, center: Point = new Point()) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        //точки
        let size: number = 5;
        for (let i = -count; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i + size / count;
                const y = x * x / size;
                const z = j - size;
                points.push(new Point(x, y, z));
            }
        }
        size = -5;
        for (let i = -count; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i - size / count;
                const y = x * x / size;
                const z = j + size;
                points.push(new Point(x, y, z));
            }
        }

        //ребра
        for (let i = 0; i < points.length / 2 - count; i++) {
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
        for (let i = points.length / 2; i < points.length; i++) {
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
        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#dc143c'));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#dc143c'))
            }
        }
        for (let i = points.length / 2 + count / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#dc143c'));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#dc143c'))
            }
        }
        super(points, edges, polygons, center);
    }
}

export default HyperbolicCylinder;