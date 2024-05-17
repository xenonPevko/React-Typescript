Surfaces.prototype.solarSystem = () => {
    const WIN = {
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        CENTER: new Point(0, 0, -40),
        CAMERA: new Point(0, 0, -50)
    }
    const surfaces = new Surfaces();
    const math3D = new Math3D({ WIN });

    // для того шоб смотреть сверху
    viewFromAbove = (spaceObject) => {
        matrix = math3D.rotateOx(Math.PI / 2);
        spaceObject.points.forEach(point => math3D.transform(matrix, point));
        math3D.transform(matrix, spaceObject.center);
    }

    // солнышко
    const Sun = surfaces.sphera(10);
    //viewFromAbove(Sun);
    Sun.addAnimation('rotateOz', -0.01);

    // земля
    const Earth = surfaces.sphera(5, '#00ff00', new Point(17, 0, 0));
    //viewFromAbove(Earth);
    Earth.addAnimation('rotateOz', 0.06, new Point);

    // луна
    const Moon = surfaces.sphera(2, '#c0c0c0', Earth.center);
    //viewFromAbove(Moon);
    Moon.addAnimation('rotateOz', 0.6, Earth.center);
    return [Sun, Earth, Moon];

    /*
    
    const Mercury = surfaces.sphera();
    Mercury.addAnimation('rotate', )
    
    const Venus = surfaces.sphera();
    Venus.addAnimation('rotate', )

    const Mars = surfaces.sphera();
    Mars.addAnimation('rotate', )

    const Jupiter = surfaces.sphera();
    Jupiter.addAnimation('rotate', )
    
    const Saturn = surfaces.sphera();
    Saturn.addAnimation('rotate', )

    const ringsOfSaturn = surfaces.ring();
    ringsOfSaturn.addAnimation('rotate', )

    const Uranus = surfaces.sphera();
    Uranus.addAnimation('rotate', )

    const Neptune = surfaces.sphera();
    Neptune.addAnimation('rotate', )

    const Pluto = surfaces.sphera();
    Pluto.addAnimation('rotate', )
    */

} 