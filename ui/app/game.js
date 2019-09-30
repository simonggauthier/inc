define(['model/character', 'widgets/character-window'], (Character, CharacterWindow) => {
	'use strict';
	
	class Game {
		constructor () {
			this.character = new Character();

			this.widgets = [];

			this.widgets.push(new CharacterWindow(this.character));

			this.onCreate();
		}

		update () {
			this.widgets.forEach((w) => {
				w.update();
			});
		}

		onCreate () {
			this.update();
		}
	}

	return Game;
});
