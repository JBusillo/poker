import { config } from './config';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

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

let setMyCards = null;
export function setMyCardsCb(value) {
	setMyCards = value;
}

let setTableCards = null;
export function setTableCardsCb(value) {
	setTableCards = value;
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
					setDialog(action, fn);
					break;
				case 'MyCards':
					setMyCards(action, fn);
					break;
				case 'TableCards':
					setTableCards(action, fn);
					break;
				case 'PlayerStatus':
					setPlayerStatus.forEach((e) => e(action, fn));
					break;
				case 'PlayerDealt':
					setPlayerDealt.forEach((e) => e(action, fn));
					break;
				default:
					throw `Invalid Type for PokerMessage!! ${action.type}`;
			}
		});
	});
}
