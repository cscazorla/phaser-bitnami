var bootState = {
	preload: function () {
		// We show a loading label
		var loadingLabel = game.add.text(80,80,'Loading ...',{font: '30px Arial',fill:'#ffffff'});

		// Asset loading
		game.load.image('ground', 'assets/platform.png');
		game.load.image('bitnamiLogo', 'assets/bitnami-logo.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	},
	create: function() {
		//  We're going to be using physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('menu');
	}
}
