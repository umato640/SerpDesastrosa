const cfg = {
    puntMida: 10,
    maxRand: 29,
    totsPunts: 900,
    cAmple: 300,
    cAltura: 300,
    RETARD: 140,
    KEYBOARD_KEYS: {
        ESQUERRE: 37,
        DRETA: 39,
        AMUNT: 38,
        AVALL: 40
    }
};

let canvas, ctx, head, poma, ball, punts, pomaX, pomaY;
let esquerreDireccio = false;
let dretaDireccio = true;
let amuntDireccio = false;
let avallDireccio = false;
let inGame = true;   
const x = new Array(cfg.totsPunts);
const y = new Array(cfg.totsPunts);   

function init(){
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image(); 
    ball.src = 'dot.png'; 
    
    poma = new Image();
    poma.src = 'apple.png'; 

    punts = 3; // punts per serp

    for (var z = 0; z < punts; z++) { 
        x[z] = 50 - z * 10; 
        y[z] = 50;
    };
    
    //LOCATE AAPLE START
    locateApple();

    //LOCATE AAPLE END
    setTimeout(gameCycle, cfg.RETARD);

} 

function locateApple(){

    let r = Math.floor(Math.random() * cfg.maxRand);
    pomaX = r * cfg.puntMida;

    r = Math.floor(Math.random() * cfg.maxRand);
    pomaY = r * cfg.puntMida;

};

function checkPoma() {

    if (x[0] == pomaX && y[0] == pomaY) {

        punts++;
        locateApple();

    };
}    

function gameOver() {
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    ctx.fillText(punts - 3 + " punt - " + 'Game over', cfg.cAmple / 2, cfg.cAltura / 2);

}

function checkCollision(){
    for (let z = punts; z > 0; z--) {
        if (z > 4 && x[0] == x[z] && y[0] == y[z]) {
            inGame = false;
        }
    }

    if (y[0] >= cfg.cAltura) {
        inGame = false;
    }

    if (y[0] < 0) {
        inGame = false;
    }

    if (x[0] >= cfg.cAmple) {
        inGame = false;
    }

    if (x[0] < 0) {
        inGame = false;
    }
}

function move(){

    for (let z = punts; z > 0; z--) {
        x[z] = x[z - 1];
        y[z] = y[z - 1];
    }

    if (esquerreDireccio) {
        x[0] -= cfg.puntMida;
    }

    if (dretaDireccio) {
        x[0] += cfg.puntMida;
    }

    if (amuntDireccio) {
        y[0] -= cfg.puntMida;
    }

    if (avallDireccio) {
        y[0] += cfg.puntMida;
    }

}

function doDrawing(){

    ctx.clearRect(0, 0, cfg.cAmple, cfg.cAltura);
    
    if (inGame) {

        ctx.drawImage(poma, pomaX, pomaY);

        for (var z = 0; z < punts; z++) {
            
            if (z == 0)
                ctx.drawImage(head, x[z], y[z]);
            else
                ctx.drawImage(ball, x[z], y[z]);
        }    
    } else {

        gameOver();
    }

}

function gameCycle() {
    
    if (inGame) {

        checkPoma();
        // CHECK COLLISION
        checkCollision();
        // MOVE
        move();
        // DO DRAWING
        doDrawing();

        setTimeout(gameCycle, cfg.RETARD);
    }
}

onkeydown = function(e) {
    
    if(e.keyCode == 8) return
    let key = e.keyCode;
    
    if (key == cfg.KEYBOARD_KEYS.ESQUERRE && !dretaDireccio) {
        
        esquerreDireccio = true;
        amuntDireccio = false;
        avallDireccio = false;

    }

    if (key == cfg.KEYBOARD_KEYS.DRETA && !esquerreDireccio) {
        
        dretaDireccio = true;
        amuntDireccio = false;
        avallDireccio = false;

    }

    if (key == cfg.KEYBOARD_KEYS.AMUNT && !avallDireccio) {
        
        amuntDireccio = true;
        dretaDireccio = false;
        esquerreDireccio = false;
    }

    if (key == cfg.KEYBOARD_KEYS.AVALL && !amuntDireccio) {
        
        avallDireccio = true;
        dretaDireccio = false;
        esquerreDireccio = false;

    } 
    
    return;

};  