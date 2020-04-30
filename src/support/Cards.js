// export const cardHeight = '110';
// export const cardWidth = '72';
export const cardHeight = '220';
export const cardWidth = '144';

export function getCard(shortCard) {
	//
	if (shortCard === "XXX")
	{
		return `./build/assets/back.svg#svgView(viewBox(0, 0, 72, 110))`;
	}
	var row = 'CDHS'.indexOf(shortCard.substr(0, 1)); 
	var col = '14020304050607080910111213'.indexOf(shortCard.substr(1, 2)) / 2;
	return `./build/assets/cards.svg#svgView(viewBox(${col * 72}, ${row * 110}, 72, 110))`;
}

export function resizeCards(classGrid, classHead, cards, cards_id) {
	var elGrid = document.getElementsByClassName(classGrid)[0];
	var elHead = document.getElementsByClassName(classHead)[0];
	let max_height = elGrid.clientHeight - elHead.clientHeight;
	let max_width = elGrid.clientWidth; 

	var ideal_height = max_height;
	var ideal_width = Math.trunc((72 / 100) * ideal_height);

	// Will all the elements fit cross-wise?
	var imgs_across = Math.trunc(max_width / ideal_width);
	if (cards.length <= imgs_across) {
		create(ideal_height, ideal_width, cards, cards_id);
		return;
	}
	if (cards.length <= imgs_across * 2) {
		create(ideal_height / 2, ideal_width / 2, cards, cards_id);
		return;
	}
	if (cards.length <= imgs_across * 4) {
		create(ideal_height / 3, ideal_width / 3, cards, cards_id);
		return;
	}
	if (cards.length <= imgs_across * 8) {
		create(ideal_height / 3, ideal_width / 4, cards, cards_id);
		return;
	}
	if (cards.length <= imgs_across * 16) {
		create(ideal_height / 3, ideal_width / 5, cards, cards_id);
		return;
	}
	throw 'Too Many Cards';

	function create(h, w, cards, cards_id) {
		var fragment = document.createDocumentFragment();

		cards.forEach((el) => {
			var img = document.createElement('img');

			// var alt = document.createAttribute("alt");
			// alt.value = el;
			img.setAttribute('alt', el);

			// var height = document.createAttribute("height");
			// alt.value = h;
			img.setAttribute('height', h);

			// var width = document.createAttribute("width");
			// alt.value = w;
			img.setAttribute('width', w);

			// var src = document.createAttribute("src");
			// alt.value = getCard(el);
			img.setAttribute('src', getCard(el));

			fragment.appendChild(img);
		});
		var div = document.getElementById(cards_id);

		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}

		div.appendChild(fragment);
	}
}
