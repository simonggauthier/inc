define(() => {
	'use strict';

	class Button {
		constructor ($element) {
			this.clickListeners = [];

			this.ui = {};
			this.ui.$button = $element;

			var t = this;

			this.ui.$button.addEventListener('click', () => {
				t.dispatchClick();
			});
		}

		addClickListener (listener) {
			this.clickListeners.push(listener);
		}

		dispatchClick () {
			var t = this;

			this.clickListeners.forEach((l) => {
				l.onClick(t);
			});
		}
	};

	return Button;

});
