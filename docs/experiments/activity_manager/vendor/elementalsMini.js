/*
	elementalsMini.js
	Provides make/dss functionality
	Jason M. Knight, August 2021
*/

{

	"use strict";

	const

		delimiters = {
			"~" : (e, text) => e.textContent = text,
			"@" : (e, text) => {
				let special = specialTags[e.tagName.toLowerCase()];
				if (special) e[special] = text;
			},
			"=" : (e, text) => e.value = text,
			"^" : (e, text) => e.name = text,
			"." : (e, text) => e.setAttribute("class", text.replace(".", " ")),
			"#" : (e, text) => e.id = text
		},

		specialTags = {
			a          : "href",
			abbr       : "title",
			acronym    : "title",
			audio      : "src",
			bdo        : "dir",
			blockquote : "cite",
			button     : "type",
			del        : "cite",
			img        : "src",
			input      : "type",
			ins        : "cite",
			label      : "for",
			link       : "rel",
			output     : "for",
			script     : "src",
			source     : "src",
			td         : "headers",
			th         : "scope",
			track      : "src",
			q          : "cite",
			video      : "src"
		},

		rxTagSplit = /^(\w+)/,

		DSSToElement = (txt) => {
			if (txt.charAt(0) === "~") return new Text(txt.substr(1));
			let
				[ allMatch, tagName ] = (
					txt.match(rxTagSplit) || [ "div", "div" ]
				),
				e = document.createElement(tagName);
			if (e.tagName.toLowerCase() == "button") e.type = "button";
			txt = txt.substr(tagName.length);
			for (let [delimiter, method] of Object.entries(delimiters)) {
				let i = txt.indexOf(delimiter);
				if (i !== -1) {
					method(e, txt.substr(i + 1));
					txt = txt.substr(0, i);
				}
			}
			return e;
		}, // DSSToEleement

		ContentTargets = {
			"INPUT" : "value",
			"OUTPUT" : "value",
			"TEXTAREA" : "value"
		}; // ContentTargets

	Object.defineProperty(document, "__make", {
		value : function(dss, cmds) {
			if (dss instanceof Array) {
				for (let row of dss) document.__make(row[0], row[1]);
			} else {
				let e = DSSToElement(dss);
				if (cmds) {
					if (
						cmds instanceof Array ||
						cmds instanceof Node ||
						("object" !== typeof cmds)
					) return e.__append(cmds), e;
					if (cmds.attr) Object.assign(e, cmds.attr);
					if (cmds.append || cmds.append === 0) e.__append(cmds.append);
					if (cmds.viewProperty) {
						cmds.viewProperty.element = e;
						cmds.viewProperty.obj.__makeViewProperty(cmds.viewProperty);
					}
					if (cmds.style) Object.assign(e.style, cmds.style);
					if (cmds.callback) cmds.callback(e);
				}
				return e;
			}
		}
	}); // document.__make

	Object.defineProperties(Element.prototype, {

		__append : {
			value : function(data) {
				if (data instanceof Array) {
					for (let row of data) {
						if (row instanceof Array) this.__make(row[0], row[1]);
						else this.append(row);
					}
				} else this.append(data);
			}
		}, // Element.prototype.__append

		__make : {
			value : function(dss, cmds) {
				let e = document.__make(dss, cmds);
				if (
					("object" == typeof cmds) &&
					!(
						cmds instanceof Array ||
						cmds instanceof Node
					)
				) switch (cmds.place) {
					case "after":
						return this.parentNode.insertBefore(e, this.nextSibling);
					case "before":
						return this.parentNode.insertBefore(e, this);
					case "first":
						return this.insertBefore(e, this.firstChild);
				}
				return this.appendChild(e);  // "last"
			}
		}, // Element.prototype.__make

		__parentTagByName : {
			value : function(tagName) {
				let e = this;
				tagName = tagName.toLowerCase(); /* make XML safe */
				while (e = e.parentNode) {
					if (e.tagName.toLowerCase() == tagName) return e;
				}
			}
		} // Element.prototype.__parentTagByName

	}); // Elements.prototype

	Object.defineProperties(Object.prototype, {

		__makeViewProperty: {
			value : function(data) {
				let target = ContentTargets[data.element.tagName] || "textContent";
				if (data.value || data.value === 0) data.element[target] = data.value;
				Object.defineProperty(this, data.name, {
					get : () => data.value,
					set : function(value) {
						if (data.setCallback) value = data.setCallback(data, value);
						data.element[target] = data.value = value;
					}
				});
			}
		}, // Object.prototype.__makeViewProperty


	}); // Object.prototype

}
