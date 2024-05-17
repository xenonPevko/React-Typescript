Surfaces.prototype.KleinBottle = (count = 20, r = 10, color = '#ffff00', center = new Point()) => {
    const points = [];
    const edges = [];
    const polygons = [];

    return new Surface(points, edges, polygons);
} 