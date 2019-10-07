define(['model/attributes', 'model/character-class', 'model/equipment'], (Attributes, CharacterClass, Equipment) => {
	'use strict';

	class Character {
		constructor(characterClass) {
			this.level = 1;
			this.characterClass = characterClass;
			this.attributes = this.characterClass.createStartingAttributes();
			this.equipment = new Equipment();
		}

		levelUp() {
			this.level++;

			this.attributes.add(this.characterClass.attributes.levelDelta);
		}

		get calculatedAttributes() {
			var ret = this.attributes.copy();

			ret.add(this.equipment.attributesStack);

			return ret;
		}
	}

	return Character;
});
