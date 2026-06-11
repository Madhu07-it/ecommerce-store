let products = [];
let cart = [];

fetch("/products")
.then(res => res.json())
.then(data => {
  products = data;
  displayProducts(products);
});

function displayProducts(data){

  const container =
  document.getElementById("products");

  container.innerHTML = "";

  data.forEach(product => {

    container.innerHTML += `
      <div class="card">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>
      </div>
    `;
  });
}

function addToCart(id){

  const product =
  products.find(p => p.id === id);

  const existing =
  cart.find(item => item.id === id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({...product, qty:1});
  }

  renderCart();
}

function renderCart(){

  const cartList =
  document.getElementById("cart");

  let total = 0;

  cartList.innerHTML = "";

  cart.forEach(item => {

    total += item.price * item.qty;

    cartList.innerHTML += `
      <li>
        ${item.name}
        (${item.qty})

        <button onclick="increase(${item.id})">+</button>
        <button onclick="decrease(${item.id})">-</button>
      </li>
    `;
  });

  document.getElementById("total")
  .innerText = `Total: ₹${total}`;
}

function increase(id){

  const item =
  cart.find(i => i.id === id);

  item.qty++;

  renderCart();
}

function decrease(id){

  const item =
  cart.find(i => i.id === id);

  item.qty--;

  if(item.qty <= 0){
    cart = cart.filter(i => i.id !== id);
  }

  renderCart();
}

document.getElementById("search")
.addEventListener("input", e => {

  const value =
  e.target.value.toLowerCase();

  displayProducts(
    products.filter(p =>
      p.name.toLowerCase().includes(value)
    )
  );
});

document.getElementById("filter")
.addEventListener("change", e => {

  const category = e.target.value;

  if(category === "all"){
    displayProducts(products);
  }else{
    displayProducts(
      products.filter(
        p => p.category === category
      )
    );
  }
});