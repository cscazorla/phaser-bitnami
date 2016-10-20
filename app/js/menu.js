var menuState = {
	create: function () {
		//  A simple background for our game
		game.stage.backgroundColor = "#abdaf2";
		var titleLabel = game.add.text(0,0,'My first video game',{font: '50px Verdana',fill:'#281f46',boundsAlignH: "center"});
		titleLabel.setTextBounds(0, 50, game.world.width, 100);

		// The player
		player = game.add.sprite(230, 200, 'dude');
		player.animations.add('move', [0, 1, 2, 3,5,6,7,8], 5, true);
		player.animations.play('move');
		game.add.text(280,205,'Press the Left & Right arrows to move the player',{font: '16px Arial',fill:'#0b1332'});
		game.add.text(280,230,'Press the Up arrow to jump',{font: '16px Arial',fill:'#0b1332'});

		// Bitnami logos
		bitnamiLogo = game.add.sprite(230, 310, 'bitnamiLogo');
		game.add.text(280,318,'Collect these Bitnami logos',{font: '16px Arial',fill:'#0b1332'});

		// The bad guy
		baddie = game.add.sprite(230, 410, 'baddie');
		baddie.animations.add('move', [0, 1, 2, 3], 5, true);
		baddie.animations.play('move');
		game.add.text(280,420,'This is the bad guy. Do not let him to grab you!',{font: '16px Arial',fill:'#0b1332'});

		// Press key to start label
		var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, game.world.height-80, 800, 50);
		var startLabel = game.add.text(0,0,'Press the "S" key to start',{font: '22px Arial',fill:'#fff',boundsAlignH: "center"});
		startLabel.setTextBounds(0, game.world.height-70, game.world.width, 100);

		// Keyboard event for beginning the game
		var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		sKey.onDown.addOnce(this.start,this);
	},
	start: function() {
		game.state.start('play');
	}
}
