let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let fontSize = 100;

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Clock(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: 1,
        y: 1
    }
    this.color = `rgb(${randomIntFromRange(0, 255)}, ${randomIntFromRange(0, 255)}, ${randomIntFromRange(0, 255)})`;
}

Clock.prototype.draw = function() {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.myTime, this.x, this.y);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeText(this.myTime, this.x, this.y);
    ctx.shadowColor = '#E3EAEF';
    ctx.shadowBlur = 30;
}

Clock.prototype.update = function() {
    if(this.x + this.velocity.x + (fontSize * 6.75) > canvas.width || this.x + this.velocity.x < 0) {
        this.velocity.x = -this.velocity.x;
        this.color = `rgb(${randomIntFromRange(0, 255)}, ${randomIntFromRange(0, 255)}, ${randomIntFromRange(0, 255)})`
    }
    if(this.y + this.velocity.y > canvas.height || this.y + this.velocity.y - (fontSize*.75) < 0) {
        this.velocity.y = -this.velocity.y;
        this.color = `rgb(${randomIntFromRange(0, 255)}, ${randomIntFromRange(0, 255)}, ${randomIntFromRange(0, 255)})`
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.date = new Date();
    this.hour = this.date.getHours();
    this.min = this.date.getMinutes();
    this.sec = this.date.getSeconds();
    this.midday = "AM";
    this.midday = (this.hour >= 12) ? "PM" : "AM";
    this.hour = (this.hour ==0) ? 12: ((this.hour > 12) ? (this.hour - 12): this.hour);
    this.hour = (this.hour < 10) ? "0" + this.hour : this.hour;
    this.min = (this.min < 10) ? "0" + this.min : this.min;
    this.sec = (this.sec < 10) ? "0" + this.sec : this.sec;
    this.myTime = this.hour + " : " + this.min + " : " + this.sec + " " + this.midday;
    this.draw();
}

let currentTime;

function init() {
    currentTime = new Clock(canvas.width / 2 - fontSize / 2 - (fontSize * 3), canvas.height / 2 - fontSize / 2);
}
function animate() {
    requestAnimationFrame(animate);
    
    ctx.fillStyle = '#171e26'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    currentTime.update();
    
}

init();
animate();