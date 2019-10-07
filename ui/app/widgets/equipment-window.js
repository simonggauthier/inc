define(['util/html', 'util/listener-list', 'widgets/button'], (html, ListenerList, Button) => {
	'use strict';

	class EquipmentWindow {
		constructor() {
			this.ui = {};
			this.ui.$window = html.$find('#equipment .window');
			this.ui.$slots = this.ui.$window.findChild('.slots');
		}

		show(character) {

		}
	}

	return EquipmentWindow;
});
