define(['model/character', 'model/game-data', 'model/item', 'model/item-generator'], (Character, GameData, Item, ItemGenerator) => {
	'use strict';

	class Simulation {
		constructor(game) {
			this.game = game;
		}

		start() {
			// Create a character
			this.game.state.character = new Character();
			this.game.state.character.assignCharacterClass(GameData.characterClasses[0]);

			this.game.update();

			window.ItemGenerator = ItemGenerator;

			for (var i = 0; i < 100; i++) {
				var item = ItemGenerator.createRandomItem();

				log(item.toString() + '\n');
			}
		}
	};

	return Simulation;
});
