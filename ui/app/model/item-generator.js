define(['util/random', 'model/game-data', 'model/item', 'model/item-mod'], (Random, GameData, Item, ItemMod) => {
	'use strict';

	// Item generation steps
	// - Type
	// - Class
	// - Rarity
	// | if weapon
	//	- Range
	//	- Damage
	// | if armor
	//	- Armor

	var findSlice = (slices, cur) => {
		return slices.filter(slice => cur >= slice.min && cur <= slice.max)[0];
	};

	var generateType = () => {
		return Random.pick(Item.Types);
	};

	var findUnique = (item) => {
		var uniques = GameData.itemGeneration.uniques.baseTypes[item.type];

		if (uniques) {
			uniques = uniques[item.itemClass];

			if (uniques && uniques.length > 0) {
				uniques = uniques.filter(unique => unique.minLevel <= item.level);

				if (uniques.length > 0) {
					return Random.pick(uniques);
				}
			}
		}

		return null;
	}

	var generateItemClass = () => {
		return Random.pick(Item.Classes);
	};

	var generateRarity = (item) => {
		var ret = Random.weightedPick(GameData.itemGeneration.rarityWeights);

		return ret;
	};

	var generateWeaponStats = (item) => {
		var handedMult = item.type === Item.Types.TWO_HANDED_WEAPON ? GameData.itemGeneration.weapon.twoHandedMult : 1;
		var minMult = handedMult * GameData.itemGeneration.weapon.minMult;
		var maxMult = handedMult * GameData.itemGeneration.weapon.maxMult;

		var range = Random.pick(Item.Ranges);

		if (range === Item.Ranges.RANGED) {
			minMult *= GameData.itemGeneration.weapon.rangedMult;
			maxMult *= GameData.itemGeneration.weapon.rangedMult;
		}

		var min = Random.between(item.level * minMult, item.level * maxMult);

		var ret = {
			damage: {
				min: min,
				max: min + Random.between(item.level * minMult, item.level * maxMult)
			},

			range: range
		};

		return ret;
	};

	var generateArmorStats = (item) => {
		var minMult = GameData.itemGeneration.armor.minMult;
		var maxMult = GameData.itemGeneration.armor.maxMult;

		if (item.itemClass === Item.Classes.Intelligence) {
			minMult *= GameData.itemGeneration.armor.intelligenceMult;
			maxMult *= GameData.itemGeneration.armor.intelligenceMult;
		}

		var ret = {
			armor: Random.between(item.level * minMult, item.level * maxMult)
		};

		return ret;
	};

	var rollMods = (item, count) => {
		var mods = GameData.itemGeneration.mods.baseTypes[item.type];

		if (item.subType === Item.SubTypes.WEAPON) {
			mods = mods[item.weaponStats.range];
		}

		mods = mods[item.itemClass];

		var ret = [];

		if (!mods) {
			log('Cannot roll mods for');
			log(item);

			throw 'Cannot roll mods';
		}

		for (var i = 0; i < count; i++) {
			var mod = Random.pick(mods);
			var loopGuard = 10;

			var dupCheck = false;

			for (var j = 0; j < ret.length; j++) {
				if (ret[j].name === mod.name) {
					dupCheck = true;
					break;
				}
			}

			if (!dupCheck && mod.minLevel <= item.level) {
				ret.push(new ItemMod(mod));
			}
		}

		return ret;
	};

	var generateMods = (item) => {
		if (item.rarity === Item.Rarities.NORMAL) {
			return [];
		}

		switch (item.rarity) {
			case Item.Rarities.NORMAL:
				return [];
			case Item.Rarities.ENCHANTED:
				return rollMods(item, 1);
			case Item.Rarities.LEGENDARY:
				return rollMods(item, 2);
			case Item.Rarities.UNIQUE:
				return [];
		}
	};

	var generateName = (item) => {
		// Base
		var base = GameData.itemGeneration.names.baseTypes[item.type];

		if (typeof base !== 'string') {
			if (typeof base[Object.keys(base)[0]] !== 'string') {
				base = base[item.weaponStats.range][item.itemClass];
			} else {
				base = base[item.itemClass];
			}
		}

		// Material
		var materialSlices = GameData.itemGeneration.names.materials[item.subType][item.itemClass];

		base = findSlice(materialSlices, item.level).name + ' ' + base;

		// Prefix / Suffix
		var gotPrefix = false;
		var gotSuffix = false;

		item.mods.forEach((mod) => {
			if (mod.type === ItemMod.Types.PREFIX && !gotPrefix) {
				base = mod.name + ' ' + base;
				gotPrefix = true;
			} else if (mod.type === ItemMod.Types.SUFFIX && !gotSuffix) {
				base = base + ' of ' + mod.name;
				gotSuffix = true;
			}
		});

		return base;
	};

	var ItemGenerator = {
		createRandomItem: (spec) => {
			var ret = new Item();

			if (!spec) {
				spec = {};
			}

			ret.level = spec.level || Random.between(1, 100);
			ret.type = spec.type || generateType();
			ret.itemClass = spec.itemClass || generateItemClass();
			ret.rarity = spec.rarity || generateRarity(ret);

			if (ret.rarity === Item.Rarities.UNIQUE) {
				var unique = findUnique(ret);

				if (unique) {
					ret.fromUnique(unique);

					return ret;
				} else {
					ret.rarity = Item.Rarities.NORMAL;
				}
			}

			if (ret.subType === Item.SubTypes.WEAPON) {
				ret.weaponStats = spec.weaponStats || generateWeaponStats(ret);
			} else if (ret.subType === Item.SubTypes.ARMOR || ret.subType === Item.SubTypes.SHIELD) {
				ret.armorStats = spec.armorStats || generateArmorStats(ret);
			}

			ret.mods = spec.mods || generateMods(ret);

			try {
				ret.name = spec.name || generateName(ret);
			} catch (e) {
				log('Could not generate name for');
				log(ret);

				throw e;
			}

			return ret;
		}
	};

	return ItemGenerator;
});
