function init() {}

function preload() {
    game.load.audio('sfx:coin', 'audio/coin.wav')
    game.load.image('hero', 'images/goku(5).png');
    game.load.image('background', 'images/background.png');
    game.load.json('level:1', 'data/level01.json');
    game.load.image('ground', 'images/ground.png');
    game.load.image('grass:4x1', 'images/grass_4x1.png');
    game.load.image('grass:2x1', 'images/grass_2x1.png');
    game.load.image('grass:1x1', 'images/grass_1x1.png');
    game.load.image('grass:8x1', 'images/grass_8x1.png');
    game.load.image('grass:6x1', 'images/grass_6x1.png');
    game.load.audio('sfx:jump', 'audio/jump.wav');
    game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
}

function create() {
    sfx:coin = game.add.audio('sfxcoin');
    sfxJump = game.add.audio('sfx:jump');
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){
        jump();
    })
    game.add.image(0, 0, 'background');
    loadLevel(this.game.cache.getJSON('level:1'));
}

function jump(){
    var canJump = hero.body.touching.down;
    if (canJump) {
        hero.body.velocity.y = -600;
        sfxJump.play();
    }
    return canJump;
}

function update() {
    handleCollisions();
    handleInput();
}

function loadLevel(data) {
    coins = game.add.group();
    platforms = game.add.group();
    game.physics.arcade.gravity.y = 1200;
    console.log(data);
    data.platforms.forEach(spawnPlatform, this);
    spawnCharacters({
        hero: data.hero
    });
}

function spawnPlatform(platform) {
    game.add.sprite(platform.x, platform.y, platform.image);
    var sprite = platforms.create(platform.x, platform.y, platform.image);
    game.physics.enable(sprite);
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;
}

function spawnCharacters(data) {
    hero = game.add.sprite(data.hero.x, data.hero.y, 'hero');
    hero.anchor.set(0.5, 0.7);
    game.physics.enable(hero);
    hero.body.collideWorldBounds = true;
}

function spawnCoin(coin) {
    data.coins.forEach(spawnCoin, this);
    var sprite = coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true);
    sprite.animations.play('rotate');
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
};

function move(direction){
    hero.body.velocity.x = direction * 200;
    if (hero.body.velocity.x < 0) {
        hero.scale.x = -1;
    }
    else if (hero.body.velocity.x > 0) {
        hero.scale.x = 1;
    }
}



function handleInput() {
    if (leftKey.isDown) {
        move(-1);
    }
     else if (rightKey.isDown) {
        move(1);
    }
     else {
        move(0);
    }
}
function handleCollisions(){
   game.physics.arcade.collide(hero, platforms);
   game.physics.arcade.overlap(hero, coins, onHeroVsCoin, null, this);
};
function onHeroVsCoin(hero, coin){
    coin.kill();
};
var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game', {init: init,preload: preload,create: create,update: update
});