define(() => {
	'use strict';

	class Attributes {
		constructor(initial) {
			if (initial && initial.length >= 5) {
				this.array = initial;
			} else {
				this.array = [0, 0, 0, 0, 0];
			}
		}

		add(attributes) {
			for (var i = 0; i < this.array.length; i++) {
				this.array[i] += attributes.array[i];
			}
		}

		copy() {
			return new Attributes(this.array.slice());
		}

		get strength() {
			return this.array[0];
		}

		set strength(v) {
			this.array[0] = v;
		}

		get dexterity() {
			return this.array[1];
		}

		set dexterity(v) {
			this.array[1] = v;
		}

		get endurance() {
			return this.array[2];
		}

		set endurance(v) {
			this.array[2] = v;
		}

		get intelligence() {
			return this.array[3];
		}

		set intelligence(v) {
			this.array[3] = v;
		}

		get charisma() {
			return this.array[4];
		}

		set charisma(v) {
			this.array[4] = v;
		}
	};

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

	class Character {
		constructor() {
			this.level = 1;
			this.characterClass = null;
			this.attributes = new Attributes();
		}

		assignCharacterClass(characterClass) {
			this.characterClass = characterClass;
			this.attributes = this.characterClass.createStartingAttributes();
		}

		levelUp() {
			this.level++;

			this.attributes.add(this.characterClass.attributes.levelDelta);
		}
	}

	return {
		CharacterClass: CharacterClass,
		Character: Character
	}
});
