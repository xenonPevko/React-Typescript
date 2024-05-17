Surfaces.prototype.hyperbolicCylinder = (count = 10, color = '#dc143c') => {
    const points = [];
    const edges = [];
    const polygons = [];

    //точки
    let size = 5;
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
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }
    for (let i = points.length / 2 + count / 2; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]. color))
        }
    }

    return new Surface(points, edges, polygons);
}