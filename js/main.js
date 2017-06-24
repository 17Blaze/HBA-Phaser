function init(){
	
}

function preload(){
	game.load.image('background', 'images/background.png');
	game.load.json('Level1', 'data/level01.json');
}

function create(){
	game.add.image(0, 0, 'background');
	loadlevel(this.game.cache.getJSON('Level1'));
}

function update(){

}

function loadlevel(data) {
	console.log(data);
}
ar game = new Phaser.Game(960, 600, Phaser.AUTO, 'game', {init: init, preload: preload, create: create, update: update});