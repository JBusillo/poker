import { get } from 'svelte/store';
import {
	getSocket,
	myCards,
	tableCards,
	playerCards,
	myActions,
	playerStatus,
	tablePlayers,
	playerShow,
	highLight,
	selectedCards,
	infoGame,
	infoPot,
	infoMsg,
	infoChips,
	gameResults,
	pupTag,
	screenDialog,
	selectEnabled,
	discardEnabled,
} from './Communication';

export const mountedMap = new Map();

//return registerDump(COMPONENT_NAME, me, buttons, localMiniDialog);
export function registerDump(componentName, ...rest) {
	mountedMap.set(componentName, () => {
		return { ...rest };
	});
	return () => {
		mountedMap.delete(componentName);
	};
}

export function dumper() {
	let dumpInfo = [];

	mountedMap.forEach((val, key) => {
		dumpInfo.push({ module: key, data: val() });
	});

	let store = {
		myCards: get(myCards),
		tableCards: get(tableCards),
		playerCards: get(playerCards),
		myActions: get(myActions),
		playerStatus: get(playerStatus),
		tablePlayers: get(tablePlayers),
		playerShow: get(playerShow),
		highLight: get(highLight),
		selectedCards: get(selectedCards),
		infoGame: get(infoGame),
		infoPot: get(infoPot),
		infoMsg: get(infoMsg),
		infoChips: get(infoChips),
		gameResults: get(gameResults),
		pupTag: get(pupTag),
		screenDialog: get(screenDialog),
		selectEnabled: get(selectEnabled),
		discardEnabled: get(discardEnabled),
	};

	dumpInfo.push({ module: 'store', data: store });

	let dom = toJSON(document.getElementById('root'));

	getSocket().emit('ClientMessage', { msgType: 'doDump', dumpData: dumpInfo, dom }, function () {
		alert('Dump Successful');
	});
}

//source: https://gist.github.com/sstur/7379870  dom-to-json.js
function toJSON(node) {
	let propFix = { for: 'htmlFor', class: 'className' };
	let specialGetters = {
		style: (node) => node.style.cssText,
	};
	let attrDefaultValues = { style: '' };
	let obj = {
		nodeType: node.nodeType,
	};
	if (node.tagName) {
		obj.tagName = node.tagName.toLowerCase();
	} else if (node.nodeName) {
		obj.nodeName = node.nodeName;
	}
	if (node.nodeValue) {
		obj.nodeValue = node.nodeValue;
	}
	let attrs = node.attributes;
	if (attrs) {
		let defaultValues = new Map();
		for (let i = 0; i < attrs.length; i++) {
			let name = attrs[i].nodeName;
			defaultValues.set(name, attrDefaultValues[name]);
		}
		// Add some special cases that might not be included by enumerating
		// attributes above. Note: this list is probably not exhaustive.
		switch (obj.tagName) {
			case 'input': {
				if (node.type === 'checkbox' || node.type === 'radio') {
					defaultValues.set('checked', false);
				} else if (node.type !== 'file') {
					// Don't store the value for a file input.
					defaultValues.set('value', '');
				}
				break;
			}
			case 'option': {
				defaultValues.set('selected', false);
				break;
			}
			case 'textarea': {
				defaultValues.set('value', '');
				break;
			}
		}
		let arr = [];
		for (let [name, defaultValue] of defaultValues) {
			let propName = propFix[name] || name;
			let specialGetter = specialGetters[propName];
			let value = specialGetter ? specialGetter(node) : node[propName];
			if (value !== defaultValue) {
				arr.push([name, value]);
			}
		}
		if (arr.length) {
			obj.attributes = arr;
		}
	}
	let childNodes = node.childNodes;
	// Don't process children for a textarea since we used `value` above.
	if (obj.tagName !== 'textarea' && childNodes && childNodes.length) {
		let arr = (obj.childNodes = []);
		for (let i = 0; i < childNodes.length; i++) {
			arr[i] = toJSON(childNodes[i]);
		}
	}
	return obj;
}
