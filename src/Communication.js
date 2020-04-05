import { config } from './config';
import io from 'socket.io-client';
import * as Data from './GameData';
let socket = null;

export function initBroadcastComm() {
	console.log('initBroadcastComm');
	socket = io(`${config.server}`, { transport: ['websocket'] });
	socket.on('PokerMessage', (type, data) => {
		try {
			switch (type) {
				case 'PlayerStatus':
					Data.setPlayerStatus(data);
					break;
				case 'GameStatus':
					Data.setGameStatus(data);
					break;
				case 'TableCards':
					Data.setTableCards(data);
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
					Data.setMyActions(data);
					break;
				case 'MyCards':
					Data.setMyCards(data);
					break;
				case 'MyStatus':
					Data.setMyStatus(data);
					break;
				default:
					throw `Invalid Type for GuidMessage!! ${type}`;
			}
		} catch (e) {
			console.log(e);
		}
	});
}
