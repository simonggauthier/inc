define(['util/http', 'model/character'], (Http, Character) => {
	'use strict';

	class GameData {
		constructor(data) {
			var t = this;

			this.characterClasses = [];
			this.itemGeneration = {};
		}

		load() {
			var t = this;

			log('Loading game data');

			var ret = new Promise((resolve, reject) => {
				Http.get('/data').then((r) => {
					var data = JSON.parse(r.content);

					log('Game data loaded');

					t.parse(data);

					resolve();
				});
			});

			return ret;
		}

		parse(gameData) {
			var t = this;

			log('Parsing character classes');

			gameData.characterClasses.forEach((classData) => {
				var c = new Character.CharacterClass(classData);

				t.characterClasses.push(c);
			});

			log('Parsing item generation');

			this.itemGeneration = gameData.itemGeneration;
		}
	};

	var instance = new GameData();

	return instance;
});
