define(['model/game-data', 'widgets/character-window', 'widgets/equipment-window'], (GameData, CharacterWindow, EquipmentWindow) => {
	'use strict';

	class Game {
		constructor() {
			this.state = {
				character: null
			};

			this.widgets = {};
		}

		start() {
			var t = this;

			return new Promise((resolve, reject) => {
				GameData.load().then(() => {
					t.createWidgets();

					resolve();
				});
			});
		}

		createWidgets() {
			var t = this;

			this.widgets.characterWindow = new CharacterWindow();

			this.widgets.characterWindow.levelUpListeners.add({
				onLevelUp: () => {
					t.state.character.levelUp();
					t.update();
				}
			});

			this.widgets.equipmentWindow = new EquipmentWindow();
		}

		update() {
			this.widgets.characterWindow.show(this.state.character);
		}
	}

	return Game;
});
