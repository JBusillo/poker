import { config } from './config';
import io from 'socket.io-client';

//-----------------------------------------------------
import { writable } from 'svelte/store';

export const myCards = writable([]);
export const tableCards = writable([]);
export const playerCards = writable([]);
export const myActions = writable([]);
export const playerStatus = writable(null);
export const tablePlayers = writable([]);
export const playerShow = writable([]);
export const highLight = writable('');
export const selectedCards = fSelectedCards();

export const infoGame = writable('');
export const infoPot = writable(0);
export const infoMsg = writable('');
export const infoName = writable('');

export const selectEnabled = writable(false);
//-----------------------------------------------------
//
function fSelectedCards() {
	const { subscribe, set } = writable([]);
	// piles: "TableCards" and "MyCards"
	let TableCards = [];
	let MyCards = [];

	return {
		subscribe,
		add: (pile, card) => {
			if (TableCards.length + MyCards.length < 5)
				switch (pile) {
					case 'TableCards':
						TableCards.push(card);
						break;
					case 'MyCards':
						MyCards.push(card);
						break;
					default:
						throw Error('Invalid Pile on add Selected Cards');
				}
			set([...TableCards, ...MyCards]);
		},
		remove: (pile, card) => {
			switch (pile) {
				case 'TableCards':
					TableCards.splice(TableCards.indexOf(card), 1);
					break;
				case 'MyCards':
					MyCards.splice(MyCards.indexOf(card), 1);
					break;
				default:
					throw Error('Invalid Pile on remove Selected Cards');
			}
			set([...TableCards, ...MyCards]);
		},
		reset: () => {
			// remove all cards
			{
				TableCards = [];
				MyCards = [];
			}
			set([...TableCards, ...MyCards]);
		},
	};
}

//------------------------------------------------------
let socket = null;

export function getSocket() {
	return socket;
}

export let setDialog = null;
export function setDialogCb(value) {
	setDialog = value;
}

let setPlayerShow = [];
export function setPlayerShowCb(value) {
	setPlayerShow.push(value);
}

export function initCommunication() {
	console.log(`initCommunication`);
	socket = io(`${config.server}`, { transport: ['websocket'] });
	socket.on('PokerMessage', (actions, fn) => {
		actions.forEach((action) => {
			switch (action.type) {
				case 'Dialog':
					setDialog(action, fn);
					break;
				// ================== using Store
				// Sent only to a new player: adds the already existing players to the table
				case 'Players':
				// Sent to all players:  adds a new player to the table
				case 'AddPlayer':
					tablePlayers.set(action);
					break;
				case 'PlayerStatus':
					playerStatus.set(action);
					break;
				case 'MyActions':
					action.cb = fn;
					myActions.set(action);
					break;
				case 'MyCards':
					myCards.set(action);
					break;
				case 'TableCards':
					tableCards.set(action);
					break;
				case 'PlayerCards':
					playerCards.set(action);
					break;
				case 'HighLight':
					highLight.set(action);
					break;
				case 'PlayerShow':
					playerShow.set(action);
					break;
				case 'InfoGame':
					infoGame.set(action);
					break;
				case 'InfoPot':
					console.log(`pot   ${JSON.stringify(action)}`);
					infoPot.set(action);
					break;
				case 'InfoMsg':
					infoMsg.set(action);
					break;
				case 'InfoName':
					console.log(`name   ${JSON.stringify(action)}`);
					infoName.set(action);
					break;

				default:
					throw `Invalid Type for PokerMessage!! ${action.type}`;
			}
		});
	});
}
