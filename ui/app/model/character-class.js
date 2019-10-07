define(['model/attributes'], (Attributes) => {
	'use strict';

	class CharacterClass {
		constructor(data) {
			this.id = data.id;
			this.title = data.title;

			this.attributes = {};
			this.attributes.starting = new Attributes(data.attributes.starting);
			this.attributes.levelDelta = new Attributes(data.attributes.levelDelta);
		}

		createStartingAttributes() {
			return this.attributes.starting.copy();
		}
	};

	return CharacterClass;
});
