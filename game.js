//Required global variables

let background, balloon, platform, score, scoreText, scoreTextStyle;

//Preload the image assets

function preload(){
	this.load.image("background", "assets/background.png");

	this.load.image("balloon", "assets/balloon.png");

	this.load.image("platform", "assets/platform.png");
}

//Main game logic function

function create(){
	//Add the background

	background = this.add.image(200, 300, "background");

	//Add the balloon with physics properties

	balloon = this.physics.add.image(200, 100, "balloon");

	balloon.setGravityY(300);

	balloon.setBounce(0.5);

	balloon.setInteractive();

	//Make the balloon jump when clicked or touched

	balloon.on("pointerdown", function(){
		balloon.setVelocityY(Phaser.Math.Between(-200, -300));

		score += 1;

		scoreText.setText(score);
	});

	//Add the platform as a static or immovable physics body

	platform = this.physics.add.staticImage(200, 500, "platform");

	//Add collision between the balloon and the platform

	this.physics.add.collider(balloon, platform, null, function(){
		score = 0;

		scoreText.setText(score);
	});

	//Add score feature

	score = 0;

	scoreText = this.add.text(30, 10, score);

	scoreTextStyle = {
		fontFamily: "Verdana",
		fontSize: "40px"
	}

	scoreText.setStyle(scoreTextStyle);
}

//Create the game object

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 400,
	height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: {
		preload: preload,
		create: create
	},
	physics: {
		default: "arcade",
		arcade:	{
			debug: false
		}
	}
});