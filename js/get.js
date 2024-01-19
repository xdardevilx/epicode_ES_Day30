const templateFunction = (imageUrl, nome, brand, description, prezzo, id) => {
  const row = document.getElementById("product-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-md-3");
  card.classList.add("card", "mb-4", "shadow-sm");
  row.appendChild(newCol);
  newCol.appendChild(card);
  card.innerHTML = `
        <img
        src="${imageUrl}"
        class="bd-placeholder-img card-img-top"/>
      <div class="card-body">
      <h3>${nome}</h3>
        <h5 class="card-title">${brand}</h5>
        <p class="card-text">${description}</p>
        </div>
          <small class="text-muted text-end me-2 pb-3  ">Prezzo - ${prezzo}€</small>
        </div>
        <div class="">
          <div class="btn-group d-flex justify-content-center mx-3 mb-3  ">
            <button
           
            id="view-button"
              type="button"
              class="btn  btn-info">
              <a class="text-decoration-none text-white" href="./details.html?productID=${id}">
              Anteprima</a>
            </button>   
      </div>
        `;
};

const fetchFunction = function () {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDA5MzE4N2U1YzAwMTgxNGM2MWYiLCJpYXQiOjE3MDU2NjIyMTQsImV4cCI6MTcwNjg3MTgxNH0.FA8KAYmJ9TzN___iR9LYQx16Xl9nB7ASL-rMDShwx9o";
  fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((products) => {
      console.log(products);
      products.forEach((product) => {
        templateFunction(
          product.imageUrl,
          product.name,
          product.brand,
          product.description,
          product.price,
          product._id
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
fetchFunction();
