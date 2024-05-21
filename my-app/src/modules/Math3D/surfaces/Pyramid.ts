import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class Pyramid extends Surface {
    constructor(edge: number = 10, color?: string, center: Point = new Point()) {
        super([
            new Point(edge, -edge, edge), // A - 0
            new Point(edge, -edge, -edge), // B - 1
            new Point(-edge, -edge, -edge), // C - 2
            new Point(-edge, -edge, edge), // D - 3

            new Point(0, edge, 0), // E - 4

        ], [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
            new Edge(3, 0),

            new Edge(0, 4),
            new Edge(1, 4),
            new Edge(2, 4),
            new Edge(3, 4),
        ], [
            new Polygon([0, 1, 2, 3], color || '#0000ff'),
            new Polygon([0, 4, 3], color || '#ff0000'),
            new Polygon([4, 2, 3], color || '#ffff00'),
            new Polygon([4, 1, 2], color || '#ff0000'),
            new Polygon([4, 0, 1], color || '#ffff00'),

        ],
            center);
    }
}

export default Pyramid;