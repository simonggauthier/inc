define(['model/character', 'model/game-data', 'model/item', 'model/item-generator'], (Character, GameData, Item, ItemGenerator) => {
	'use strict';

	class Simulation {
		constructor(game) {
			this.game = game;
		}

		start() {
			// Create a character
			this.game.state.character = new Character(GameData.characterClasses[0]);

			this.game.update();

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.HELMET,
			}).randomItem(), 'helmet');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.AMULET
			}).randomItem(), 'amulet');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.ONE_HANDED_WEAPON
			}).randomItem(), 'left-hand');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.ONE_HANDED_SHIELD
			}).randomItem(), 'right-hand');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.CHEST
			}).randomItem(), 'chest');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.BELT
			}).randomItem(), 'belt');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.RING
			}).randomItem(), 'left-ring');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.RING
			}).randomItem(), 'right-ring');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.GLOVES
			}).randomItem(), 'gloves');

			this.game.state.character.equipment.equip(new ItemGenerator({
				type: Item.Types.BOOTS
			}).randomItem(), 'boots');

			this.game.update();
		}
	};

	return Simulation;
});
