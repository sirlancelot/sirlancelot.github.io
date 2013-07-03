(function($) {
	"use strict";
	var QuineString,

	QuineString = (function() {
		function QuineString() {
			this.primitive = String.apply(this, arguments);
		}

		QuineString.prototype = $.extend(
			new String(),
			{
				escape: function() {
					this.primitive = this.replace(/[\u00A0-\u2666<>\&]/g, function(c) { return "&#" + c.charCodeAt(0) + ";"; });
					return this;
				},
				highlight: function() {
					this.primitive = hljs.fixMarkup(hljs.highlight("xml", this).value, "----", 1);
					return this;
				},
				toString: function() {
					return this.valueOf();
				},
				valueOf: function() {
					return String.prototype.toString.call(this.primitive);
				}
			}
		);

		return QuineString;
	})();

	$.fn.quine = function() {
		return this.clone().find('.meta').remove().end();
	};
	$.fn.beautify = function() {
		return new QuineString(html_beautify("<!DOCTYPE html><html>" + this.html() + "</html>", {
			"wrap_line_length": 80,
			"max_preserve_newlines": 2
		}));
	}
})(jQuery);
