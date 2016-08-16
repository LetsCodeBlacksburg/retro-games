var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

var player = new (function() {

  var x = 0;
  var y = 0; 
  var width = 32; 
  var height = 32; 
  var direction = null;
  var fillStyle = "yellow";

  this.draw = function() {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
  }

  this.act = function() {
    this.draw();
    this.move();
  }

  this.move = function (event) {
    var UP = 40, DOWN = 38, LEFT = 37, RIGHT = 39;

    var keyCode;
    /* check for event first, otherwise direction will never change */
    if (event) { 
      keyCode = event.keyCode;
    }
    else if (direction) { keyCode = direction; }

    var movement = 1;

    if        (keyCode == UP )  {
      y += movement;
      direction = UP;
    } else if (keyCode == DOWN) {
      y -= movement;
      direction = DOWN;
    } else if (keyCode == LEFT) {
      x -= movement;
      direction = LEFT;
    } else if (keyCode == RIGHT) {
      x += movement;
      direction = RIGHT;
    } else { 
      return;
    }
    /* Stop normal actions for movement keys so they don't scroll the browser */
    event && event.preventDefault();
  }

  return this;
})();

document.onkeydown = function (event) {
  player.move(event);
};

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.act();
}

var ThirtyFPSInMilliseconds = 16.67; 
setInterval(function() {
  loop();
}, ThirtyFPSInMilliseconds);
