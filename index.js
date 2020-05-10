window.addEventListener("load", start_events);

async function start_events ()
{
	chama_fetch();
}

function page_events ()
{
	btn_pages = document.getElementsByClassName("page_btn");
	for (btn of btn_pages)
	{
		btn.addEventListener("click", function(){
			n = this.id.indexOf('#') + 1;
			id = this.id.substring(n);
      open_page(id, this);
		});
	}

	btn_prevs = document.getElementsByClassName("btn_prev");
	for (btn of btn_prevs)
	{
		btn.addEventListener("click", function(){
			open_page(this.id.replace("prev#", ""), this);
		});
	}

	btn_nexts = document.getElementsByClassName("btn_next");
	for (btn of btn_nexts)
	{
		btn.addEventListener("click", function(){
      open_page(this.id.replace("next#", ""), this);
      li.className = "page-item active";
		});
	}
}

function chama_fetch(){

	const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
	
	fetch(url)
	.then(response => response.json())
	.then(data => {

	card = document.getElementById("cards");

	card.appendChild(create_pages(data, 5));
	page_events ();
	
	console.log(data);
	})
	.catch(err => console.log(err));
}

function create_pages (data, num_card){
	content = document.createElement("div");
	content.className = "pages-struct";

	for (var i = 0; i < data.length; i += num_card)
	{
		indice = i/num_card + 1;

		page = document.createElement("div");
		page.className = "pages";
		page.id = "page_" + indice;

		if (!i)
		{
			page.className += " active";
		}
		else
		{
			page.style.display = "none";
		}

		nexts = Math.round(data.length/num_card) - indice;
		pagination = create_pagination (indice,  nexts);

		page.innerHTML = "";
		for (var j = i; j < (i+num_card); j++)
		{
			if (j == data.length)
			break;

			indice = data[j];

			page.innerHTML += `
			<div class="media">
				<a href="${indice.photo}"><img src="${indice.photo}" class="align-self-center mr-3" id="photo"></a>
				<div class="media-body conteudo">
					<a href=""><h5 class="mt-0 conteudo"><b>${indice.property_type}</b></h5></a>
					<p>${indice.name}</p>
					<p class="mb-0 price"><b>R$${indice.price},00/noite</b></p>
				</div>
			</div>
			`;
		}

		page.appendChild(pagination);
		content.appendChild(page);
	}

	return content;
}

function create_pagination (here, nexts){
	ul = document.createElement("ul");
	ul.className = "pagination pagination-md";

	//pagination = [];
	if (here > 1)
	{
		li_p = create_previously_btn(here - 1);
		//pagination.push(li_p);
		ul.appendChild(li_p);

		if (!nexts && here > 2)
		{
			li_temp = create_indice_page(here, here - 2);
			//pagination.push(li_temp);
			ul.appendChild(li_temp);

			if (here > 1)
			{
				li_temp2 = create_indice_page(here, here - 1);
				//pagination.push(li_temp2);
				ul.appendChild(li_temp2);
			}
		}
	}
		
	if (nexts == 1 && here > 2)
	{
		li_temp3 = create_indice_page(here, here - 1);
		ul.appendChild(li_temp3);
	}

	li = create_indice_page(here, here);
	//pagination.push(li);
	ul.appendChild(li);

	if (nexts > 0)
	{
		li1 = create_indice_page(here, here + 1);
		//pagination.push(li1);
		ul.appendChild(li1);
		if (nexts > 1)
		{
			li2 = create_indice_page(here, here + 2);
			//pagination.push(li2);
			ul.appendChild(li2);
		}

		li_n = create_next_btn(here + 1);
		//pagination.push(li_n);
		ul.appendChild(li_n);
	}

	return ul;
}

const create_indice_page = function (from, to){
	li = document.createElement("li");
	li.className = "page-item";

	button = document.createElement("button");
	button.className = "page-link page_btn";
	button.id = `page${from}goto#page_${to}`; 
	button.innerHTML = to;

	li.appendChild(button);

	return li;
}

const create_previously_btn = function (indice){
	li = document.createElement("li");
	li.className = "page-item";

	button = document.createElement("button");
	button.className = "page-link btn_prev";
	button.id = "prev#page_" + indice;
	button.innerHTML = "Anterior";

	li.appendChild(button);

	return li;
}

const create_next_btn = function (indice){
	li = document.createElement("li");
	li.className = "page-item";

	button = document.createElement("button");
	button.className = "page-link btn_next";
	button.id = "next#page_" + indice;
	button.innerHTML = "Próximo";

	li.appendChild(button);

	return li;
}

function open_page (id_page, link)
{
	pages = document.getElementsByClassName("pages");
	for (page of pages)
	{
		page.classList.remove("active");
		page.style.display = "none";
	}

	curr_page = document.getElementById(id_page);
	curr_page.style.display = "block";
	curr_page.className += " active";
}
