var playState = {
	create: function () {
		//  The platforms group contains the ground and the 2 ledges we can jump on
		platforms = game.add.group();

		//  We will enable physics for any object that is created in this group
		platforms.enableBody = true;

		// Here we create the ground.
		var ground = platforms.create(0, game.world.height - 64, 'ground');

		//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
		ground.scale.setTo(2, 2);

		//  This stops it from falling away when you jump on it
		ground.body.immovable = true;

		//  Now let's create two ledges
		var ledge = platforms.create(400, 400, 'ground');
		ledge.body.immovable = true;
		ledge.scale.setTo(0.5,1);
		ledge = platforms.create(-150, 300, 'ground');
		ledge.body.immovable = true;

		// Setup the player & baddie and their settings
		this.setup_player();
		this.setup_baddie();

		// Put bitnami logos in place
		this.setup_bitnamiLogos();

		//  Set the score
		scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

		//  Our controls.
		cursors = game.input.keyboard.createCursorKeys();
	},
	// This function is called at every frame
	update: function () {
		//  Collide the player, baddie and the stars with the platforms
		game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(baddie, platforms);
		game.physics.arcade.collide(bitnamiLogos, platforms);

		//  Checks to see if the player overlaps with any of the stars
		game.physics.arcade.overlap(player, bitnamiLogos, this.collectBitnamiLogo, null, this);

		// When the baddie catches the player...
		game.physics.arcade.overlap(player, baddie, this.baddie_catches_player, null, this);

		// Control player and baddie moves
		this.player_moves();
		this.baddie_moves();
	},
	setup_player: function () {
		player = game.add.sprite(32, game.world.height - 150, 'dude');
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
	},
	setup_baddie: function () {
		baddie = game.add.sprite(game.world.height - 40, 20, 'baddie');
		game.physics.arcade.enable(baddie);
		baddie.body.bounce.y = 0.2;
		baddie.body.gravity.y = 300;
		baddie.body.collideWorldBounds = true;
		baddie.animations.add('left', [0, 1], 10, true);
		baddie.animations.add('right', [2, 3], 10, true);
	},
	setup_bitnamiLogos: function() {
		bitnamiLogos = game.add.group();
		bitnamiLogos.enableBody = true;

		//  Here we'll create 8 bitnami logos evenly spaced apart
		for (var i = 0; i < 8; i++)
		{
			//  Create a bitnami logo inside of the 'bitnamiLogos' group
			var bitnamiLogo = bitnamiLogos.create(i * 100, 0, 'bitnamiLogo');

			//  Let gravity do its thing
			bitnamiLogo.body.gravity.y = 300;

			//  This just gives each logo a slightly random bounce value
			bitnamiLogo.body.bounce.y = 0.2 + Math.random() * 0.2;
		}
	},
	player_moves: function() {
		//  Reset the players velocity (movement)
		player.body.velocity.x = 0;

		if (cursors.left.isDown)
		{
			//  Move to the left
			player.body.velocity.x = -150;
			player.animations.play('left');
		}
		else if (cursors.right.isDown)
		{
			//  Move to the right
			player.body.velocity.x = 150;
			player.animations.play('right');
		}
		else
		{
			//  Stand still
			player.animations.stop();
			player.frame = 4;
		}

		//  Allow the player to jump if they are touching the ground.
		if (cursors.up.isDown && player.body.touching.down)
		{
			player.body.velocity.y = -300;
		}
	},
	baddie_moves: function() {
		// The baddie moves if she is touching a surface
		if(baddie.body.touching.down)
		{
			// If she reaches the left/right panel we change the direction (animation)
			if(baddie.body.x == 0)
			{
				baddie_direction = 'right';
				baddie_speed = -baddie_speed;
			}
			if(baddie.body.x == (game.world.width-32))
			{
				baddie_direction = 'left';
				baddie_speed = -baddie_speed;
			}

			// Update baddie animation and direction
			baddie.animations.play(baddie_direction);
			baddie.body.velocity.x = baddie_speed;
		}
	},
	collectBitnamiLogo: function (player, bitnamiLogo) {
		// Removes the star from the screen
		bitnamiLogo.kill();

		//  Add and update the score
		score += 10;
		scoreText.text = 'Score: ' + score;
	},
	baddie_catches_player: function (player, baddie) {
		// Removes the player from the screen
		player.kill();

		// Game over text
		var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 100, 800, 200);
		gameOverText = game.add.text(0, 0, 'Game Over', {font: "bold 32px Arial", boundsAlignH: "center", boundsAlignV: "middle", fill: "#fff"});
		gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
		gameOverText.setTextBounds(0, 100, 800, 100);

		// Play again text
		var playAgainLabel = game.add.text(0,0,'Press the "S" key to play again',{font: '25px Arial',fill:'#ffffff',boundsAlignH:"center"});
		playAgainLabel.setTextBounds(0, 250, game.world.width, 200);

		// Keyboard event for starting the game again
		var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		sKey.onDown.addOnce(this.playAgain,this);
	},
	playAgain: function() {
		game.state.start('play');
	}
}
