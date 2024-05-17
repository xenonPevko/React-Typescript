Surfaces.prototype.sphera = (r = 20, color = '#ffff00', center = new Point()) => {

    //x = (r * cos(psi) * cos(phi))
    //y = (r * cos(psi) * sin(phi))
    //z = r * sin(psi)
    //psi = -Pi...Pi
    //phi = 0...2 * Pi

    const points = [];
    const edges = [];
    const polygons = []; 

    const count = 20;
    const da = Math.PI * 2 / count;
    for (let phi = 0; phi <= Math.PI ; phi += da) {
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
    let a = 0;
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        }
        if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }

    return new Surface(points, edges, polygons, center)
}