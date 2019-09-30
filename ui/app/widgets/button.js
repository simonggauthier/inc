define(['util/listener-list'], (ListenerList) => {
	'use strict';

	class Button {
		constructor ($element) {
			this.clickListeners = new ListenerList();

			this.ui = {};
			this.ui.$button = $element;

			var t = this;

			this.ui.$button.addEventListener('click', () => {
				t.clickListeners.dispatch('onClick', t);
			});
		}
	};

	return Button;

});
