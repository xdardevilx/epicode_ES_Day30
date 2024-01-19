const form = document.getElementById("product-form");
const newName = document.getElementById("name");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const img = document.getElementById("img");
const price = document.getElementById("price");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDA5MzE4N2U1YzAwMTgxNGM2MWYiLCJpYXQiOjE3MDU2NjIyMTQsImV4cCI6MTcwNjg3MTgxNH0.FA8KAYmJ9TzN___iR9LYQx16Xl9nB7ASL-rMDShwx9o";

const fetchFunction = function () {
  const newProducts = {
    name: newName.value,
    description: description.value,
    brand: brand.value,
    imageUrl: img.value,
    price: price.value,
  };
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(newProducts),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(newName.value);
  fetchFunction();
});

