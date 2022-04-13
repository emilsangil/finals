// Referenced from out project and webdev simplified
const partyCardTemplate = document.querySelector('[data-party-template]');
const partyCardContainer = document.querySelector('[data-party-cards-container]');

let party = [];

fetch('/party/all')
	.then(res => res.json())
	.then(data => {
		party = data.map(value => {
			const card = partyCardTemplate.content.cloneNode(true).children[0];// Clones data-plant-templates child element <starts with index 0>
            const image = card.querySelector('[data-image]');
			const header = card.querySelector('[data-header]');
			const body = card.querySelector('[data-body]');
			const link = card.querySelector('[data-link]');
            image.innerHTML = `<img src="${value.image}", alt="", width= "350px", height= "450px">`
			header.textContent = value.name;
			// body.textContent = value.plantOwner;
			link.innerHTML = `<a href=/party/${value.id}>View</a>`;
			partyCardContainer.append(card);
			return { name: value.name, owner: value.owner, element: card };
		});
	});