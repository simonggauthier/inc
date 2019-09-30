define(['model/character-class'], (CharacterClass) => {
	'use strict';

	class GameData {
		constructor (data) {
			var t = this;

			this.characterClasses = [];

			log('Parsing character classes');

			data.characterClasses.forEach((classData) => {
				var c = new CharacterClass(classData);

				log(c);

				t.characterClasses.push(c);
			});
		}
	};

	return GameData;
});
