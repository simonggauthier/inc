define(['util/http', 'model/character-class'], (Http, CharacterClass) => {
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

			gameData.characterClasses.forEach((classData) => {
				var c = new CharacterClass(classData);

				t.characterClasses.push(c);
			});

			this.itemGeneration = gameData.itemGeneration;
		}
	};

	var instance = new GameData();

	return instance;
});
