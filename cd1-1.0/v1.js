var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

var game = {
    name: "CubeDood",
    version: "1.0.0",
    author: "CubeDood Studios"
}

var player = {
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false,

    direction: "right",
    score: 0
}
var cubetop = {
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    velX: 0,
    velY: 0,

    direction: "right"
}
var maxcubetop = {
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    velX: 0,
    velY: 0,

    direction: "right"
}
var cubeBrute = {
    x: 0,
    y: 0,
    w: 64,
    h: 64,
    velX: 0,
    velY: 0,

    direction: "right"
}
var cubie = {
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    velX: 0,
    velY: 0,

    direction: "right"
}

var physics = {
    gravity: 0.2,
    friction: 0.92,
    speed: 3,
    jump: 3.3
}

var assets = {
    sfx: {
        jump: "assets/sfx/jump.mp3",
        win: "assets/sfx/win.mp3",
    },
    ost: {
        newMenu: "assets/ost/The Memory Snatcher.mp3",
        settings: "assets/ost/Meeting with the Cube.mp3",
        editor: "assets/ost/Functional Equation.mp3",
        cubetopTheme: "assets/ost/Blast from the Past.mp3",
        squared: "assets/ost/Squared Impared.mp3",
        bolt: "assets/ost/BOLT!.mp3",
    },
    sprites: {
        flag: "assets/sprites/flag.png",
        logo: "assets/sprites/logo.png",
    },
    symbols: {
        enabled: "✓",
        disabled: "✗"
    }
}

var level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var editorLevel = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var doneOnce = false;

var allStoryModeLevels = [
    "Beginnings,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,3,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,0,0,0,0,0,0,3,3,0,0,0,1,1,1,0,0,0,0,0,0,0,3,0,0,3,0,0,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,5,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1",
    "Red-Spikes,CubeDood,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,3,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,3,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,3,0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,0,0,3,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,0,0,3,3,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,4,0,4,0,4,0,4,0,0,0,0,0,0,4,1,4,1,4,1,4,1,4,1,4,1,0,0,0,2",
    "Lava-Spills,CubeDood,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,4,4,0,0,2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,3,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,3,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,3,0,0,1,1,1,1,1,1,0,0,0,0,4,0,0,0,3,0,0,1,1,1,4,4,0,0,0,0,1,1,1,0,3,0,0,0,0,0,0,4,0,0,0,0,1,1,0,0,0,0,3,3,3,0,0,4,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,1,1,1,1,1,4,4,4,4,4,4,5,0,0,1,1,1,1,1,1,1,1,1,4,4,4,4",
    "Lava-River,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,3,3,3,0,0,0,0,0,0,0,0,3,3,0,0,3,0,0,0,3,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1",
    "Big-Jump,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,5,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,4,4,1,1,1,1,1,4,4,4,1,0,1,1,1,4,4,4,1,1,1,1,1,4,4,4,1,2",
    "Walls,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,5,0,0,4,0,0,0,4,0,0,0,4,0,0,2,4,1,1,1,4,1,1,1,4,1,1,1,4,1,1,1,4,1,0,1,4,1,0,1,4,1,0,1,4,1,0,1",
    "Platforms,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,5,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0",
    "Twisty,CubeDood,4,4,4,4,4,4,1,1,0,0,0,1,1,4,4,4,4,0,0,0,0,0,0,1,1,0,1,1,0,0,0,4,4,0,0,0,0,0,0,0,1,1,1,0,0,0,0,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,4,0,1,1,0,1,1,0,0,0,0,1,1,0,0,0,4,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,4,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,4,0,0,0,0,0,5,0,0,0,0,0,0,0,1,1,4,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,4,0,0,0,0,1,1,0,1,1,0,0,0,0,0,4,4,4,4,4,1,1,0,0,0,1,1,4,4,4,4,4",
    "Turning,CubeDood,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4",
    "Drip-Drop,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,4,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5",
    "Immortals,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,4,4,4,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,5,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1",
    "Spiky,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0,2,0,0,0,4,4,4,0,0,4,4,4,0,0,0,5",
    "Impossible,CubeDood,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,4,0,0,4,4,0,0,0,0,4,0,0,0,0,0,0,4,0,0,4,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,4,0,0,0,4,0,0,0,4,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4",
    "DivingBoard,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1,1,0,0,4,4,0,0,4,0,0,0,4,4,0,0,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1",
    "Black-Red,CubeDood,0,0,0,0,0,0,0,0,4,1,4,0,0,0,0,2,0,0,0,0,0,0,0,0,4,1,4,0,0,0,0,1,0,0,0,0,0,0,0,0,4,1,4,0,0,0,0,4,5,0,0,4,4,4,0,0,4,1,4,0,0,0,0,4,1,1,1,1,1,1,0,0,4,1,1,1,0,0,0,4,4,4,4,4,4,4,0,0,4,1,4,4,0,0,0,4,4,0,0,0,0,0,0,0,4,1,4,0,0,0,0,4,4,0,0,0,0,0,0,0,4,1,4,0,0,0,1,1,4,0,0,0,0,0,0,0,4,1,4,0,0,0,0,4,4,0,0,0,0,4,0,0,4,1,4,0,0,0,0,4,4,0,0,1,1,1,1,1,1,1,1,1,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,4,1,1,0,0,0,1,0,0,0,1,1,1,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4",
    "Terminal,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,1,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    "EvilDood,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,4,4,4,4,4,4,4,4,1,1,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,1,1,0,0,4,4,4,4,4,4,4,4,0,0,0,0,1,1,0,0,1,4,4,4,4,1,4,4,1,1,0,0,0,0,0,0,4,4,4,4,4,4,4,4,1,1,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,1,1,0,0,4,4,4,4,4,4,4,4,5,0,0,0,1,1,0,0,4,4,4,4,4,4,4,4",
    "Pool,EvilDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1",
    "Slid,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,5,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4",
    "Level-20,CrazyDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,4,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,4,4,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,4,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,4,1,1,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,0,0,0,0,0,0,0,0,0,0,0,5,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    "For-The-Speedrunners,EvilDood,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2",
    "AntiSpeed,SpeedDood,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,5,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1",
    "Editor,CubeDood,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
];

var levelStartPost = {
    x: 0,
    y: 0
}
var currentGridPosition = {
    x: 0,
    y: 0
}

var editor = {
    currentHeldBlock: 0
}

var options = {
    music: true,
    sfx: true,
    fullscreen: false
}

var keys = [];

var audioPlaying = false;

var currentLevel = 1;
var completedLevel = 0;
var currentLevelName = "";
var currentLevelAuthor = "";
var currentMenuOption = 5;

var currentMainMenuOption = 0;
var currentSettingsMenuOption = 0;
var currentEditorMenuOption = 0;

var cannotPress = false;

var timerStarted = false;
var levelLoaded = false;

var menuAudio = new Audio(assets.ost.newMenu);
var settingsAudio = new Audio(assets.ost.settings);
var editorAudio = new Audio(assets.ost.editor);
var cubetopTheme = new Audio(assets.ost.cubetopTheme);
var squaredImpared = new Audio(assets.ost.squared);
var boltTheme = new Audio(assets.ost.bolt);
var winAudio = new Audio(assets.sfx.win);
var jumpAudio = new Audio(assets.sfx.jump);

var goalFlag = new Image();
goalFlag.src = assets.sprites.flag;

var logo = new Image();
logo.src = assets.sprites.logo;

var cutScenes = {
    cut1: false,
    cut2: false
}
var cutSceneFinished = false;
var cutScenePlaying = false;

var menuShowing = false;
var pressSpaceToOpenMenu = false;

var sentInfoNotif = false;
var soundEffectPlaying = false;

var changedValues = false;

var trailerMode = false;
var inGame = false;

var levelTranslated = false;
var sentCompleteNotif = false;

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

function update() {
    switch (currentMenuOption) {
        case 0:
            createTitleScreen();
            if (!audioPlaying & options.music) {
                menuAudio.currentTime = 0;
                menuAudio.play();
                audioPlaying = true;
            }
            titleScreenControls();
            break;
        case 1:
            if (inGame) {
                if (!levelTranslated) {
                    translateLevelData(allStoryModeLevels[currentLevel - 1]);
                    levelTranslated = true;
                }
                if (!doneOnce) {
                    checkForMusicSwap();
                    doneOnce = true;
                }
                drawLevel(level);
                playerController();
            }
            break;
        case 2:
            if (!audioPlaying && options.music) {
                editorAudio.currentTime = 0;
                editorAudio.play();
                audioPlaying = true;
            }
            createEditorScreen();
            editorMenuControls();
            break;
        case 3:
            createSettingsScreen();
            if (!audioPlaying && options.music) {
                settingsAudio.currentTime = 0;
                settingsAudio.play();
                audioPlaying = true;
            }
            settingsMenuControls();
            break;
        case 4:
            createCreditsScreen();
            if (!timerStarted) {
                timerStarted = true;
                setTimeout(function() {
                    currentMenuOption = 0;
                    timerStarted = false;
                }, 5000);
            }
            break;
        case 5:
            createStartScreen();
            startScreenControls();
            break;
        case 6:
            createEditScreen();
            editorControls();
            break;
        case 7:
            if (!sentInfoNotif) {
                var levelCode = prompt("Enter the level data to load: ", "Level data");
                if (levelCode != null) {
                    resetPlayerPosition();
                    translateLevelData(levelCode);
                }
                sentInfoNotif = true;
            }
            drawLevel(level);
            if (trailerMode) {
                createCubeTop(cubetop);
            }
            playerController();
            break;
        case 8: 
            createDebugScreen();
            break;
    }
    requestAnimationFrame(update);
}

function createTitleScreen() {
    player.x = 380;
    player.y = 180;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 180;
    cubetop.direction = "left";

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 130, 125, 150);
    drawMainMenuButtons();
    drawVersion();
    drawStudios();
    drawButtonPointer(currentMainMenuOption);

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("In 'The Memory Snatcher'", 205, 230);
} 

function createSettingsScreen() {
    cubetop.x = 98;
    cubetop.y = 180;
    cubetop.direction = "left";

    player.x = 380;
    player.y = 180;
    player.direction = "right";

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawVersion();
    drawStudios();
    drawSettingsButtons();
    drawButtonPointer(currentSettingsMenuOption);
    drawLogo(192, 130, 125, 150);

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Settings'", 302, 230);
}

function createCreditsScreen() {
    player.x = 380;
    player.y = 80;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 80;

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 30, 125, 50)
    createCreditsText();
    drawVersion();
    drawStudios();

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Credits'", 310, 130);
}

function createEditorScreen() {
    player.x = 380;
    player.y = 180;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 180;
    cubetop.direction = "left";

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 130, 125, 150);
    drawEditorButtons();
    drawButtonPointer(currentEditorMenuOption);
    drawVersion();
    drawStudios();

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Editor'", 310, 230);
}

function createStartScreen() {
    drawBackground("black");

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Press the space bar to start", 160, 150);
}

function createEditScreen() {
    drawBackground("orange");

    ctx.fillStyle = "black";
    ctx.strokeRect(currentGridPosition.x * 32, currentGridPosition.y * 32, 32, 32);

    drawEditorLevel(editorLevel);

    if (!pressSpaceToOpenMenu) {
        ctx.font = "15px Helvetica";
        ctx.fillStyle = "black";
        ctx.fillText("Press space to open the editor menu", 130, 470);
    }

    if (menuShowing) {
        drawEditorMenu();
    }
}

function createCubeDood(player) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fill();
    ctx.closePath();

    switch (player.direction) {
        case "right":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 10, player.y + 10, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 30, player.y + 10, 2, 0, Math.PI * 2, true);
            break;
        case "left":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 3, player.y + 10, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 25, player.y + 10, 2, 0, Math.PI * 2, true);
            break;
        case "upr":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 10, player.y + 3, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 30, player.y + 3, 2, 0, Math.PI * 2, true);
            break;
        case "upl":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 3, player.y + 3, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 25, player.y + 3, 2, 0, Math.PI * 2, true);
            break;
    }
    ctx.fill();
    ctx.closePath();
}

function createCubeTop(cubetop) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(cubetop.x, cubetop.y, cubetop.w, cubetop.h);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(cubetop.x, cubetop.y, cubetop.w, cubetop.h);
    ctx.fill();
    ctx.closePath();

    switch (cubetop.direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 10, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 30, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 3, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 25, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;    
        case "upr":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 10, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 30, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "upl":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 3, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 25, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
    }
    
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(cubetop.x + 3, cubetop.y - 5, 26, 5);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(cubetop.x + 6, cubetop.y - 30, 20, 25);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(cubetop.x + 16, cubetop.y - 5, 10, 0, Math.PI, true);
    ctx.fill();
    ctx.closePath();
}

function createMaxCubeTop(maxcubetop) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(maxcubetop.x, maxcubetop.y, maxcubetop.w, maxcubetop.h);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(maxcubetop.x, maxcubetop.y, maxcubetop.w, maxcubetop.h);
    ctx.fill();
    ctx.closePath();

    switch (cubetop.direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(maxcubetop.x + 10, maxcubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(maxcubetop.x + 30, maxcubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(maxcubetop.x + 3, maxcubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(maxcubetop.x + 25, maxcubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;    
        case "upr":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(maxcubetop.x + 10, maxcubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(maxcubetop.x + 30, maxcubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "upl":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(maxcubetop.x + 3, maxcubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(maxcubetop.x + 25, maxcubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(maxcubetop.x + 3, maxcubetop.y - 5, 26, 5);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(maxcubetop.x + 6, maxcubetop.y - 30, 20, 25);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(maxcubetop.x + 16, maxcubetop.y - 5, 10, 0, Math.PI, true);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(maxcubetop.x + 6, maxcubetop.y - 30);
    ctx.lineTo(maxcubetop.x + 26, maxcubetop.y - 30);
    ctx.lineTo(maxcubetop.x + 16, maxcubetop.y - 15);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(maxcubetop.x + 6, maxcubetop.y - 30);
    ctx.lineTo(maxcubetop.x + 6, maxcubetop.y - 35);
    ctx.lineTo(maxcubetop.x + 16, maxcubetop.y - 25);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(maxcubetop.x + 26, maxcubetop.y - 30);
    ctx.lineTo(maxcubetop.x + 26, maxcubetop.y - 35);
    ctx.lineTo(maxcubetop.x + 16, maxcubetop.y - 25);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(maxcubetop.x, maxcubetop.y + 22, 32, 10);
    ctx.fill();

    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(maxcubetop.x + 16, maxcubetop.y + 22, 5, 0, Math.PI, false);
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(maxcubetop.x + 16, maxcubetop.y + 22, 3, 0, Math.PI, false);
    ctx.fill();

    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(maxcubetop.x + 16, maxcubetop.y + 22, 2, 0, Math.PI, false);
    ctx.fill();

    ctx.closePath();
}

function createCubeBrute(cubeBrute) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(cubeBrute.x, cubeBrute.y - 32, cubeBrute.w, cubeBrute.h);
    ctx.fill();
    ctx.closePath();
    
    switch (cubeBrute.direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.rect(cubeBrute.x + 20, cubeBrute.y - 5, 10, 15);
            ctx.fill();
            ctx.rect(cubeBrute.x + 55, cubeBrute.y- 5, 10, 15);
            ctx.fill();
            ctx.closePath();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.rect(cubeBrute.x, cubeBrute.y - 5, 10, 15);
            ctx.fill();
            ctx.rect(cubeBrute.x + 35, cubeBrute.y - 5, 10, 15);
            ctx.fill();
            ctx.closePath();
            break;
        case "upr":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.rect(cubeBrute.x + 20, cubeBrute.y - 30, 10, 15);
            ctx.fill();
            ctx.rect(cubeBrute.x + 55, cubeBrute.y- 30, 10, 15);
            ctx.fill();
            ctx.closePath();
            break;
        case "upl":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.rect(cubeBrute.x, cubeBrute.y - 30, 10, 15);
            ctx.fill();
            ctx.rect(cubeBrute.x + 35, cubeBrute.y - 30, 10, 15);
            ctx.fill();
            ctx.closePath();
            break;
    }
}

function createCubie(cubie) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(cubie.x, cubie.y, cubie.w, cubie.h);
    ctx.fill();
    ctx.closePath();

    switch (cubie.direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubie.x + 10, cubie.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubie.x + 30, cubie.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "#F6E1D3";
            ctx.beginPath();
            ctx.arc(cubie.x + 10, cubie.y + 15, 3, 0, Math.PI * 4, true);
            ctx.fill();
            ctx.arc(cubie.x + 30, cubie.y + 15, 3, 0, Math.PI * 4, true);
            ctx.fill();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubie.x + 3, cubie.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubie.x + 25, cubie.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "#F6E1D3";
            ctx.beginPath();
            ctx.arc(cubie.x + 3, cubie.y + 15, 3, 0, Math.PI * 4, true);
            ctx.fill();
            ctx.arc(cubie.x + 25, cubie.y + 15, 3, 0, Math.PI * 4, true);
            ctx.fill();
            break;
        case "upr":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubie.x + 10, cubie.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubie.x + 30, cubie.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "#F6E1D3";
            ctx.beginPath();
            ctx.arc(cubie.x + 10, cubie.y + 8, 3, 0, Math.PI * 4, true);
            ctx.fill();
            ctx.arc(cubie.x + 30, cubie.y + 8, 3, 0, Math.PI * 4, true);
            ctx.fill();
            break;
        case "upl":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubie.x + 3, cubie.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubie.x + 25, cubie.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "#F6E1D3";
            ctx.beginPath();
            ctx.arc(cubie.x + 3, cubie.y + 8, 3, 0, Math.PI * 4, true);
            ctx.fill();
            ctx.arc(cubie.x + 25, cubie.y + 8, 3, 0, Math.PI * 4, true);
            ctx.fill();
            break;
    }
    ctx.closePath();
}

function drawButtonPointer(pointer) {
    switch (pointer) {
        case 0:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 268, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 268 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 268 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
        case 1:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 308, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 308 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 308 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
        case 2:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 348, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 348 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 348 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
        case 3:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 388, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 388 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 388 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
    }
}

function drawMainMenuButtons() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 260, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Start Game", 211, 283);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 300, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Editor", 237, 323);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 340, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Options", 230, 363);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 380, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Credits", 230, 403);
}

function drawSettingsButtons() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 260, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    if (options.sfx) {
        ctx.fillText("SFX " + assets.symbols.enabled, 240, 283);
    } else {
        ctx.fillText("SFX " + assets.symbols.disabled, 240, 283);
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 300, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    if (options.music) {
        ctx.fillText("Music " + assets.symbols.enabled, 230, 323);
    } else {
        ctx.fillText("Music " + assets.symbols.disabled, 230, 323);
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 340, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    if (options.fullscreen) {
        ctx.fillText("Secret " + assets.symbols.enabled, 230, 363);
    } else {
        ctx.fillText("Secret " + assets.symbols.disabled, 230, 363);
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 380, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Back", 245, 403);
}

function drawEditorButtons() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 260, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Create", 230, 283);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 300, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Play", 240, 323);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 340, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Submit", 230, 363);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 380, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Back", 240, 403);
}

function drawEditorMenu() {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.rect(0, 279, 512, 200);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 279, 512, 200);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Editor Menu", 10, 300);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(10, 320, 32, 32);
    ctx.stroke();
    ctx.closePath();

    drawCurrentHeldBlock();

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Controls:", 200, 375);
    ctx.fillText("Arrow Keys - Move Grid Position", 10, 400);
    ctx.fillText("1-6 - Change Held Block", 10, 420);
    ctx.fillText("E - Place Block", 10, 440);
    ctx.fillText("R - Reset Level", 10, 460);
    ctx.fillText("Enter - Save level", 250, 400);
    ctx.fillText("Escape - Exit editor", 250, 420);
    ctx.fillText("Space - Editor Menu", 250, 440);
}
 
function drawCurrentHeldBlock() {
    switch (editor.currentHeldBlock) {
        case 0:
            ctx.font = "15px Helvetica";
            ctx.fillText("Empty tile (1)", 50, 340);
            break;
        case 1:
            ctx.font = "15px Helvetica";
            ctx.fillText("Solid tile (2)", 50, 340);
            drawBlock(10, 320, 32, 32, "black");
            break;
        case 2:
            ctx.font = "15px Helvetica";
            ctx.fillText("Flag (3)", 50, 340);
            ctx.drawImage(goalFlag, 10, 320, 32, 32);
            break;
        case 3:
            ctx.font = "15px Helvetica";
            ctx.fillText("Coin (4)", 50, 340);
            drawBlock(10, 320, 32, 32, "yellow");
            break;
        case 4:
            ctx.font = "15px Helvetica";
            ctx.fillStyle = "black";
            ctx.fillText("Lava (5)", 50, 340);
            drawBlock(10, 320, 32, 32, "red");
            break;
        case 5:
            ctx.font = "15px Helvetica";
            ctx.fillText("Player Spawn (6)", 50, 340);
            drawEditorStartPos();
            break;
    }
}

function drawLogo(x, y, x2, y2) {
    ctx.drawImage(goalFlag, x, y, 32, 32);
    ctx.drawImage(logo, x2, y2, 261, 76);
}

function createCreditsText() {
    ctx.fillStyle = "black";
    ctx.font = "17px Helvetica";
    ctx.fillText("Created by CubeDood Studios", 140, 170);
    ctx.fillText("CubeDood Studios:", 140, 200);
    ctx.fillText("Jack Spencer (CubeDood)", 140, 220);
    ctx.fillText("Music: MotionArray", 140, 250);
    ctx.fillText("Special thanks to:", 140, 280);
    ctx.fillText("Jared,", 140, 300);
    ctx.fillText("All custom level creators,", 140, 320);
    ctx.fillText("and the people who play my game!", 140, 340);
}

function drawBlock(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.closePath();
}

function drawEditorStartPos() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(18, 320 + 8, 15, 15);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(18 + 5, 320 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.arc(18 + 14, 320 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function drawStartPos(x, y) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x * 32 + 8, y * 32 + 8, 15, 15);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x * 32 + 13, y * 32 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.arc(x * 32 + 22, y * 32 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function drawLevelText() {
    ctx.font = "32px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Level " + currentLevel, 5, 35);

    ctx.font = "16px Helvetica";
    ctx.fillStyle = "white";
    currentLevelName = currentLevelName.replace(/"/g, "");
    ctx.fillText(currentLevelName, 5, 55);

    ctx.font = "16px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("By " + currentLevelAuthor, 5, 75);

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + player.score, 400, 30);
}

function drawBackground(color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
}

function createDebugScreen() {
    drawBackground("orange");

    if (!changedValues) {
        player.x = 100;
        player.y = 150;

        cubetop.x = 50;
        cubetop.y = 150;

        cubie.x = 150;
        cubie.y = 150;

        maxcubetop.x = 200;
        maxcubetop.y = 150;

        cubeBrute.x = 300;
        cubeBrute.y = 150;

        changedValues = true;
    }

    createCubeDood(player);
    createCubeTop(cubetop);
    createCubeBrute(cubeBrute);
    createCubie(cubie);
    createMaxCubeTop(maxcubetop);
}

function resetEditorLevel() {
    for (var i = 0; i < editorLevel.length; i++) {
        for (var j = 0; j < editorLevel[i].length; j++) {
            editorLevel[i][j] = 0;
        }
    }   
}

function drawLevel(level) {
    drawBackground("orange");

    for (var y = 0; y < level.length; y++) {
        for (var x = 0; x < level[y].length; x++) {
            switch (level[y][x]) {
                case 1:
                    drawBlock(x * 32, y * 32, 32, 32, "black");
                    break;
                case 2:
                    ctx.drawImage(goalFlag, x * 32, y * 32, 32, 32);
                    break;
                case 3:
                    drawBlock(x * 32, y * 32, 32, 32, "yellow");
                    break;
                case 4:
                    drawBlock(x * 32, y * 32, 32, 32, "red");
                    break;
                case 5:
                    drawStartPos(x, y);
                    break;
            }
        }
    }

    drawLevelText();

    collisionCheck(level);
}

function collisionCheck(level) {
    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            var x = j * 32;
            var y = i * 32;
            var tile = {
                x: x,
                y: y,
                w: 32,
                h: 32
            }
            var collision = player.x < x + tile.w && player.x + player.w > x && player.y < y + tile.h && player.y + player.h > y;
            if (!collision) continue;
            switch (level[i][j]) {
                case 0:
                    break;
                case 1:
                    var side = collisionSide(player, tile);
                    switch (side) {
                        case "bottom":
                            player.y = tile.y + tile.h;
                            player.velY = 0;
                            break;
                        case "top":
                            player.grounded = true;
                            player.jumping = false;
                            player.y = tile.y - player.h;
                            player.velY = 0;
                            if (player.direction == "upr") {
                                player.direction = "right";
                            } else if (player.direction == "upl") {
                                player.direction = "left";
                            }
                            break;
                        case "left":
                            player.x = tile.x - player.w;
                            break;
                        case "right":
                            player.x = tile.x + tile.w;
                            break;
                    }
                    break;
                case 2:
                    if (options.sfx) {
                        winAudio.currentTime = 0;
                        winAudio.play();
                    }
                    if (currentMenuOption == 1) {
                        currentLevel++;
                        levelTranslated = false;
                        checkForMusicSwap();
                    } else {
                        currentLevel = 1;
                        currentMenuOption = 2;
                        alert("Level Completed!");
                        resetAllButtons();
                        resetPlayerPosition();
                        sentInfoNotif = false;
                    }
                    break;
                case 3: 
                    level[i][j] = 0;
                    player.score += 100;
                    break;
                case 4: 
                    resetPlayerPosition();
                    break;
            }
        }
    }
}

function drawEditorLevel(level) {
    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            switch (level[i][j]) {
                case 1:
                    drawBlock(j * 32, i * 32, 32, 32, "black")
                    break;
                case 2: 
                    ctx.drawImage(goalFlag, j * 32, i * 32, 32, 32);
                    break;
                case 3: 
                    drawBlock(j * 32, i * 32, 32, 32, "yellow");
                    break;
                case 4:
                    drawBlock(j * 32, i * 32, 32, 32, "red");
                    break;
                case 5: 
                    drawStartPos(j, i);
                    break;
            }
        }
    }
}

function saveEditorLevel(level) {
    var moreThanOneBlock5 = false;
    var levelString = "";

    currentLevelName = "";
    currentLevelAuthor = "";

    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            if (level[i][j] == 5) {
                if (moreThanOneBlock5) {
                    alert("You can only have one player spawn! (6)");
                    return;
                } else {
                    moreThanOneBlock5 = true;
                }
            } 
            levelString += level[i][j] + ",";
        }
    }

    if (!moreThanOneBlock5) {
        alert("You must have a player spawn! (6)");
        return;
    }
    
    currentLevelName = prompt("Enter level name", "Level Name");
    currentLevelAuthor = prompt("Enter level author", "Level Author");

    if (!currentLevelName || !currentLevelAuthor) {
        alert("You must enter a level name and author!");
        return;
    }

    if (levelString[levelString.length - 1] == ",") {
        levelString = levelString.substring(0, levelString.length - 1);
    }

    levelString = '"' + currentLevelName + "," + currentLevelAuthor + "," + levelString + '"';

    prompt("Here is your level! (CTRL + C to copy.)", levelString);
} 

function translateLevelData(levelData) {
    levelData = levelData.replace(/,/g, " ");

    currentLevelName = levelData.substring(0, levelData.indexOf(" "));
    currentLevelAuthor = levelData.substring(levelData.indexOf(" ") + 1, levelData.indexOf(" ", levelData.indexOf(" ") + 1));

    levelData = levelData.substring(levelData.indexOf(" ", levelData.indexOf(" ") + 1) + 1);

    levelData = levelData.replace(/"/g, "");

    var levelDataArray = levelData.split(" ");
    var levelDataArrayIndex = 0;

    for (var y = 0; y < level.length; y++) {
        for (var x = 0; x < level[y].length; x++) {
            if (levelDataArray[levelDataArrayIndex] == 5) {
                levelStartPost.x = x;
                levelStartPost.y = y;
            }
            if (levelDataArray[levelDataArrayIndex] == undefined) {
                level[y][x] = 0;
            } else {
                level[y][x] = Number(levelDataArray[levelDataArrayIndex]);
            }
            levelDataArrayIndex++;
        }
    }

    player.x = levelStartPost.x * 32;
    player.y = levelStartPost.y * 32;
} 

function drawVersion() {
    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("v" + game.version, 10, 470);
}

function drawStudios() {
    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("CubeDood Studios", 375, 470);
}

function collisionSide(player, tile) {
    var deltaX = player.x + player.w/2 - (tile.x + tile.w/2);
    var deltaY = player.y + player.h/2 - (tile.y + tile.h/2);
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? "right" : "left";
    } else {
        return deltaY > 0 ? "bottom" : "top";
    }
}

function playerController() {
    if (keys[32] || keys[38] || keys[87]) {
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -physics.jump * 2;
            if (player.direction == "right") {
                player.direction = "upr"
            } else if (player.direction == "left") {
                player.direction = "upl"
            }
            if (!soundEffectPlaying && options.sfx) {
                jumpAudio.currentTime = 0;
                jumpAudio.play();
                soundEffectPlaying = true;
                setTimeout(function() {
                    soundEffectPlaying = false;
                }, 250);
            }
        }
    }
    if (keys[39] || keys[68]) {
        if (player.velX < physics.speed) {
            player.velX++;
            if (!player.jumping) {
                player.direction = "right";
            } else {
                player.direction = "upr";
            }
        }
    }
    if (keys[37] || keys[65]) {
        if (player.velX > -physics.speed) {
            player.velX--;
            if (!player.jumping) {
                player.direction = "left";
            } else {
                player.direction = "upl";
            }
        }
    }
    if (keys[16]) {
        physics.speed = 5;
    } else if (keys[17]) {
        physics.speed = 1;
    } else {
        physics.speed = 3;
    }
    if (keys[82]) {
        if (!cannotPress) {
            cannotPress = true;
            setTimeout(function() {
                cannotPress = false;
            }, 1000);
            resetPlayerPosition();
        }
    }

    if (player.y < canvas.height - player.h) {
        player.jumping = true;
    }

    player.velX *= physics.friction;
    player.velY += physics.gravity;

    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= canvas.width - player.w) {
        player.x = canvas.width - player.w;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= canvas.height - player.h) {
        player.y = canvas.height - player.h;
        player.jumping = false;
        player.grounded = true;
        if (player.direction == "upr") {
            player.direction = "right";
        } else if (player.direction == "upl") {
            player.direction = "left";
        }
    }
    if (player.y <= 0) {
        player.y = 1;
    }

    if (keys[27]) {
        if (currentMenuOption == 7) {
            if (!cannotPress) {
                cannotPress = true;
                currentMenuOption = 2;
                currentEditorMenuOption = 0;
                sentInfoNotif = false;
                setTimeout(function() {
                    cannotPress = false;
                    keys[27] = false;
                }, 250);
        }
        }
    }

    createCubeDood(player);
} 

function resetPlayerPosition() {
    player.x = levelStartPost.x * 32;
    player.y = levelStartPost.y * 32;
    player.velX = 0;
    player.velY = 0;
    player.direction = "right";
    player.grounded = true;
    player.jumping = false;
}

function muteAllMusic() {
    menuAudio.pause();
    menuAudio.currentTime = 0;
    settingsAudio.pause();
    settingsAudio.currentTime = 0;
    editorAudio.pause();
    editorAudio.currentTime = 0;
    cubetopTheme.pause();
    cubetopTheme.currentTime = 0;
    boltTheme.pause();
    boltTheme.currentTime = 0;
}

function unmuteAllMusic() {
    if (!options.music) return;

    switch (currentMenuOption) {
        case 0:
            menuAudio.play();
            break;
        case 2:
            editorAudio.play();
            break;
        case 3:
            settingsAudio.play();
            break;
    }
}

function refreshMusic() {
    muteAllMusic();
    unmuteAllMusic();
}

function titleScreenControls() {
    if (keys[40] && !cannotPress) {
                if (currentMainMenuOption < 3) {
                    currentMainMenuOption++;
                } else {
                    currentMainMenuOption = 0;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[40] = false;
                }, 100);
            }
            if (keys[38] && !cannotPress) {
                if (currentMainMenuOption > 0) {
                    currentMainMenuOption--;
                } else {
                    currentMainMenuOption = 3;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[38] = false;
                }, 100);
            }
            if (keys[13]) {
                switch (currentMainMenuOption) {
                    case 0:
                        currentMenuOption = 1;
                        inGame = true;
                        currentMainMenuOption = 0;
                        break;
                    case 1:
                        currentMenuOption = 2;
                        currentMainMenuOption = 0;
                        break;
                    case 2:
                        currentMenuOption = 3;
                        currentMainMenuOption = 0;
                        break;
                    case 3:
                        currentMenuOption = 4;
                        currentMainMenuOption = 0;
                        break;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[13] = false;
                }, 250);
                if (currentMenuOption != 4) {
                    audioPlaying = false;
                    menuAudio.pause();
                }
            }
}

function checkForMusicSwap() {
    if (options.music) {
        if (currentLevel == 1) {
            muteAllMusic();
            boltTheme.currentTime = 0;
            boltTheme.play();
        } else if (currentLevel == 11)  {
            muteAllMusic();
            cubetopTheme.currentTime = 0;
            cubetopTheme.play();
        } else if (currentLevel == 21) {
            muteAllMusic();
            settingsAudio.currentTime = 0;
            settingsAudio.play();
        }
    }
}

function editorMenuControls() {
    if (keys[40] && !cannotPress) {
                if (currentEditorMenuOption < 3) {
                    currentEditorMenuOption++;
                } else {
                    currentEditorMenuOption = 0;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[40] = false;
                }, 100);
            }
            if (keys[38] && !cannotPress) {
                if (currentEditorMenuOption > 0) {
                    currentEditorMenuOption--;
                } else {
                    currentEditorMenuOption = 3;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[38] = false;
                }, 100);
            }
            if (keys[13] && !cannotPress) {
                switch (currentEditorMenuOption) {
                    case 0:
                        currentMenuOption = 6;
                        createEditScreen();
                        cannotPress = true;
                        break;
                    case 1:
                        currentMenuOption = 7;
                        cannotPress = true;
                        break;
                    case 2:
                        window.open("https://forms.gle/5pvuPEWe2GdpaCsJA", "_blank");
                        cannotPress = true;
                        break;
                    case 3:
                        cannotPress = true;
                        break;
                }
                setTimeout(function() {
                    cannotPress = false;
                    keys[13] = false;
                    if (currentEditorMenuOption == 3) {
                        currentMenuOption = 0;
                        currentEditorMenuOption = 0;
                        editorAudio.pause();
                        audioPlaying = false;
                    }
                }, 100);
            }
}

function settingsMenuControls() {
    if (keys[40] && !cannotPress) {
                if (currentSettingsMenuOption < 3) {
                    currentSettingsMenuOption++;
                } else {
                    currentSettingsMenuOption = 0;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[40] = false;
                }, 100);
            }
            if (keys[38] && !cannotPress) {
                if (currentSettingsMenuOption > 0) {
                    currentSettingsMenuOption--;
                } else {
                    currentSettingsMenuOption = 3;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[38] = false;
                }, 100);
            }
            if (keys[13] && !cannotPress) {
                switch (currentSettingsMenuOption) {
                    case 0:
                        if (options.sfx) {
                            options.sfx = false;
                        } else {
                            options.sfx = true;
                        }
                        cannotPress = true;
                        break;
                    case 1:
                        if (options.music) {
                            options.music = false;
                            muteAllMusic();
                        } else {
                            options.music = true;
                            unmuteAllMusic();
                        }
                        cannotPress = true;
                        break;
                    case 2:
                        if (options.fullscreen) {
                            options.fullscreen = false;
                        } else {
                            options.fullscreen = true;
                        }
                        cannotPress = true;
                        break;
                    case 3:
                        cannotPress = true;
                        break;
                }
                setTimeout(function() {
                    cannotPress = false;
                    keys[13] = false;
                    if (currentSettingsMenuOption == 3) {
                        currentMenuOption = 0;
                        currentSettingsMenuOption = 0;
                        settingsAudio.pause();
                        audioPlaying = false;
                    }
                }, 100);
            }
}

function startScreenControls() {
    if (keys[32]) {
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[32] = false;
                }, 100);
                currentMenuOption = 0;
            }
}

function editorControls() {
    if (keys[37] && !cannotPress) {
                if (currentGridPosition.x > 0) {
                    currentGridPosition.x--;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[37] = false;
                }, 100);
            }
            if (keys[39] && !cannotPress) {
                if (currentGridPosition.x < 15) {
                    currentGridPosition.x++;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[39] = false;
                }, 100);
            }
            if (keys[38] && !cannotPress) {
                if (currentGridPosition.y > 0) {
                    currentGridPosition.y--;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[38] = false;
                }, 100);
            }
            if (keys[40] && !cannotPress) {
                if (currentGridPosition.y < 14) {
                    currentGridPosition.y++;
                }
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[40] = false;
                }, 100);
            }
            if (keys[32] && !cannotPress) {
                pressSpaceToOpenMenu = true;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[32] = false;
                }, 100);
                if (menuShowing) {
                    menuShowing = false;
                } else {
                    menuShowing = true;
                }
            }
            if (keys[69] && !cannotPress) {
                editorLevel[currentGridPosition.y][currentGridPosition.x] = editor.currentHeldBlock;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[69] = false;
                }, 100);
            }
            if (keys[49] && !cannotPress) {
                editor.currentHeldBlock = 0;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[49] = false;
                }, 100);
            }
            if (keys[50] && !cannotPress) {
                editor.currentHeldBlock = 1;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[50] = false;
                }, 100);
            }
            if (keys[51] && !cannotPress) {
                editor.currentHeldBlock = 2;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[51] = false;
                }, 100);
            }
            if (keys[52] && !cannotPress) {
                editor.currentHeldBlock = 3;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[52] = false;
                }, 100);
            }
            if (keys[53] && !cannotPress) {
                editor.currentHeldBlock = 4;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[53] = false;
                }, 100);
            }
            if (keys[54] && !cannotPress) {
                editor.currentHeldBlock = 5;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[54] = false;
                }, 100);
            }
            if (keys[82] && !cannotPress) {
                resetEditorLevel();
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[82] = false;
                }, 100);
            }
            if (keys[83] && !cannotPress) {
                saveEditorLevel(editorLevel);
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[83] = false;
                }, 100);
            }
            if (keys[27] && !cannotPress) {
                pressSpaceToOpenMenu = false;
                currentMenuOption = 2;
                cannotPress = true;
                setTimeout(function() {
                    cannotPress = false;
                    keys[27] = false;
                }, 100);
                if (menuShowing) {
                    menuShowing = false;
                } else {
                    menuShowing = true;
                }
            }
}

function resetAllButtons() {
    keys[37] = false;
    keys[38] = false;
    keys[39] = false;
    keys[40] = false;
    keys[65] = false;
    keys[68] = false;
    keys[83] = false;
    keys[87] = false;
    keys[32] = false;
    keys[16] = false;
    keys[17] = false;
}

function onStart() {
    for (var i = 0; i < editorLevel.length; i++) {
        for (var j = 0; j < editorLevel[i].length; j++) {
            editorLevel[i][j] = 0;
        }
    }  
    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            level[i][j] = 0;
        }
    }  

    update();
}

onStart();