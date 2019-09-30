define(() => {
	'use strict';

	function createRequest () {
		return new XMLHttpRequest();
	}

	function isDone (r) {
		return r.readyState === XMLHttpRequest.DONE;
	}

	function isOk (r) {
		return r.status === 200;
	}

	function getText (r) {
		return r.responseText;
	}

	function get (url) {
		var ret = new Promise((resolve, reject) => {
			var r = createRequest();

			r.onreadystatechange = () => {
				if (isDone(r)) {
					resolve({
						status: r.status,
						content: getText(r)
					});
				}
			};

			r.open('GET', url, true);
			r.send();
		});

		return ret;
	}

	return {
		get: get
	}
});
