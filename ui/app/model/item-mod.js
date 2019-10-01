define(['util/random'], (Random) => {
	class ItemMod {
		constructor(data) {
			this.type = data.type || ItemMod.Types.PREFIX;
			this.name = data.name;
			this.minLevel = data.minLevel || 1;
			this.effect = {
				description: data.effect.description,
				values: [],
				script: data.effect.script
			};

			for (var k in data.effect.values) {
				this.effect.values.push(data.effect.values[k]);
			}

			this.render();
		}

		render() {
			var realValues = [];

			for (var i = 0; i < this.effect.values.length; i++) {
				if (typeof this.effect.values[i] === 'number' || typeof this.effect.values[i] === 'string') {
					realValues.push(this.effect.values[i]);
				} else {
					realValues.push(Random.between(this.effect.values[i].min, this.effect.values[i].max));
				}

				this.name = this.name.replace('{' + i + '}', realValues[i]);
				this.effect.description = this.effect.description.replace('{' + i + '}', realValues[i]);
				this.effect.script = this.effect.script.replace('{' + i + '}', realValues[i]);
			}

			this.effect.values = realValues;

			return this;
		}
	}

	ItemMod.Types = {
		PREFIX: 'prefix',
		SUFFIX: 'suffix'
	};

	return ItemMod;
});
