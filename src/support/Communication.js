import { config } from './config';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import log from 'roarr';

let socket = null;

export function getSocket() {
	return socket;
}

export let setDialog = null;
export function setDialogCb(value) {
	setDialog = value;
}

let setPlayerStatus = null;
export function setPlayerStatusCb(value) {
	setPlayerStatus = value;
}

let setGameStatus = null;
export function setGameStatusCb(value) {
	setGameStatus = value;
}

let setTableCards = null;
export function setTableCardsCb(value) {
	setTableCards = value;
}

let setMyCards = null;
export function setMyCardsCb(value) {
	setMyCards = value;
}

let setMyStatus = null;
export function setMyStatusCb(value) {
	setMyStatus = value;
}

let setMyActions = null;
export function setMyActionsCb(value) {
	setMyActions = value;
}

let setShowDown = null;
export function setShowDownCb(value) {
	setShowDown = value;
}

export function initCommunication() {
	console.log(`initCommunication`);
	socket = io(`${config.server}`, { transport: ['websocket'] });
	socket.on('PokerMessage', (type, data, fn) => {
		log.debug(type + ':' + JSON.stringify(data));
		try {
			switch (type) {
				case 'PlayerStatus':
					setPlayerStatus(data, fn);
					break;
				case 'GameStatus':
					setGameStatus(data, fn);
					break;
				case 'TableCards':
					setTableCards(data, fn);
					break;
				case 'Dialog':
					setDialog(data, fn);
					break;
				case 'MyActions':
					setMyActions(data, fn);
					break;
				case 'MyCards':
					setMyCards(data, fn);
					break;
				case 'MyStatus':
					setMyCards(data, fn);
					break;
				case 'ShowDown':
					setShowDown(data, fn);
					break;
				case 'Dialog':
					setDialog(data, fn);
					break;
				default:
					throw `Invalid Type for PokerMessage!! ${type}`;
			}
		} catch (e) {
			console.log(e);
		}
	});
}
