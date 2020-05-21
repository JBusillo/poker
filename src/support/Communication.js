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
export const playerShow = writable(null);
export const highLight = writable('');
export const selectedCards = fSelectedCards();
export const myStatus = writable({});

export const infoGame = writable('Not Set');
export const infoPot = writable(0);
export const infoMsg = writable('');
export const infoChips = writable(0);
export const gameResults = writable(null);
export const pupTag = writable(null);
export const screenDialog = writable(null);
export const selectEnabled = writable(false);
export const discardEnabled = writable(false);
// export const isOnBreak = writable(false);
// export const isOnBreakNextRound = writable(false);

export const gamePaused = writable(false);

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
		getCounts: () => {
			return { MyCards: MyCards.length, TableCards: TableCards.length };
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
			console.log(`action  ${JSON.stringify(action)}`);
			switch (action.type) {
				case 'Dialog':
					setDialog(action, fn);
					break;
				// ================== using Store
				// Sent only to a new player: adds the already existing players to the table
				case 'Players':
					tablePlayers.set(action);
					break;
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
					infoGame.set(action.game);
					break;
				case 'InfoPot':
					infoPot.set(action.pot);
					break;
				case 'InfoMsg':
					infoMsg.set(action.message);
					break;
				case 'GameResults':
					gameResults.set(action);
					break;
				case 'PupTag':
					pupTag.set(action.tag);
					break;
				case 'PauseGame':
					gamePaused.set(true);
					break;
				case 'ResumeGame':
					gamePaused.set(false);
					break;
				case 'Reload':
					location.reload();
					break;

				default:
					throw `Invalid Type for PokerMessage!! ${action.type}`;
			}
		});
	});
}
