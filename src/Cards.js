export function getCard(shortCard) {
	console.log(shortCard);
	var row = 'CDHS'.indexOf(shortCard.substr(0, 1));
	var col = '14020304050607080910111213'.indexOf(shortCard.substr(1, 2)) / 2;
	console.log(`row=${row},col=${col}`);
	//72, 110
	//./build/assets/cards.svg#svgView(viewBox(144, 0, 72, 110))
	return `./build/assets/cards.svg#svgView(viewBox(${col * 72}, ${row * 110}, 72, 110))`;
}
