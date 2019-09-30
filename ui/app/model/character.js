define(['model/character-class'], (CharacterClass) => {
	'use strict';

	class Character {
		constructor () {
			this.level = 1;
			this.characterClass = new CharacterClass.classes.Wizard();
			this.attributes = this.characterClass.createStartingAttributes();

			console.log(this.attributes);
		}

		levelUp () {
			this.level++;

			this.attributes.add(this.characterClass.attributesLevelDelta);
		}
	}

	return Character;
});
