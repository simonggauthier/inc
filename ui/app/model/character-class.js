define(['model/attributes'], (Attributes) => {
	'use strict';
	
	class CharacterClass {
		constructor (title) {
			this.title = title;
		}

		createStartingAttributes () {
			return new Attributes();
		}
	};

	class Wizard extends CharacterClass {
		constructor () {
			super('Wizard');

			this.startingAttributes = new Attributes([1, 1, 1, 3, 2]);
			this.attributesLevelDelta = new Attributes([0, 0, 1, 2, 0]);
		}

		createStartingAttributes () {
			return new Attributes(this.startingAttributes.array.slice());
		}
	}

	return {
		classes: {
			Wizard: Wizard
		}
	}
});
