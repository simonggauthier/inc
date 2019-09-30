define(['util/html', 'util/listener-list', 'widgets/button'], (html, ListenerList, Button) => {
	'use strict';

	class CharacterWindow {
		constructor () {
			this.ui = {};
			this.ui.$window = html.$find('#character .window');
			this.ui.$stats = this.ui.$window.findChild('.stats');
			this.ui.$attributes = this.ui.$stats.findAll('.attributes .attribute');

			this.ui.levelUpButton = new Button(this.ui.$window.findChild('#btn-lvl-up'));

			var t = this;

			this.ui.levelUpButton.clickListeners.add({
				onClick: () => {
					t.levelUpListeners.dispatch('onLevelUp', t);
				}
			});

			this.levelUpListeners = new ListenerList();
		}

		show (character) {
			this.updateStat('level', character.level);
			this.updateStat('class', character.characterClass.title);

			for (var i = 0; i < character.attributes.array.length; i++) {
				this.updateAttribute(i, character.attributes.array[i]);
			}
		}

		updateStat (name, value) {
			this.ui.$stats.findChild('.stat.' + name + ' .value').val(value);
		}

		updateAttribute (index, value) {
			this.ui.$attributes[index].findChild('.value').val(value);
		}
	}

	return CharacterWindow;
});
