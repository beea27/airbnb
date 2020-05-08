const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

fetch(url)
  .then(response => response.json())
  .then(data => {

    let element = document.getElementById('cards');

    element.innerHTML = "";

    for(indice of data){
      element.innerHTML += 
      `
      <div class="media">
        <a href="${indice.photo}"><img src="${indice.photo}" class="align-self-center mr-3" id="photo"></a>
        <div class="media-body conteudo">
          <a href=""><h5 class="mt-0 conteudo"><b>${indice.property_type}</b></h5></a>
          <p>${indice.name}</p>
          <p class="mb-0 price">a partir de <b>R$${indice.price},00</b></p>
        </div>
      </div>
      `
    }

    element.innerHTML +=
    `
    <nav aria-label="Page navigation example" id="pages">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    `
    
    console.log(data);
  })
  .catch(err => console.log(err))