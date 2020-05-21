const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

const fetchAPI = async (url) => {
	let response = await fetch(url)
	const textResponse = await response.text()
	return JSON.parse(textResponse)
}

let currentPage = 1;
const ITEMS_PER_PAGE = 6;

const paginateData = (data) => {
    return data.reduce((total, current, index) => {
      const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1;
      total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current]);
      return total;
    }, [])
}

const changePage = (pageToBeRendered) => {
	currentPage = pageToBeRendered
	renderPage()
}
//método de mudar de página

const renderPaginationMenu = (paginatedData) => {

	paginationContainer = document.querySelector(".pagination");
	//colocamos nossa div container dos cards em uma variável

	while (paginationContainer.firstChild) {
			paginationContainer.removeChild(paginationContainer.firstChild)
	}
	//esvaziamos essa div a cada render para que não seja rendedrizado o menu com os dados da página antiga do usuário
	
	const previousPage = document.createElement('span')
	previousPage.className = 'page-changer'
	previousPage.innerHTML = '<'
	previousPage.addEventListener('click', () => currentPage <= 1 ? () => { } : changePage(currentPage - 1))
	paginationContainer.appendChild(previousPage)
	//geramos um botão que ao ser clicado atualiza chama o método de mudar de página passando a página anterior se a página
	//atual não for 1

	paginatedData.forEach((_, index) => {
			//para cada array (página) dentro do nosso array total criaremos um botão numerado para ir para aquela página
			const pageButton = document.createElement('span')
			pageButton.innerHTML = index + 1 //index + 1 porque os indices começam em 0 e queremos mostrar a primeira página como 1

			pageButton.addEventListener('click', () => changePage(index + 1))

			if (currentPage === index + 1) {
					pageButton.className = 'active'
			}

			paginationContainer.appendChild(pageButton)
	})

	const nextPage = document.createElement('span')
	nextPage.className = 'page-changer'
	nextPage.innerHTML = '>'
	nextPage.addEventListener('click', () => currentPage >= paginatedData.length ? () => { } : changePage(currentPage + 1))

	paginationContainer.appendChild(nextPage)

	//por fim, método de avançãr a página que funciona igual o de voltar a página só que ao contrário :)
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

function initMap() {
	const locations = [
			['Avenida Paulista', -23.563311, -46.654275, 5],
			['Gama Academy', -23.567427, -46.684607, 4],
			['Marco Zero', -23.550460, -46.633934, 3],
			['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
			['Maroubra Beach', -33.950198, 151.259302, 1]
	];

	const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: new google.maps.LatLng(-23.550460, -46.633934),
			mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	const infowindow = new google.maps.InfoWindow();

	let marker, i;

	for (i = 0; i < locations.length; i++) {
			marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i][1], locations[i][2]),
					map: map
			});

			google.maps.event.addListener(marker, 'click', (function (marker, i) {
					return function () {
							infowindow.setContent(locations[i][0]);
							infowindow.open(map, marker);
					}
			})(marker, i));
	}
}

renderPage();