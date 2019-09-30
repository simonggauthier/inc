define(['util/http', 'model/game-data', 'widgets/character-window'], (http, GameData, CharacterWindow) => {
	'use strict';
	
	class Game {
		constructor () {
			this.gameData = null;

			this.state = {
				character: null
			};

			this.widgets = {};
		}

		start () {
			var t = this;

			return new Promise((resolve, reject) => {
				t.loadGameData().then(() => {
					t.createWidgets();

					resolve();
				});
			});
		}

		loadGameData () {
			var t = this;

			log('Loading game data');

			var ret = new Promise((resolve, reject) => {
				http.get('/data').then((r) => {
					var data = JSON.parse(r.content);

					t.gameData = new GameData(data);

					log('Game data loaded');

					resolve();
				});
			});

			return ret;
		}

		createWidgets () {
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

		update () {
			log('Updating game');

			this.widgets.characterWindow.show(this.state.character);
		}
	}

	return Game;
});
