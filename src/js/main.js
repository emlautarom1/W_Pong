const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 896;
const HEIGHT = 504;
const PLAYER_W = 20;
const PLAYER_H = HEIGHT / 6;
canvas.width = WIDTH;
canvas.height = HEIGHT;

window.onload = () => {
    hideLoadMessage();
    
    const pong = new Pong(canvas);

    // Input handlers
    canvas.onmousemove = e => {
        const scale = e.offsetY / e.target.getBoundingClientRect().height;
        pong.players[0].pos.y = HEIGHT * scale;
    }

    canvas.onclick = () => {
        pong.start();
    }
}

function hideLoadMessage() {
    document.getElementById("game").style.display = 'flex';
    document.getElementById("loading").style.display = 'none';
}