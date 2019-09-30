define(() => {
	'use strict';

	class ListenerList {
		constructor () {
			this.listeners = [];
		}

		add (listener) {
			this.listeners.push(listener);
		}

		dispatch (event, model) {
			this.listeners.forEach((l) => {
				log('Dispatching event ' + event);

				l[event](model);
			});
		}
	};

	return ListenerList;
});
