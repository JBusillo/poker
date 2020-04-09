import { config } from './config';
import io from 'socket.io-client';
let socket = null;

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

export function initBroadcastComm() {
	console.log('initBroadcastComm');
	socket = io(`${config.server}`, { transport: ['websocket'] });
	socket.on('PokerMessage', (type, data) => {
		try {
			switch (type) {
				case 'PlayerStatus':
					setPlayerStatus(data);
					break;
				case 'GameStatus':
					setGameStatus(data);
					break;
				case 'TableCards':
					setTableCards(data);
					break;
				default:
					throw `Invalid Type for PokerMessage!! ${type}`;
			}
		} catch (e) {
			console.log(e);
		}
	});
}

export function initUserComm(guid) {
	console.log('Creating Listener for ' + guid);
	socket.on(guid, (type, data) => {
		console.log('received message in initUserComm');
		try {
			switch (type) {
				case 'MyActions':
					setMyActions(data);
					break;
				case 'MyCards':
					setMyCards(data);
					break;
				case 'MyStatus':
					setMyStatus(data);
					break;
				default:
					throw `Invalid Type for GuidMessage!! ${type}`;
			}
		} catch (e) {
			console.log(e);
		}
	});
}
