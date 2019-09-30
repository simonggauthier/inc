requirejs(['game', 'simulation'], (Game, Simulation) => {
	'use strict';

	var game = new Game();

	game.start().then(function () {
		new Simulation(game).start();
	});

	window.game = game;
});
