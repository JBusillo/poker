import { config } from './config';
import io from 'socket.io-client';

//-----------------------------------------------------
import { writable } from 'svelte/store';

export const myCards = writable([]);
export const tableCards = writable([]);

//-----------------------------------------------------

let socket = null;

export function getSocket() {
	return socket;
}

export let setDialog = null;
export function setDialogCb(value) {
	setDialog = value;
}

let setTable = null;
export function setTableCb(value) {
	setTable = value;
}

let setPlayerStatus = [];
export function setPlayerStatusCb(value) {
	setPlayerStatus.push(value);
}

let setPlayerDealt = [];
export function setPlayerDealtCb(value) {
	setPlayerDealt.push(value);
}

let setPlayerShow = [];
export function setPlayerShowCb(value) {
	setPlayerShow.push(value);
}

let setGameMessage = null;
export function setGameMessageCb(value) {
	setGameMessage = value;
}

let setMyActions = null;
export function setMyActionsCb(value) {
	setMyActions = value;
}

let setPlayerLine = null;
export function setPlayerLineCb(value) {
	setPlayerLine = value;
}

let setMyLine = null;
export function setMyLineCb(value) {
	setMyLine = value;
}

export function initCommunication() {
	console.log(`initCommunication`);
	socket = io(`${config.server}`, { transport: ['websocket'] });
	socket.on('PokerMessage', (actions, fn) => {
		actions.forEach((action) => {
			switch (action.type) {
				// This will create players (in app) for all existing players
				case 'Players':
					setTable(action, fn);
					break;
				// This will add a player (in app) for a new player
				case 'AddPlayer':
					setTable(action, fn);
					break;
				case 'MyActions':
					setMyActions(action, fn);
					break;
				case 'GameMessage':
					setGameMessage(action, fn);
					break;
				case 'Dialog':
					console.log(`Dialog   ${JSON.stringify(action)}`);
					setDialog(action, fn);
					break;
				case 'MyCards':
					myCards.set(action);
					break;
				case 'TableCards':
					tableCards.set(action);
					break;
				case 'PlayerStatus':
					setPlayerStatus.forEach((e) => e(action.player, fn));
					break;
				case 'PlayerCards':
					setPlayerDealt.forEach((e) => e(action, fn));
					break;
				default:
					throw `Invalid Type for PokerMessage!! ${action.type}`;
			}
		});
	});
}
