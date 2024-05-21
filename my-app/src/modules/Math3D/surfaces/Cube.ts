import { Point, Edge, Polygon, Surface } from "../entites/index.ts";

class Cube extends Surface {
    constructor(edge: number = 10, color?: string, center: Point = new Point()) {
        super([
            new Point(edge, edge, edge), //A - 0 
            new Point(edge, -edge, edge),//B - 1

            new Point(-edge, -edge, edge), //C - 2
            new Point(-edge, edge, edge), //D - 3

            new Point(edge, edge, -edge), //E - 4
            new Point(edge, -edge, -edge), //F - 5

            new Point(-edge, -edge, -edge), //G - 6
            new Point(-edge, edge, -edge), //H - 7
        ], [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
            new Edge(3, 0),

            new Edge(4, 5),
            new Edge(5, 6),
            new Edge(6, 7),
            new Edge(7, 4),

            new Edge(0, 4),
            new Edge(1, 5),
            new Edge(2, 6),
            new Edge(3, 7),
        ], [
            //зад
            new Polygon([0, 1, 2, 3], color || '#FF1493'),
            //перед
            new Polygon([4, 5, 6, 7], color || '#800080'),
            //справа
            new Polygon([0, 1, 5, 4], color || '#000000'),
            //верх
            new Polygon([0, 4, 7, 3], color || '#FFFF00'),
            //слева
            new Polygon([2, 6, 7, 3], color || '#008000'),
            //низ
            new Polygon([5, 1, 2, 6], color || '#0000FF'),
        ],
            center);
    }
}
export default Cube;