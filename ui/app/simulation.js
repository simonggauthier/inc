define(['model/character'], (Character) => {
	'use strict';

	class Simulation {
		constructor (game) {
			this.game = game;
		}

		start () {
			// Create a character
			this.game.state.character = new Character();
			this.game.state.character.assignCharacterClass(this.game.gameData.characterClasses[0]);

			this.game.update();
		}
	};

	return Simulation;
});
