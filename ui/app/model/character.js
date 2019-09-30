define(['model/character-class', 'model/attributes'], (CharacterClass, Attributes) => {
	'use strict';

	class Character {
		constructor () {
			this.level = 1;
			this.characterClass = null;
			this.attributes = new Attributes();
		}

		assignCharacterClass (characterClass) {
			this.characterClass = characterClass;
			this.attributes = this.characterClass.createStartingAttributes();
		}

		levelUp () {
			this.level++;

			this.attributes.add(this.characterClass.attributes.levelDelta);
		}
	}

	return Character;
});
