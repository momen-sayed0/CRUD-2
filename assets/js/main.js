let btn = document.querySelector('.test');
let inputs = document.querySelectorAll('#exampleModal input');
let editInputs = document.querySelectorAll('#editModal input');
let productRow = document.querySelector("#Products");
let checkout = document.querySelector('#checkout');
let total = document.querySelector('.total');
let spinner = document.querySelector('.Spinner');
let container = document.querySelector('.container');
// let formFile = document.querySelector('#formFile');
// let imageContainer = document.getElementById("images");

// localStorage.clear();
let allProducts = JSON.parse(localStorage.getItem('products')) || [];
let Cart = JSON.parse(localStorage.getItem('cart')) || [];

//  clear inputs after adding products
let clearInputs = () => {
     for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
     }
};

let readProducts = () => {
     productRow.innerHTML = "";
     allProducts.forEach((product, index) => {
          productRow.innerHTML +=
               `<div class="col-lg-4 col-md-6 mb-3 ">
                    <div class="card my-3">
                         <img src="${product.img }" class="card-img-top">
                         <div class="card-body">
                              <h4 class="card-title">${product.title}</h4>
                              <p class="card-text">
                                   <h5>Product Description :</h5>
                                   ${product.description}
                              </p>
                              <p class="card-text">
                                   <h5>Product Price :</h5> ${product.price} $
                              </p>
                              <div class="text-center">
                              <button onclick="addToCart(${index})" class="btn btn-primary"> Add to Cart</button>
                              <button onclick="deleteProduct(${index})" class="btn btn-danger"> Delete Product</button>
                              <button data-bs-toggle="modal" data-bs-target="#editModal" onclick="edit(${index})" class="btn btn-warning"> edit</button>
                              </div>
                         </div>
                    </div>
               </div>`
     });
     // preview();
};


// << =========  Delete Product =========== >> //
let deleteProduct = (id) => {
     allProducts.splice(id, 1);
     localStorage.setItem('products', JSON.stringify(allProducts));
     for (let i = 0; i < Cart.length; i++) {
          if (Cart[i].index == id) {
               Cart.splice(i, 1);
               localStorage.setItem('cart', JSON.stringify(Cart));
               createCart();
          }
     }
     readProducts();
};

// render Products
let renderProduct = () => {
     let product = {
          title: inputs[0].value,
          price: parseInt(inputs[1].value),
          description: inputs[2].value,
          img: inputs[3].value,
     };
     allProducts.push(product);
     localStorage.setItem('products', JSON.stringify(allProducts));
     readProducts();
     clearInputs();
};

// << ======= Cart ====== >> //
let addToCart = (id) => {
     if (Cart.some((element) => element.index === id)) {
          alert("product is already exists");
          return null;
     } else {
          Cart.push({
               index: id,
               amount: 1,
          });
          localStorage.setItem('cart', JSON.stringify(Cart));
          createCart();
     };
};

let createCart = () => {
     checkout.innerHTML = "";
     totalPrice = 0;
     Cart.forEach((element, index) => {
          checkout.innerHTML += `
     <div class="col-12">
                    <div class="row align-items-center">
                         <div class="col-2 py-4 ">
                              <img class="img-fluid rounded"
                                   src="${allProducts[element.index].img}" alt="">
                         </div>
                         <div class="col-6">
                              <p class="my-2"> Title : ${allProducts[element.index].title} </p>
                              <p class="my-2"> Price : ${allProducts[element.index].price} $ </p>
                              <p class="my-2"> Description : ${allProducts[element.index].description} </p>
                         </div>
                         <div class="col-2 pt-3 text-center">
                              <button onclick='increase(${index})' class="btn btnIncrease">
                                   <i class="fa-solid fa-chevron-up"></i>
                              </button>
                              <p class="para">${element.amount}</p>
                              <button onclick='decrease(${index})' class="btn btnDecrease">
                                   <i class="fa-solid fa-chevron-down"></i>
                              </button>
                         </div>
                         <div class="col-2 pt-3 text-center">
                              <button onclick='removeFromCart(${index})' class="btn btn-danger">
                              <i class="fa-solid fa-minus"></i> </button>
                         </div>
                    </div>
               </div>
     `;
          totalPrice += element.amount * allProducts[element.index].price;
     });
     total.innerText = `Total : ${totalPrice} $`;
};

let increase = (id) => {
     Cart[id].amount++;
     localStorage.setItem('cart', JSON.stringify(Cart));
     createCart();

}

let decrease = (id) => {
     if (Cart[id].amount == 1) {
          return null;
     } else {
          Cart[id].amount--;
          localStorage.setItem('cart', JSON.stringify(Cart));
          createCart();
     }
}

//  removeFromCart
let removeFromCart = (id) => {
     Cart.splice(id, 1);
     localStorage.setItem('cart', JSON.stringify(Cart));
     createCart();
}



// edit product
let ProductID;
let edit = (index) => {
     ProductID = index;
     let editProduct = allProducts[index];
     editInputs[0].value = editProduct.title;
     editInputs[1].value = editProduct.price;
     editInputs[2].value = editProduct.description;
     editInputs[3].value = editProduct.img;

}
// update local storage
let update = () => {
     let product = {
          title: editInputs[0].value,
          price: editInputs[1].value,
          description: editInputs[2].value,
          img: editInputs[3].value
     }
     allProducts[ProductID] = product;
     localStorage.setItem("products", JSON.stringify(allProducts));
     readProducts();
     createCart();


}




// Create a function to display the spinner.
window.onload = function () {
     function displaySpinner() {
          spinner.style.display = "block";
     }

     // Create a function to display the content.
     function displayContent() {
          container.style.display = "block";
     }

     // Display the spinner for 2 seconds, and then display the content.
     setTimeout(displayContent, 2000);
     displaySpinner();


     // hide the spinner 
     setTimeout(() => {
          spinner.style.display = "none";
     }, 2000);

};



readProducts();
createCart();