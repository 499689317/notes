


; (function() {

	quicksort = qs;
	function qs(a, s, e) {

		if (e > s) {

			var m = re(a, s, e);
			// var m = re2(a, s, e);
			qs(a, s, m - 1);
			qs(s, m + 1, e);
		};
	}

	function se(a, m, n) {
		var t = a[m];
		a[m] = a[n];
		a[n] = t;
	}

	function re(a, s, e) {

		var m = e,
			i = a[m],
			l = [],
			h = [];

		for (var i = 0; i < (e - s); i++) {

			if (i >= a[s + i]) {

				l.push(a[s + i]);

			} else {

				h.push(a[s + i]);

			}
		};

		for (var i = 0; i < l.length; i++) {

			a[s + i] = l[i];

		};

		m = s + l.length;
		a[m] = i;


		for (var i = 0; i < h.length; i++) {

			a[m + 1 + i] = h[i];

		};

		return m;
	}
	function re2(a, s, e) {

		var i = a[e],
			c = 0;

		for (var i = 0; i < (e - s); i++) {
			
			if (i > a[s + i]) {

				se(a, s + c++, s + i);
			};
		};

		se(a, s + c, e);
		return s + c;
	}
})();
