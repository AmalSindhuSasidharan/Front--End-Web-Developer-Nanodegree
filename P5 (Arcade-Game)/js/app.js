var points = 0;
var max_speed = 100;
var min_speed = 200;
var health = 3;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = this.fetch_speed();
    this.sprite = 'images/Rock.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (this.x < 500) {
        this.x += this.speed * dt;

    } else {
        this.x = -100;
        this.speed = this.fetch_speed();
    } // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Enemy.prototype.fetch_speed = function() {
    return Math.floor(Math.random() * (max_speed - min_speed + 1) + min_speed);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 430;
};
Player.prototype.update = function() {
    for (var i = 0; i < 4; i++) {
        if ((this.x + 68 > allEnemies[i].x) && (this.x < allEnemies[i].x + 68) && (this.y + 68 > allEnemies[i].y) && (this.y < allEnemies[i].y + 68)) {
            health--;
            document.getElementById("health").innerHTML = health;
            this.reset();
            if (health <= 0) {
                if(points<=5)
				{alert("Boooooo:" + " " + points);
                points = 0;
                health = 3;
                document.getElementById("points").innerHTML = points;
                document.getElementById("health").innerHTML = health;
            	}
				else if(points>6 && points<=15)
					{
						alert("Nice Try:" + " " + points);
                points = 0;
                health = 3;
                document.getElementById("points").innerHTML = points;
                document.getElementById("health").innerHTML = health;
					}
				else{
					alert("Awesome:" + " " + points);
                points = 0;
                health = 3;
                document.getElementById("points").innerHTML = points;
                document.getElementById("health").innerHTML = health;
				}
			}
        }
    }
};

Player.prototype.handleInput = function(key) {
    if (key === 'up') {
        if (this.y > 40)
            this.y -= 100;
        else {

            this.reset();
            points++;
			if(points%10===0)
				{
					health++;
					document.getElementById("health").innerHTML = health;
				}
            document.getElementById("points").innerHTML = points;

        }
    } else if (key === 'down') {
        if (this.y < 430) {
            this.y += 100;
        } else {
            this.reset();
        }
    } else if (key === 'left') {
        if (this.x > 0)
            this.x -= 100;
    } else if (key === 'right') {
        if (this.x < 400)
            this.x += 100;
    }
};

// Now instantiate your objects.
var allEnemies = [
    new Enemy(0, 60),
    new Enemy(0, 60),
    new Enemy(0, 140),
    new Enemy(0, 210)
]; // Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 430);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});