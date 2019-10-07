define(['model/item', 'model/attributes', 'util/code-executor'], (Item, Attributes, CodeExecutor) => {
	'use strict';

	class Equipment {
		constructor() {
			this.slots = {
				'helmet': {
					types: [Item.Types.HELMET],
					item: null
				},
				'amulet': {
					types: [Item.Types.AMULET],
					item: null
				},
				'left-hand': {
					types: [Item.Types.ONE_HANDED_WEAPON, Item.Types.TWO_HANDED_WEAPON],
					item: null
				},
				'right-hand': {
					types: [Item.Types.ONE_HANDED_SHIELD],
					item: null
				},
				'chest': {
					types: [Item.Types.CHEST],
					item: null
				},
				'belt': {
					types: [Item.Types.BELT],
					item: null
				},
				'left-ring': {
					types: [Item.Types.RING],
					item: null
				},
				'right-ring': {
					types: [Item.Types.RING],
					item: null
				},
				'gloves': {
					types: [Item.Types.GLOVES],
					item: null
				},
				'boots': {
					types: [Item.Types.BOOTS],
					item: null
				}
			};

			this.attributesStack = new Attributes();
		}

		equip(item, slot) {
			if (this.slots[slot].types.indexOf(item.type) >= 0) {
				this.unequip(slot);

				this.slots[slot].item = item;

				this.dispatchSlotEvent(slot, 'on-equip');
			} else {
				throw 'Cannot equip ' + item.name + ' (' + item.type + ')' + ' in slot ' + slot;
			}
		}

		unequip(slot) {
			if (this.slots[slot].item) {
				this.dispatchSlotEvent(slot, 'auto-on-unequip');
				this.dispatchSlotEvent(slot, 'on-unequip');
			}

			this.slots[slot].item = null;
		}

		dispatchSlotEvent(slot, event) {
			var mods = this.slots[slot].item.mods;

			mods.forEach((mod) => {
				var fn = null;

				if (event === 'auto-on-unequip' && mod.effect['on-equip']) {
					fn = mod.effect['on-equip']
						.replace('pushAttribute', 'popAttribute')
						.replace('pushAllAttributes', 'popAllAttributes')
						.replace('pushSpecialAttribute', 'popSpecialAttribute');
				} else {
					fn = mod.effect[event];
				}

				if (fn) {
					var t = this;

					var executor = new CodeExecutor(fn, {
						'pushAttribute': (name, value) => {
							t.attributesStack.set(name, t.attributesStack.get(name) + value);
						},
						'popAttribute': (name, value) => {
							t.attributesStack.set(name, t.attributesStack.get(name) - value);
						},
						'pushAllAttributes': (value) => {
							for (var i = 0; i < t.attributesStack.array.length; i++) {
								t.attributesStack.array[i] += value;
							}
						},
						'popAllAttributes': (value) => {
							for (var i = 0; i < t.attributesStack.array.length; i++) {
								t.attributesStack.array[i] -= value;
							}
						},
						'pushSpecialAttribute': () => {},
						'popSpecialAttribute': () => {}
					});

					executor.execute({});
				}
			});
		}

		toString() {
			var ret = '';

			var n = (s) => {
				return s == null ? '(none)\n' : s;
			}

			for (var slot in this.slots) {
				ret += slot + ':\n' + n(this.slots[slot].item) + '\n';
			}

			return ret;
		}
	};

	return Equipment;
});
