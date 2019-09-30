define(['html', 'widgets/button'], (html, Button) => {
	'use strict';

	class CharacterWindow {
		constructor (character) {
			this.character = character;

			this.ui = {};
			this.ui.$window = html.$find('#character .window');
			this.ui.$stats = this.ui.$window.findChild('.stats');
			this.ui.$attributes = this.ui.$stats.findAll('.attributes .attribute');

			this.ui.levelUpButton = new Button(this.ui.$window.findChild('#btn-lvl-up'));

			var t = this;

			this.ui.levelUpButton.addClickListener({
				onClick: () => {
					t.levelUp();
				}
			});
		}

		update () {
			this.updateStat('level', this.character.level);
			this.updateStat('class', this.character.characterClass.title);

			for (var i = 0; i < this.character.attributes.array.length; i++) {
				this.updateAttribute(i, this.character.attributes.array[i]);
			}
		}

		updateStat (name, value) {
			this.ui.$stats.findChild('.stat.' + name + ' .value').val(value);
		}

		updateAttribute (index, value) {
			this.ui.$attributes[index].findChild('.value').val(value);
		}

		levelUp () {
			this.character.levelUp();

			this.update();
		}
	}

	return CharacterWindow;
});
