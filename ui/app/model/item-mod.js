define(['util/random'], (Random) => {
	class ItemMod {
		constructor(data) {
			this.type = data.type || ItemMod.Types.PREFIX;
			this.name = data.name;
			this.minLevel = data.minLevel || 1;
			this.effect = {
				description: data.effect.description,
				values: [],
				'on-equip': data.effect['on-equip']
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
					var value = Random.between(this.effect.values[i].min, this.effect.values[i].max);

					realValues.push(value);
				}

				this.name = this.name.replace('{' + i + '}', realValues[i]);
				this.effect.description = this.effect.description.replace('{' + i + '}', realValues[i]);

				this.renderEffectEvent('on-equip', i, realValues[i]);
			}

			this.effect.values = realValues;

			return this;
		}

		renderEffectEvent(event, i, value) {
			if (!this.effect[event]) {
				throw 'Mod ' + this.name + ' does not implement ' + event;
			}

			this.effect[event] = this.effect[event].replace('{' + i + '}', value);
		}
	}

	ItemMod.Types = {
		PREFIX: 'prefix',
		SUFFIX: 'suffix'
	};

	return ItemMod;
});
