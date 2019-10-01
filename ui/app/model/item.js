define(['util/random', 'model/item-mod'], (Random, ItemMod) => {
	'use strict';

	var itemId = 1;

	class Item {
		constructor() {
			this.id = itemId++;
			this.name = '';
			this.type = null;
			this.level = 0;
			this.itemClass = null;
			this.rarity = Item.Rarities.NORMAL;
			this.mods = [];
			this.armorStats = null;
			this.weaponStats = null;
		}

		fromUnique(unique) {
			this.name = unique.name;
			this.level = unique.minLevel;
			this.armorStats = unique.armorStats;
			this.weaponStats = unique.weaponStats;

			if (unique.mods) {
				var t = this;

				unique.mods.forEach((mod) => {
					t.mods.push(new ItemMod(mod));
				});
			}
		}

		get subType() {
			switch (this.type) {
				case Item.Types.AMULET:
				case Item.Types.RING:
					return Item.SubTypes.JEWELLERY;
				case Item.Types.ONE_HANDED_WEAPON:
				case Item.Types.TWO_HANDED_WEAPON:
					return Item.SubTypes.WEAPON;
				case Item.Types.ONE_HANDED_SHIELD:
					return Item.SubTypes.SHIELD;
				default:
					return Item.SubTypes.ARMOR;
			}
		}
	};

	Item.Types = {
		HELMET: 'helmet',
		AMULET: 'amulet',
		ONE_HANDED_WEAPON: 'one-handed-weapon',
		ONE_HANDED_SHIELD: 'one-handed-shield',
		TWO_HANDED_WEAPON: 'two-handed-weapon',
		CHEST: 'chest',
		BELT: 'belt',
		RING: 'ring',
		GLOVES: 'gloves',
		BOOTS: 'boots'
	};

	Item.SubTypes = {
		WEAPON: 'weapon',
		ARMOR: 'armor',
		JEWELLERY: 'jewellery',
		SHIELD: 'shield'
	};

	Item.Classes = {
		INTELLIGENCE: 'intelligence',
		STRENGTH: 'strength'
	};

	Item.Rarities = {
		NORMAL: 'normal',
		ENCHANTED: 'enchanted',
		LEGENDARY: 'legendary',
		UNIQUE: 'unique'
	};

	Item.Ranges = {
		MELEE: 'melee',
		RANGED: 'ranged'
	};

	return Item;
});
