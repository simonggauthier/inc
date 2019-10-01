define(['model/game-data', 'widgets/character-window'], (GameData, CharacterWindow) => {
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
			log('Creating widgets');

			var t = this;

			this.widgets.characterWindow = new CharacterWindow();

			this.widgets.characterWindow.levelUpListeners.add({
				onLevelUp: () => {
					t.state.character.levelUp();
					t.update();
				}
			});
		}

		update() {
			log('Updating game');

			this.widgets.characterWindow.show(this.state.character);
		}
	}

	return Game;
});
