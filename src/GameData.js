let PlayerStatus;
let playerStatusCallback;

export function setPlayerStatus(status) {
	console.log('setPlayerStatus');
	PlayerStatus = status;
	playerStatusCallback(PlayerStatus);
}

export function getPlayerStatus() {
	console.log('setPlayerStatusCallback');
	return PlayerStatus;
}

export function setPlayerStatusCallback(cb) {
	console.log('setPlayerStatusCallback');
	playerStatusCallback = cb;
}

let MyCards;
let myCardsCallback;

export function setMyCards(status) {
	MyCards = status;
	myCardsCallback(MyCards);
}

export function getMyCards() {
	return MyCards;
}

export function setMyCardsCallback(cb) {
	myCardsCallback = cb;
}

let GameStatus;
let gameStatusCallback;

export function setGameStatus(status) {
	console.log('setGameStatus');
	GameStatus = status;
	gameStatusCallback(GameStatus);
}

export function getGameStatus() {
	console.log('getGameStatus');
	return GameStatus;
}

export function setGameStatusCallback(cb) {
	console.log('setGameStatusCallback');
	gameStatusCallback = cb;
}

let MyActions;
let myActionsCallback;

export function setMyActions(status) {
	MyActions = status;
	myActionsCallback(MyActions);
}

export function getMyActions() {
	return MyActions;
}

export function setMyActionsCallback(cb) {
	myActionsCallback = cb;
}

let MyStatus;
let myStatusCallback;

export function setMyStatus(status) {
	MyStatus = status;
	myStatusCallback(MyStatus);
}

export function getMyStatus() {
	return MyStatus;
}

export function setMyStatusCallback(cb) {
	myStatusCallback = cb;
}

let TableCards;
let tableCardsCallback;

export function setTableCards(status) {
	TableCards = status;
	tableCardsCallback(TableCards);
}

export function getTableCards() {
	return TableCards;
}

export function setTableCardsCallback(cb) {
	tableCardsCallback = cb;
}

let GameTable;
let gameTableCallback;

export function setGameTable(status) {
	GameTable = status;
	gameTableCallback(GameTable);
}

export function getGameTable() {
	return GameTable;
}

export function setGameTableCallback(cb) {
	gameTableCallback = cb;
}
