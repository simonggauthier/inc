define(() => {
	'use strict';

	var Random = {
		id: () => {
			return Math.floor(Math.random() * 10000);
		},

		between: (min, max) => {
			min = Math.floor(min);
			max = Math.floor(max);

			return Math.floor(Math.random() * max) + min;
		},

		pick: (o) => {
			if (Array.isArray(o)) {
				return o[Random.between(0, o.length)];
			}

			var keys = Object.keys(o);

			return o[keys[Random.between(0, keys.length)]];
		},

		weightedPick: (o) => {
			var r = Math.random();

			for (var k in o) {
				if (o[k] > r) {
					return k;
				}
			}

			return null;
		}
	};

	return Random;
});
