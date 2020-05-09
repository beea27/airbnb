window.addEventListener("load", chama_fetch);

function chama_fetch(){

  const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
  
  fetch(url)
  .then(response => response.json())
  .then(data => {

    card = document.getElementById("cards");

    card.appendChild(create_pages(data,5));
    
    console.log(data);
  })
  .catch(err => console.log(err));
}

function create_pages (data, num_card){
  content = document.createElement("div");
  content.className = "pages-struct";

  for (var i = 0; i < data.length/num_card; i += num_card){
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

    pagination = create_pagination (indice, data.length - indice);

    page.innerHTML = "";
    for (var j = i; j < (i+num_card); j++)
    {
      if (j == data.length)
        break;

      page.innerHTML += `
      <div class="media">
            <a href="${indice.photo}"><img src="${indice.photo}" class="align-self-center mr-3" id="photo"></a>
            <div class="media-body conteudo">
              <a href=""><h5 class="mt-0 conteudo"><b>${indice.property_type}</b></h5></a>
              <p>${indice.name}</p>
              <p class="mb-0 price">a partir de <b>R$${indice.price},00</b></p>
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
  ul.className = "pagination pagination-sm";

  if (here > 1)
  {
    li_p = create_previously_btn(here - 1);
    ul.appendChild(li_p);
  }

  li = create_indice_page(here);
  ul.appendChild(li);

  if (nexts > 0)
  {
    li1 = create_indice_page(here + 1);
    ul.appendChild(li1);
    if (nexts > 1)
    {
      li2 = create_indice_page(here + 2);
      ul.appendChild(li2);
    }

    li_n = create_next_btn(here + 1);
    ul.appendChild(li_n);
  }

  return ul;
}

const create_indice_page = function (indice){
  li = document.createElement("li");
  li.className = "page-item";

  a = document.createElement("a");
  a.className = "page-link";
  a.setAttribute("href", "page_" + indice);
  a.innerHTML = indice;

  li.appendChild(a);

  return li;
}

const create_previously_btn = function (indice){
  li = document.createElement("li");
  li.className = "page-item";

  a = document.createElement("a");
  a.className = "page-link";
  a.setAttribute("href", "page_" + indice);
  a.innerHTML = "Anterior";

  li.appendChild(a);

  return li;
}

const create_next_btn = function (indice){
  li = document.createElement("li");
  li.className = "page-item";

  a = document.createElement("a");
  a.className = "page-link";
  a.setAttribute("href", "page_" + indice);
  a.innerHTML = "Próximo";

  li.appendChild(a);

  return li;
}
