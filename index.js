const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

const fetchAPI = async (url) => {
	let response = await fetch(url)
	const textResponse = await response.text()
	return JSON.parse(textResponse)
}

// items.sort(function (a, b) {
//   if (a.name > b.name) {
//     return 1;
//   }
//   if (a.name < b.name) {
//     return -1;
//   }
//   return 0;
// });

const renderPage = async (url) => {
	const apiData = await fetchAPI(API_URL);

	const paginatedData = paginateData(apiData);

	renderPaginationMenu(paginatedData);

	cardContainer = document.getElementById("cards");

	while (cardContainer.firstChild) {
		cardContainer.removeChild(cardContainer.firstChild)
	}

	paginatedData[currentPage-1].forEach(property => {
		const { name, photo, price, property_type } = property;

		cardContainer.innerHTML += `
		<div class="media">
			<a href="${photo}"><img src="${photo}" class="align-self-center mr-3" id="photo"></a>
			<div class="media-body conteudo">
				<div class="media-title">
					<a href=""><h5 class="mt-0 conteudo"><b>${property_type}</b></h5></a>
					<p>${name}</p>
				</div>
				<p class="mb-0 price"><b>R$${price},00/noite</b></p>
			</div>
		</div
		>
		`;
	});
}

window.addEventListener("load", renderPage);