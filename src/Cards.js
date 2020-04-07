// export const cardHeight = '110';
// export const cardWidth = '72';
export const cardHeight = '220';
export const cardWidth = '144';

export function getCard(shortCard) {
	var row = 'CDHS'.indexOf(shortCard.substr(0, 1));
	var col = '14020304050607080910111213'.indexOf(shortCard.substr(1, 2)) / 2;
	return `./build/assets/cards.svg#svgView(viewBox(${col * 72}, ${row * 110}, 72, 110))`;
}
