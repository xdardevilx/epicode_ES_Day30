let road = new URL(document.location).searchParams;
let params = road.get("productID");
console.log(params);
const myUrl = "https://striveschool-api.herokuapp.com/api/product/";

const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDA5MzE4N2U1YzAwMTgxNGM2MWYiLCJpYXQiOjE3MDU2NjIyMTQsImV4cCI6MTcwNjg3MTgxNH0.FA8KAYmJ9TzN___iR9LYQx16Xl9nB7ASL-rMDShwx9o";

const addCard = function (imageUrl, nome, brand, description, prezzo) {
  const row = document.getElementById("products-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-5", "border", "p-3");
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
          <div class="d-flex justify-content-center mx-3 mb-3  ">
            <button           
            id="edit-button"
              type="button"
              class="btn btn-warning">
              Modifica
            </button> 

            <button          
            id="delete-button"
              type="button"
              class="btn btn-danger ms-3 ">
              Elimina
            </button>           
      </div>`;
};
const fetchFunction = function () {
  fetch(url + "/" + params, {
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
    .then((product) => {
      console.log(product);
      addCard(
        product.imageUrl,
        product.name,
        product.brand,
        product.description,
        product.price
      );
      editButton();
    });
};
const addForm = function () {
  const row = document.getElementById("products-row");
  const newCol = document.createElement("div");
  const card = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-5", "border", "p-3");
  card.classList.add("mb-4", "shadow-sm");
  row.appendChild(newCol);
  newCol.appendChild(card);
  card.innerHTML = `
  <form id="edit-form">
            <div class="mb-3">
              <label for="productname" class="form-label"
                >Inserisci il Nome prodotto</label
              >
              <input
                type="text"
                class="form-control"
                id="productname"
                aria-describedby="name"
                required />
            </div>

            <div class="mb-3">
              <label for="description" class="form-label"
                >Inserisci la Descrizione dell'articolo</label
              >
              <input
                type="text"
                class="form-control"
                id="description"
                required />
            </div>
            <div class="mb-3">
              <label for="brand" class="form-label"
                >Inserisci la marca dell'articolo</label
              >
              <input type="text" class="form-control" id="brand" required />
            </div>
            <div class="mb-3">
              <label for="image Src" class="form-label"
                >Inserisci la Sorgente dell'immagine ...jpeg,png</label
              >
              <input type="text" class="form-control" id="imageSrc" required />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label"
                >Inserisci il prezzo dell'articolo</label
              >
              <input type="number" class="form-control" id="price" required />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1"
                >Conferma</label
              >
            </div>
            <button type="submit" class="btn btn-primary">Salva</button>
          </form>`;
};

const takeElemnt = (product) => {
  let productName = document.getElementById("productname");
  let description = document.getElementById("description");
  let brand = document.getElementById("brand");
  let img = document.getElementById("imageSrc");
  let price = document.getElementById("price");

  productName.value = product.name;
  description.value = product.description;
  brand.value = product.brand;
  img.value = product.imageUrl;
  price.value = product.price;
};

const editButton = function () {
  const button = document.getElementById("edit-button");
  button.addEventListener("click", (e) => {
    e.preventDefault;
    addForm();

    const form = document.getElementById("edit-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const productName = document.getElementById("productname");
      const description = document.getElementById("description");
      const brand = document.getElementById("brand");
      const img = document.getElementById("imageSrc");
      const price = document.getElementById("price");
      const newProducts = {
        name: productName.value,
        description: description.value,
        brand: brand.value,
        imageUrl: img.value,
        price: price.value,
      };
      takeElemnt();

      fetch(url + "/" + params, {
        method: "PUT",
        body: JSON.stringify(newProducts),
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
        .then((response) => {
          console.log(response);
        });
    });
    // const newProducts = {
    //   name: productName.value,
    //   description: description.value,
    //   brand: brand.value,
    //   imageUrl: img.value,
    //   price: price.value,
    // }

    // fetch(url + "/" + params, {
    //   method: "PUT",
    //   // body: JSON.stringify(newProducts),
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Something went wrong");
    //     }
    //   })
    //   .then((product) => {
    // takeElemnt(product);

    //   });
  });
};

fetchFunction();
