define(() => {
	'use strict';

	class UiElement {
		constructor (el) {
			this.el = el;
		}

		findChild (q) {
			return this.findAll(q)[0];
		}

		findAll (q) {
			return wrapElements(this.el.querySelectorAll(q));
		}

		val (v) {
			v = '' + v;

			if (v.length > 0) {
				this.el.innerHTML = '' + v;
			}

			return this.el.innerHTML;
		}

		clear () {
			this.el.innerHTML = '';
		}

		add ($el) {
			this.el.appendChild($el.el);
		}

		addClass (c) {
			this.el.classList.add(c);
		}

		addEventListener (name, listener) {
			this.el.addEventListener(name, listener);
		}
	};

	function $find(q) {
		return $findAll(q)[0];
	}

	function $findAll(q) {
		return wrapElements(document.querySelectorAll(q));
	}

	function $clone(t) {
		return new UiElement(document.importNode(document.querySelector(t).content, true).firstElementChild);
	}

	function wrapElements(els) {
		var ret = [];

		for (var i = 0; i < els.length; i++) {
			ret.push(new UiElement(els[i]));
		}

		return ret;
	}

	return {
		UiElement: UiElement,
		$find: $find,
		$findAll: $findAll,
		$clone: $clone
	}
});
