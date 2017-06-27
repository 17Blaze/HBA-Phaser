function init(){
	
}

function preload(){
    game.load.image('hero', 'images/hero_stopped.png');
	game.load.image('background', 'images/background.png'); 
	game.load.json('level:1', 'data/level01.json');
	game.load.image('ground', 'images/ground.png');
    game.load.image('grass:4x1', 'images/grass_4x1.png');
    game.load.image('grass:2x1', 'images/grass_2x1.png');
    game.load.image('grass:1x1', 'images/grass_1x1.png');
    game.load.image('grass:8x1', 'images/grass_8x1.png');
	game.load.image('grass:6x1', 'images/grass_6x1.png');
}

function create(){
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	game.add.image(0, 0, 'background');
	loadLevel(this.game.cache.getJSON('level:1'));
}

function update(){
	handleInput();
}

function loadLevel(data) {
	console.log(data);
	platforms = game.add.group();
	data.platforms.forEach(spawnPlatform, this);
	spawnCharacters({hero: data.hero});
	game.physics.arcade.gravity.y = 0;
}
function spawnPlatform(platform) {
    game.add.sprite(platform.x, platform.y, platform.image);
};

function spawnCharacters (data) {
	hero = game.add.sprite(data.hero.x, data.hero.y, 'hero');
	hero.anchor.set(0.5, 0.5);
	game.physics.enable(hero);
	hero.body.collideWorldBounds = true;
}
function move(direction){
    hero.body.velocity.x = direction * 200;
}
function handleInput(){
    if (leftKey.isDown) { // move hero left
        move(-1);
    }
    else if (rightKey.isDown) {
        move(1);
    }
    else {
    	move(0);
    }
    else if (upKey.isDown) {
    	move()
    }
}

function jump() {
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){
        // ? - Invoke the function 'jump'
    }
}

var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game', {init: init, preload: preload, create: create, update: update});