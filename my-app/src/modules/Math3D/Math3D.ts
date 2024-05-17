import { TWIN3D } from "../Graph/Graph";
import { Point, Polygon, Light, Surface, EDistance } from "./entites/index.ts";

export type TMath3D = {
    WIN: TWIN3D
}

type TMatrix = number[][];

type TVector = number[];

type TShadow = {
    isShadow: boolean;
    dark?: number;
}

export enum ETransform {
    zoom = 'zoom',
    move = 'move',
    rotateOx = 'rotateOx',
    rotateOy = 'rotateOy',
    rotateOz = 'rotateOz',
}

class Math3D {
    WIN: TWIN3D;

    constructor({ WIN }: TMath3D) {
        this.WIN = WIN;
    }

    xs(point: Point): number {
        const zs = this.WIN.CENTER.z;
        const z0 = this.WIN.CAMERA.z;
        const x0 = this.WIN.CAMERA.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point: Point): number {
        const zs = this.WIN.CENTER.z;
        const z0 = this.WIN.CAMERA.z;
        const y0 = this.WIN.CAMERA.y;
        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }

    multMatrix(T1: TMatrix, T2: TMatrix): TMatrix {
        const result = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += T1[i][k] * T2[k][j];
                }
                result[i][j] = s;
            }
        }
        return result;
    };

    multPoint(T: TMatrix, m: TVector): TVector {
        const a = [0, 0, 0, 0];
        for (let i = 0; i < T.length; i++) {
            let b = 0;
            for (let j = 0; j < m.length; j++) {
                b += T[j][i] * m[j];
            }
            a[i] = b;
        }
        return a;
    }

    getVector(a: Point, b: Point): Point {
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z,
        }
    }

    multVector(a: Point, b: Point): Point {
        return {
            x: a.y * b.z - a.z * b.y,
            y: - a.x * b.z + a.z * b.x,
            z: a.x * b.y - a.y * b.x
        }
    }

    moduleVector(a: Point): number {
        return Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2);
    }

    transform(matrix: TMatrix, point: Point): void {
        const result = this.multPoint(matrix, [point.x, point.y, point.z, 1]);
        point.x = result[0];
        point.y = result[1];
        point.z = result[2];
    }

    getTransform(...args: TMatrix[]): TMatrix {
        return args.reduce((S, t) => this.multMatrix(S, t),
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ])
    }

    [ETransform.zoom](delta: number): TMatrix {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    [ETransform.move](dx = 0, dy = 0, dz = 0): TMatrix {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    }

    [ETransform.rotateOx](alpha: number): TMatrix {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, - Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    [ETransform.rotateOy](alpha: number): TMatrix {
        return [
            [Math.cos(alpha), 0, - Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    [ETransform.rotateOz](alpha: number): TMatrix {
        return [
            [Math.cos(alpha), Math.sin(alpha), 0, 0],
            [- Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    calcDistance(surface: Surface, endPoint: Point, name: EDistance): void {
        surface.polygons.forEach(polygon => {
            let x = 0, y = 0, z = 0;
            polygon.points.forEach(index => {
                x += surface.points[index].x;
                y += surface.points[index].y;
                z += surface.points[index].z;
            });
            x /= polygon.points.length;
            y /= polygon.points.length;
            z /= polygon.points.length;

            polygon[name] = Math.sqrt((endPoint.x - x) ** 2 + (endPoint.y - y) ** 2 + (endPoint.z - z) ** 2);
        });
    }

    sortByArtistAlgorithm(polygons: Polygon[]): void {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    calcIllumination(distance: number, lumen: number): number {
        const illum = distance ? lumen / distance ** 2 : 1;
        return illum > 1 ? 1 : illum;
    }

    // ЗАПОЛНИТЬ ЛЕЕ
    calcCenter(surface: Surface): void {
        surface.polygons.forEach(polygon => {
            const points = surface.points;
            let x = 0, y = 0, z = 0;
            polygon.points.forEach((i) => {
                x += points[i].x;
                y += points[i].y;
                z += points[i].z;
            });
            x /= polygon.points.length;
            y /= polygon.points.length;
            z /= polygon.points.length;

            polygon.center = { x, y, z };
        });
    }

    calcRadius(surface: Surface): void {
        const points = surface.points;
        surface.polygons.forEach(polygon => {
            const center = polygon.center;
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];

            polygon.R = (
                this.moduleVector(this.getVector(center, p1)) +
                this.moduleVector(this.getVector(center, p2)) +
                this.moduleVector(this.getVector(center, p3)) +
                this.moduleVector(this.getVector(center, p4))
            ) / 4;
        });
    }

    // сцена хз чем должна быть
    calcShadow(polygon: Polygon, scene: Surface[], LIGHT: Light): TShadow {
        // не уверена что задаю валидные значения для результата
        let result: TShadow = {
            isShadow: false,
            dark: 0
        };
        const M1 = polygon.center;
        const r = polygon.R;
        const S = this.getVector(M1, LIGHT);
        scene.forEach((surface: Surface, index: number) => {
            if (polygon.index === index) return;
            surface.polygons.forEach(polygon2 => {
                const M0 = polygon2.center;
                if (M1.x === M0.x && M1.y === M0.y && M1.z === M0.z) return;
                if (polygon2.lumen > polygon.lumen) return;
                const dark = this.moduleVector(this.multVector(this.getVector(M0, M1), S)) / this.moduleVector(S);
                if (dark < r) {
                    result.isShadow = true;
                    result.dark = 0.7;
                }
            });
        });
        return result;
    }
}

export default Math3D;