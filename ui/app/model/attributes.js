define(() => {
	'use strict';

	class Attributes {
		constructor(initial) {
			this.names = ['strength', 'dexterity', 'endurance', 'intelligence', 'charisma'];

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

		set(name, value) {
			this.array[this.names.indexOf(name)] = value;
		}

		get(name, value) {
			return this.array[this.names.indexOf(name)];
		}

		toString() {
			var ret = '';
			var t = this;

			this.names.forEach((name) => {
				ret += name + ': ' + t.array[t.names.indexOf(name)] + '\n';
			});

			return ret;
		}
	};

	return Attributes;
});
