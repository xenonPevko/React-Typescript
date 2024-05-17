class RPGGame {
    constructor() {
        this.roomId = 'start';

        this.student = {
            life: 100
        };

        this.rooms = {
            start: {
                title: 'дом родной',
                description: 'вы вдыхаете спёртый воздух, пропитанный табачным дымом, и тоскливо смотрите в манящее окно',
                img: 'img/studentsRoom.jpg',
                actions: [
                    {
                        title: 'окно',
                        id: 'window',
                        cost: 100
                    }, {
                        title: 'коридор',
                        id: 'hall',
                        cost: 3
                    },
                ]
            },
            window: {
                title: 'мокрый асфальт',
                description: 'и всё-таки все проблемы были решаемы',
                img: 'img/suicide.jpg',
                actions: []
            },
            hall: {
                title: 'подозрительный коридор',
                description: 'вы выходите в затхлый коридор и пытаетесь решить куда двигаться дальше',
                img: 'img/hall.jpg',
                actions: [
                    {
                        title: 'кухня',
                        id: 'kitchen',
                        cost: -50
                    }, {
                        title: 'туалет',
                        id: 'toilet',
                        cost: 3
                    }, {
                        title: 'вахта',
                        id: 'security',
                        cost: 10
                    }, {
                        title: 'комната',
                        id: 'start',
                        cost: 3
                    },
                ]
            },
            kitchen: {
                title: 'любимая кухня',
                description: 'поздравляю, вы подкрепились чьим-то супом!',
                img: 'img/kitchen.jpg',
                actions: [
                    {
                        title: 'вернуться в коридор',
                        id: 'hall',
                        cost: 3
                    }

                ]
            },
            toilet: {
                title: 'вонючий туалет',
                description: 'здесь точно получится расслабиться?',
                img: 'img/toilet.jpg',
                actions: [
                    {
                        title: 'отлить в 1 кабинке',
                        id: 'cab1',
                        cost: 100
                    }, {
                        title: 'отлить во 2 кабинке',
                        id: 'cab2',
                        cost: 15
                    }, {
                        title: 'отлить в 3 кабинке',
                        id: 'cab3',
                        cost: 5
                    }, {
                        title: 'вернуться в коридор',
                        id: 'hall',
                        cost: 3
                    },
                ]
            },
            cab1: {
                title: 'это конец',
                description: 'не везуха, в этой кабинке вас зарезал героиновый наркоман :(',
                img: 'img/death.jpg',
                actions: []
            },
            cab2: {
                title: 'вонючий туалет',
                description: 'вы успешно отлили, но теперь ваша одежда запачкана чем-то коричневым',
                img: 'img/toilet.jpg',
                actions: [
                    {
                        title: 'отлить в 1 кабинке',
                        id: 'cab1',
                        cost: 100
                    }, {
                        title: 'отлить во 2 кабинке',
                        id: 'cab2',
                        cost: 15
                    }, {
                        title: 'отлить в 3 кабинке',
                        id: 'cab3',
                        cost: 5
                    }, {
                        title: 'вернуться в коридор',
                        id: 'hall',
                        cost: 3
                    },
                ]
            },
            cab3: {
                title: 'вонючий туалет',
                description: 'вы успешно отлили!',
                img: 'img/toilet.jpg',
                actions: [
                    {
                        title: 'отлить в 1 кабинке',
                        id: 'cab1',
                        cost: 100
                    }, {
                        title: 'отлить во 2 кабинке',
                        id: 'cab2',
                        cost: 15
                    }, {
                        title: 'отлить в 3 кабинке',
                        id: 'cab3',
                        cost: 5
                    }, {
                        title: 'вернуться в коридор',
                        id: 'hall',
                        cost: 3
                    },
                ]
            },
            security: {
                title: 'всепрощающая вахта',
                description: 'вы оглядываетесь по сторонам и делаете самый сложный выбор в вашей жизни',
                img: 'img/security.jpg',
                actions: [
                    {
                        title: 'улыбнуться вахтёрше',
                        id: 'evilSecurity',
                        cost: 10
                    }, {
                        title: 'пойти на пары',
                        id: 'udguHall',
                        cost: 20
                    }, {
                        title: 'пойти в красное&белое',
                        id: 'kb',
                        cost: 10
                    }, {
                        title: 'вернуться в коридор',
                        id: 'hall',
                        cost: 3
                    },
                ]
            },
            evilSecurity: {
                title: 'невсепрощающая вахта',
                description: 'вы ей не нравитесь, так что она разозлилась! решайте быстрее',
                img: 'img/evilSecurity.jpg',
                actions: [
                    {
                        title: 'улыбнуться вахтёрше',
                        id: 'evilSecurity',
                        cost: 10
                    }, {
                        title: 'пойти на пары',
                        id: 'udguHall',
                        cost: 20
                    }, {
                        title: 'пойти в красное&белое',
                        id: 'kb',
                        cost: 10
                    }, {
                        title: 'вернуться в коридор',
                        id: 'hall',
                        cost: 3
                    },
                ]
            },
            udguHall: {
                title: 'лучший универ',
                description: 'вы уверены в правильности своего решения?',
                img: 'img/udguHall.jpg',
                actions: [
                    {
                        title: 'вернуться в общагу',
                        id: 'security',
                        cost: 3
                    }

                ]
            },
            kb: {
                title: 'до боли знакомые полки',
                description: 'сейчас нужно ответственно подойти к выбору',
                img: 'img/kb.jpg',
                actions: [
                    {
                        title: 'классика по акции',
                        id: 'kb',
                        cost: 50
                    }, {
                        title: 'родное за 249',
                        id: 'kb',
                        cost: 40
                    }, {
                        title: 'то, что флешбекает, за 299',
                        id: 'kb',
                        cost: 30
                    }, {
                        title: 'незабытое старое за 349',
                        id: 'kb',
                        cost: 20
                    }, {
                        title: 'нечто новенькое за 399',
                        id: 'kb',
                        cost: 10
                    }, {
                        title: 'вернуться в общагу',
                        id: 'security',
                        cost: 3
                    },
                ]
            },
        };
    }

    isGameOver() {
        return this.student.life <= 0 || this.rooms[this.roomId].actions.length === 0;
    }

    restart() {
        const game = this;
        const button = document.createElement('button');
        button.classList.add("beautyButton");
        button.innerHTML = 'попробуйте ещё раз, может cледующая попытка выйдет более удачной, ха-ха';
        button.addEventListener('click', function () {
            game.roomId = 'start';
            game.student.life = 100;
            game.goToRoom();
        });
        document.getElementById('actions').appendChild(button);
    }

    goToRoom() {
        const room = this.rooms[this.roomId];
        const game = this;
        document.getElementById('roomTitle').innerHTML = room.title;
        document.getElementById('roomDescription').innerHTML = room.description;
        document.getElementById('studentLife').innerHTML = game.student.life;
        document.getElementById('roomImage').src = room.img;
        document.getElementById('actions').innerHTML = '';
        if (game.isGameOver()) {
            game.restart();
            return;
        }
        for (var i = 0; i < room.actions.length; i++) {
            (function (i) {
                var action = room.actions[i];
                var button = document.createElement('button');
                //button.classList.add("beautyButton");
                button.innerHTML = action.title;
                button.addEventListener('click', function () {
                    game.roomId = action.id;
                    if (action.cost !== undefined) {
                        game.student.life -= action.cost;
                    }
                    game.goToRoom();
                });
                document.getElementById('actions').appendChild(button);
            })(i);
        }
    }
}

export default RPGGame;