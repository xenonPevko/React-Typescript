import { Point, Edge, Polygon, Surface } from '../entites/index.ts';

class KleinBottle extends Surface {
    constructor(count: number = 20, center: Point = new Point(), color?: string) {
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        const bodyHeight: number = 30; //высота тела бутылки
        const neckHeight: number = 30; //высота горлышка бутылки
        const bodyRadiusBottom: number = 15; //радиус нижней части тела бутылки
        const bodyRadiusTop: number = 2; //радиус верхней части тела бутылки
        const neckRadius: number = 2; //радиус горлышка бутылки
        const deltaHeight: number = (bodyHeight + neckHeight) / count; //высота одного слоя
        const da = Math.PI * 2 / count;
        const R: number = 7;
        const r: number = 2;


        // точки нах
        //тело что тупо болииит
        for (let i = 0; i < count * (bodyHeight / (bodyHeight + neckHeight)); i++) {
            const radius = bodyRadiusBottom - ((bodyRadiusBottom - bodyRadiusTop) * i) / (count * (bodyHeight / (bodyHeight + neckHeight)));
            for (let j = 0; j < count; j++) {
                const angle = (j * 2 * Math.PI) / count;
                const x = center.x + radius * Math.cos(angle);
                const y = center.y + radius * Math.sin(angle);
                const z = center.z + i * deltaHeight;
                points.push(new Point(x, z - 10, y));

            }
        }

        //днище!!!!!!!!!!!!!
        for (let l = 0; l < count / 2 + 3; l++) {
            for (let j = 0; j < count; j++) {
                const angle = (j * 2 * Math.PI) / count;
                const x = center.x + (bodyRadiusBottom - l) * Math.cos(angle);
                const y = center.y + (bodyRadiusBottom - l) * Math.sin(angle);
                const z = center.z;
                points.push(new Point(x, z - 10, y));

            }
        }

        //горлышко снаружы
        for (let phi = da; phi < Math.PI * 2 - 1; phi += da) {
            for (let psi = -Math.PI; psi < Math.PI; psi += da) {
                const x = center.x + (R + r * Math.cos(psi)) * Math.cos(phi);
                const y = center.y + (R + r * Math.cos(psi)) * Math.sin(phi);
                const z = center.z + r * Math.sin(psi);
                points.push(new Point(x - R, y + bodyHeight - 3 - 10, z));

            }
        }

        //горлышко внутри прямое
        for (let i = 0; i <= count * (neckHeight / (bodyHeight + neckHeight)) - 5; i++) {
            for (let j = 0; j < count; j++) {
                const angle = (j * 2 * Math.PI) / count;
                const x = center.x + neckRadius * Math.cos(angle);
                const y = center.y + neckRadius * Math.sin(angle);
                const z = center.z + bodyHeight + i * deltaHeight;

                points.push(new Point(x, z - bodyHeight - 10, y));

            }
        }

        //горлышко внутри кривое
        for (let phi = da; phi < Math.PI * 2 - 5.5; phi += da) {
            for (let psi = -Math.PI; psi < Math.PI; psi += da) {
                const x = center.x + (R + r * Math.cos(psi)) * Math.cos(phi);
                const y = center.y + (R + r * Math.cos(psi)) * Math.sin(phi);
                const z = center.z + r * Math.sin(psi);
                points.push(new Point(x - R, y + bodyHeight - 15 - 10, z));

            }
        }


        // рёбра нах

        const bodyPointsCount = count * (bodyHeight / (bodyHeight + neckHeight));
        const bottomPointsStartIndex = bodyPointsCount * count;
        const bottomPointsEndIndex = bottomPointsStartIndex + count * (count / 2 + 3);
        const outerNeckStartIndex = bottomPointsEndIndex;
        const outerNeckEndIndex = outerNeckStartIndex + count * (Math.round((Math.PI * 2 - 1) / da) - 1);
        const innerNeckStraightStartIndex = outerNeckEndIndex;
        const innerNeckStraightEndIndex = innerNeckStraightStartIndex + count * ((count * (neckHeight / (bodyHeight + neckHeight))) - 5);
        const innerNeckCurvedStartIndex = innerNeckStraightEndIndex;
        const innerNeckCurvedEndIndex = innerNeckCurvedStartIndex + count * (Math.round((Math.PI * 2 - 5.5) / da) - 1);


        // создание рёбер для тела бутылки
        for (let i = 0; i < count * (bodyHeight / (bodyHeight + neckHeight)) - 1; i++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = i * count + j;
                const nextIdxInRing = ((j + 1) % count) + i * count;
                const nextIdxInColumn = currentIdx + count;

                edges.push(new Edge(currentIdx, nextIdxInRing)); // рёбра в текущем кольце
                edges.push(new Edge(currentIdx, nextIdxInColumn)); // рёбра между кольцами
            }
        }

        // cоздание рёбер для дна бутылки
        for (let l = 0; l < count / 2 + 2; l++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = bodyPointsCount * count + l * count + j;
                const nextIdxInRing = ((j + 1) % count) + l * count + bodyPointsCount * count;
                const nextIdxInColumn = currentIdx + count;

                if (l < count / 2 + 2) {
                    edges.push(new Edge(currentIdx, nextIdxInRing)); // рёбра в текущем кольце
                    if (l < count / 2 + 1) {
                        edges.push(new Edge(currentIdx, nextIdxInColumn)); // рёбра между кольцами
                    }
                }
            }
        }

        // cоздание рёбер для внутренней прямой части горлышка
        for (let i = innerNeckStraightStartIndex / count; i < (innerNeckStraightEndIndex / count); i++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = i * count + j;
                const nextIdxInRing = ((j + 1) % count) + i * count;
                const nextIdxInColumn = currentIdx + count;

                edges.push(new Edge(currentIdx, nextIdxInRing));
                edges.push(new Edge(currentIdx, nextIdxInColumn));
            }
        }

        // рёбрышки для внешней части горлааАААА
        const torRings = Math.round((Math.PI * 2 - 1) / da) - 1; // количество колец в торе
        for (let i = 0; i < torRings - 1; i++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = outerNeckStartIndex + i * count + j;
                const nextIdxInRing = outerNeckStartIndex + i * count + ((j + 1) % count);
                const nextIdxInColumn = outerNeckStartIndex + (i + 1) * count + j;

                edges.push(new Edge(currentIdx, nextIdxInRing)); // рёбра текущего кольца
                edges.push(new Edge(currentIdx, nextIdxInColumn)); // рёбра, соединяющие соседние кольца
            }
        }

        for (let i = 0; i <= count - 1; i++) {

            //соединялка тела и горлышка снаружи сверху
            if (i < count) {
                edges.push(new Edge(180 + i, 470 + i))
            } else {
                edges.push(new Edge(180 + i, 470 + i))
            }

            // соединялка между дном и внутренним прямым горлышком
            if (i < count) {
                edges.push(new Edge(780 + i, 420 + i))
            } else {
                edges.push(new Edge(780 + i, 420 + i))
            }
        }

        for (let i = 0; i <= count; i++) {
            // рёбра внутренней кривой части горлышка
            if ((900 + i + count < points.length) && (900 + i + 1 < points.length)) {
                if (900 + i + 1 === 920) {
                    edges.push(new Edge(900 + i, 900))
                } else {
                    edges.push(new Edge(900 + i, 900 + i + 1))
                }

                if (920 + i === 940) {
                    edges.push(new Edge(920 + i, 920))
                }
                if ((920 + i < points.length) && (920 + i + 1 < points.length)) {
                    edges.push(new Edge(920 + i, 920 + i + 1))
                }
                edges.push(new Edge(900 + i, 900 + i + count));
            }

            // между прямым и кривым внутри
            if (i <= count / 2 - 1) {
                edges.push(new Edge(890 + i, 900 + i));
            } else {
                edges.push(new Edge(899 - i, 929 - i))
            }
           
            // между кривым и наружным
            if (i <= count / 2 - 1) {
                edges.push(new Edge(770 + i, 939 - i));
            } else {
                edges.push(new Edge(779 - i, 910 + i));
            }
        }

        // полигоны нах
        /*for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color || '#7B68EE'));
            }
            if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color || '#7B68EE'))
            }
            if (!points[i + count] && i + 1 < points.length) {
                polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)], color || '#7B68EE'));
            }
        }*/

        // создание полигонов для тела бутылки
        for (let i = 0; i < count * (bodyHeight / (bodyHeight + neckHeight)) - 1; i++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = i * count + j;
                const nextIdxInRing = ((j + 1) % count) + i * count;
                const nextIdxInColumn = currentIdx + count;

                // Создание полигона между текущим и следующим кольцом
                polygons.push(new Polygon([currentIdx, nextIdxInRing, nextIdxInRing + count, nextIdxInColumn], color));
            }
        }

        // cоздание рёбер для дна бутылки
        for (let l = 0; l < count / 2 + 2; l++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = bodyPointsCount * count + l * count + j;
                const nextIdxInRing = ((j + 1) % count) + l * count + bodyPointsCount * count;
                const nextIdxInColumn = currentIdx + count;

                if (l < count / 2 + 2) {
                    if (l < count / 2 + 1) {
                        // cоздание полигона между текущим и следующим кольцом
                        polygons.push(new Polygon([currentIdx, nextIdxInRing, nextIdxInRing + count, nextIdxInColumn], color));
                    }
                }
            }
        }

        // cоздание полигонов для внутренней прямой части горлышка
        for (let i = innerNeckStraightStartIndex / count; i <= (innerNeckStraightEndIndex / count) - 1; i++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = i * count + j;
                const nextIdxInRing = ((j + 1) % count) + i * count;
                const nextIdxInColumn = currentIdx + count;
 
                polygons.push(new Polygon([currentIdx, nextIdxInRing, nextIdxInRing + count, nextIdxInColumn], color));
            }
        }

        // полигоны для внешней части горлааАААА
        for (let i = 0; i < torRings - 1; i++) {
            for (let j = 0; j < count; j++) {
                const currentIdx = outerNeckStartIndex + i * count + j;
                const nextIdxInRing = outerNeckStartIndex + i * count + ((j + 1) % count);
                const nextIdxInColumn = outerNeckStartIndex + (i + 1) * count + j;

                // полигоны, образованные точками текущего и следующего кольца
                polygons.push(new Polygon([currentIdx, nextIdxInRing, nextIdxInRing + count, nextIdxInColumn], color));
            }
        }

        for (let i = 0; i <= count - 1; i++) {

            //соединялка тела и горлышка снаружи сверху
            if (i < count) {
                polygons.push(new Polygon([180 + i, 470 + i, 470 + i - 1, 180 + i - 1]))
            } else {
                polygons.push(new Polygon([180, 470 + i, 470 + i - 1, 180 - 1]))
            }

            // соединялка между дном и внутренним прямым горлышком
            if (i < count) {
                polygons.push(new Polygon([421 + i, 781 + i, 781 + i - 1, 421 + i - 1]))
            } else {}
            polygons.push(new Polygon([420, 780, 799, 439]))

        }

        for (let i = 0; i <= count; i++) {
            // poly внутренней кривой части горлышка
            if ((900 + i + count < points.length) && (900 + i + 1 < points.length)) {
                if (900 + i + 1 === 920) {
                    polygons.push(new Polygon([900, 919, 920 + i, 920]))
                } else {
                    polygons.push(new Polygon([900 + i, 900 + i + 1, 921 + i, 920 + i]))
                }
            }

            // между прямым и кривым внутри
            if (i <= count / 2 - 1) {
            } else {
                polygons.push(new Polygon([901 - i, 931 - i, 930 - i, 900 - i]))
            }
            if (i <= count / 2 - 2) {
                polygons.push(new Polygon([890 + i, 900 + i, 901 + i, 891 + i]))
            }
            polygons.push(new Polygon([880, 910, 909, 899]))

            // между кривым и наружным
            if (i <= count / 2 - 1) {
                polygons.push(new Polygon([920 + i, 770 - i, 769 - i, 921 + i]))
            } else { }
            if ((i >= count / 2) && (i < count - 2)) {
                polygons.push(new Polygon([949 - i, 761 + i, 762 + i, 948 - i]))
            }
            polygons.push(new Polygon([939, 771, 770, 920]))
            polygons.push(new Polygon([931, 779, 760, 930]))
        }

        super(points, edges, polygons, center);
    }
}

export default KleinBottle;