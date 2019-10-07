define(() => {
	'use strict';

	class CodeExecutor {
		constructor(code, space) {
			this.code = code;
			this.space = space;
			this.fn = '() => {return (space) => {' + this.renderCode() + '}}';
			this.f = eval(this.fn);
		}

		execute(t) {
			var fi = this.f();

			fi.call(t, this.space);
		}

		renderCode() {
			var ret = this.code;

			for (var key in this.space) {
				ret = ret.replace(key, 'space[\'' + key + '\']');
			}

			return ret;
		}
	}

	return CodeExecutor;
});
