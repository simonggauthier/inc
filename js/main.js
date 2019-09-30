'use strict';

class UiElement {
	constructor (el) {
		this.el = el;
	}

	findElement (q) {
		return this.findAll(q)[0];
	}

	findAll (q) {
		return $ui(this.el.querySelectorAll(q));
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
}

function $find (q) {
	return $findAll(q)[0];
}

function $findAll (q) {
	return $ui(document.querySelectorAll(q));
}

function $ui (els) {
	var ret = [];

	for (var i = 0; i < els.length; i++) {
		ret.push(new UiElement(els[i]));
	}

	return ret;
}

function $clone (t) {
	return new UiElement(document.importNode(document.querySelector(t).content, true).firstElementChild);
}

class CharacterClass {
	constructor (title) {
		this.title = title;
		this.startingAttributes = [1, 1, 1, 3, 2];
	}
}

class Character {
	constructor () {
		this.level = 1;
		this.clss = new CharacterClass('Wizard');
		this.attributes = this.clss.startingAttributes.slice();
	}
}

class CharacterWindow {
	constructor (character) {
		this.character = character;

		this.ui = {
			$window: $find('#character .window'),
		};

		this.ui.$stats = this.ui.$window.findElement('.stats');
		this.ui.$attributes = this.ui.$stats.findElement('.attributes');
	}

	update () {
		var c = this.character;

		this.updateStatRow('level', c.level);
		this.updateStatRow('class', c.clss.title);

		var $attrs = this.ui.$attributes.findAll('.attribute');

		for (var i = 0; i < $attrs.length; i++) {
			console.log(c.attributes[i])
			$attrs[i].findElement('.value').val(c.attributes[i]);
		}
	}

	createStatRow (name, title, value) {
		var $row = $clone('#stat-row');

		$row.addClass(name);
		$row.find('.label').val(title);
		$row.find('.value').val(value);

		return $row;
	}

	updateStatRow (name, value) {
		this.ui.$stats.findElement('.stat.' + name + ' .value').val(value);
	}
}

class Game {
	constructor () {
		this.character = new Character();

		this.components = [];
		this.components.push(new CharacterWindow(this.character));

		this.onCreate();
	}

	update () {
		this.components.forEach((c) => {
			c.update();
		})
	}

	onCreate() {
		this.update();
	}
}

new Game();
