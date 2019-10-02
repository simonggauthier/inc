define(['util/random', 'model/game-data', 'model/item', 'model/item-mod'], (Random, GameData, Item, ItemMod) => {
	'use strict';

	/**
	 * Find a slice corresponding to number cur
	 * Ex: cur is between slice.min and slice.max
	 */
	var findSlice = (slices, cur) => {
		return slices.filter(slice => cur >= slice.min && cur <= slice.max)[0];
	};

	/**
	 * Find a unique item for current item specs. If no unique is found, return null
	 */
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

	/**
	 * Find a mod by name
	 */
	var findMod = (modName) => {
		for (var i = 0; i < GameData.itemGeneration.mods.list.length; i++) {
			if (GameData.itemGeneration.mods.list[i].name === modName) {
				return GameData.itemGeneration.mods.list[i];
			}
		}

		return null;
	};

	/**
	 * Create a unique item
	 */
	var transformToUnique = function(item, unique) {
		item.name = unique.name;
		item.level = unique.minLevel;
		item.armorStats = unique.armorStats;
		item.weaponStats = unique.weaponStats;

		if (unique.modNames) {
			unique.modNames.forEach((modName) => {
				item.mods.push(new ItemMod(findMod(modName)));
			});
		}
	};

	/*
	Item generation steps:
		- Type
		- Class
		- Rarity
		- if subType is weapon
			- Range
			- Damage
		- if subType is armor
			- Armor
		- Mods
		- Name
	*/
	class ItemGenerator {
		constructor(spec) {
			this.spec = spec || {};
		}

		randomItem() {
			return this
				.createItem()
				.rollLevel()
				.rollType()
				.rollItemClass()
				.rollRarity()
				.rollSubTypeStats()
				.rollMods()
				.rollName().item;
		}

		createItem() {
			this.item = new Item();

			return this;
		}

		rollLevel() {
			this.item.level = this.spec.level || Random.between(GameData.itemGeneration.minItemLevel, GameData.itemGeneration.maxItemLevel);

			return this;
		}

		rollType() {
			this.item.type = this.spec.type || Random.pick(Item.Types);

			return this;
		}

		rollItemClass() {
			this.item.itemClass = this.spec.itemClass || Random.pick(Item.Classes);

			return this;
		}

		rollRarity() {
			this.item.rarity = this.spec.rarity || Random.weightedPick(GameData.itemGeneration.rarityWeights);

			if (this.item.rarity === Item.Rarities.UNIQUE) {
				var unique = findUnique(this.item);

				if (unique) {
					transformToUnique(this.item, unique);
				} else {
					this.item.rarity = Item.Rarities.NORMAL;
				}
			}

			return this;
		}

		rollSubTypeStats() {
			if (this.item.subType === Item.SubTypes.WEAPON) {
				return this.rollWeaponStats();
			}

			if (this.item.subType === Item.SubTypes.ARMOR || this.item.subType === Item.SubTypes.SHIELD) {
				return this.rollArmorStats();
			}

			return this;
		}

		rollWeaponStats() {
			if (this.spec.weaponStats) {
				this.item.weaponStats = spec.weaponStats;

				return this;
			}

			if (!this.item.type) {
				throw 'Cannot generate weapon stats on an item with no type';
			}

			if (!this.item.level) {
				throw 'Cannot generate weapon stats on an item with no level';
			}

			var handedMult = this.item.type === Item.Types.TWO_HANDED_WEAPON ? GameData.itemGeneration.weapon.twoHandedMult : 1;
			var minMult = handedMult * GameData.itemGeneration.weapon.minMult;
			var maxMult = handedMult * GameData.itemGeneration.weapon.maxMult;

			var range = Random.pick(Item.Ranges);

			if (range === Item.Ranges.RANGED) {
				minMult *= GameData.itemGeneration.weapon.rangedMult;
				maxMult *= GameData.itemGeneration.weapon.rangedMult;
			}

			var min = Random.between(this.item.level * minMult, this.item.level * maxMult);

			this.item.weaponStats = {
				damage: {
					min: min,
					max: min + Random.between(this.item.level * minMult, this.item.level * maxMult)
				},

				range: range
			};

			return this;
		}

		rollArmorStats() {
			if (this.spec.armorStats) {
				this.item.armorStats = spec.armorStats;

				return this;
			}

			if (!this.item.level) {
				throw 'Cannot generate armor stats on an item with no level';
			}

			var minMult = GameData.itemGeneration.armor.minMult;
			var maxMult = GameData.itemGeneration.armor.maxMult;

			this.item.armorStats = {
				armor: Random.between(this.item.level * minMult, this.item.level * maxMult)
			};

			return this;
		}

		rollMods() {
			if (!this.item.rarity) {
				throw 'Cannot generate mods on an item with no rarity';
			}

			if (!this.item.type) {
				throw 'Cannot generate mods on an item with no type';
			}

			if (!this.item.itemClass) {
				throw 'Cannot generate mods on an item with no itemClass';
			}

			var count = GameData.itemGeneration.rarityModCount[this.item.rarity];

			if (!count) {
				return this;
			}

			var modNames = GameData.itemGeneration.mods.baseTypes[this.item.type];

			if (this.item.subType === Item.SubTypes.WEAPON) {
				modNames = modNames[this.item.weaponStats.range];
			}

			modNames = modNames[this.item.itemClass];

			if (modNames.length === 0) {
				return this;
			}

			var rolledModNames = [];

			for (var i = 0; i < count; i++) {
				var modName = Random.pick(modNames);

				if (rolledModNames.indexOf(modName) < 0) {
					rolledModNames.push(modName);
				}
			}

			var t = this;
			var ret = [];

			rolledModNames.forEach((rolledModName) => {
				t.item.mods.push(new ItemMod(findMod(rolledModName)));
			});

			return this;
		}

		rollName() {
			if (!this.item.type) {
				throw 'Cannot generate name on an item with no type';
			}

			if (!this.item.itemClass) {
				throw 'Cannot generate name on an item with no itemClass';
			}

			if (!this.item.level) {
				throw 'Cannot generate mods on an item with no level';
			}

			var base = GameData.itemGeneration.names.baseTypes[this.item.type];

			if (typeof base !== 'string') {
				if (typeof base[Object.keys(base)[0]] !== 'string') {
					base = base[this.item.weaponStats.range][this.item.itemClass];
				} else {
					base = base[this.item.itemClass];
				}
			}

			// Material
			var materialSlices = GameData.itemGeneration.names.materials[this.item.subType][this.item.itemClass];

			base = findSlice(materialSlices, this.item.level).name + ' ' + base;

			// Prefix / Suffix
			var gotPrefix = false;
			var gotSuffix = false;

			this.item.mods.forEach((mod) => {
				if (mod.type === ItemMod.Types.PREFIX && !gotPrefix) {
					base = mod.name + ' ' + base;
					gotPrefix = true;
				} else if (mod.type === ItemMod.Types.SUFFIX && !gotSuffix) {
					base = base + ' ' + mod.name;
					gotSuffix = true;
				}
			});

			this.item.name = base;

			return this;
		}
	};

	return ItemGenerator;
});
