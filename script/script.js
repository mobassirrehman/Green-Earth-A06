// Show/hide spinner
const manageSpinner = (show) => {
    if (show) {
      document.getElementById("spinner").classList.remove("hidden");
      document.getElementById("tree-container").classList.add("hidden");
    } else {
      document.getElementById("tree-container").classList.remove("hidden");
      document.getElementById("spinner").classList.add("hidden");
    }
  };

// load category
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        displayCategories(data.categories);
    });
};

// Display categories
const displayCategories = (categories) => {
    const container = document.getElementById("category-container");
    container.innerHTML = `
    <button id="btn-all" onclick="loadAllTrees()" class="category-btn w-full text-left px-4 py-2 rounded hover:bg-green-100 bg-green-600 text-white">
      All Trees
    </button>
  `;
  
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.id = `btn-${cat.id}`;
    btn.className = "category-btn w-full text-left px-4 py-2 rounded hover:bg-green-100";
    btn.onclick = () => loadTreesByCategory(cat.id);
    btn.innerText = cat.category_name;
    container.appendChild(btn);
  });
  
  loadAllTrees();
};

// remove active button
const removeActive = () => {
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.classList.remove("bg-green-600", "text-white");
    });
  };

// load all trees
const loadAllTrees = () => {
    manageSpinner(true);
    removeActive();
    document.getElementById("btn-all").classList.add("bg-green-600", "text-white");

    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
    //   console.log(data);
      displayTrees(data.plants);
    })
};

// Load trees by category
const loadTreesByCategory = (id) => {
    manageSpinner(true);
    removeActive();
    document.getElementById(`btn-${id}`).classList.add("bg-green-600", "text-white");
    
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Category plants:", data);
    
        if (data.plants && data.plants.length > 0) {
          displayTrees(data.plants);
        } else {
          displayTrees([]);
        }
      })
  };

// Display trees
const displayTrees = (trees) => {
    const container = document.getElementById("tree-container");
    container.innerHTML = "";
  
    if (!trees || trees.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center py-20 text-gray-500">No trees found</p>`;
      manageSpinner(false);
      return;
    }
    
    trees.forEach(tree => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-lg shadow-sm overflow-hidden";
      card.innerHTML = `
        <img src="${tree.image}" alt="${tree.name}" class="w-full h-48 object-cover">
        <div class="p-4 space-y-3">
          <h3 class="font-bold text-lg cursor-pointer hover:text-green-600" onclick="showDetails(${tree.id})">
            ${tree.name}
          </h3>
          <p class="text-sm text-gray-600">${tree.description || 'No description available'}</p>
          <div class="flex justify-between items-center">
            <span class="badge badge-ghost">${tree.category || 'Uncategorized'}</span>
            <span class="font-bold">৳${tree.price || 0}</span>
          </div>
          <button onclick="addToCart(${tree.id}, '${tree.name.replace(/'/g, "\\'")}', ${tree.price || 0})" 
                  class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      `;
      container.appendChild(card);
    });
    manageSpinner(false);
};

// cart functionality
let cartItems = [];
let totalPrice = 0;

// Add to cart
const addToCart = (id, name, price) => {
  if (cartItems.find(item => item.id === id)) {
    alert("Already in cart!");
    return;
  }
  
  cartItems.push({ id, name, price: price || 0 });
  updateCart();
};

// Remove from cart
const removeFromCart = (id) => {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
  };

// Update cart display
const updateCart = () => {
    const container = document.getElementById("cart-container");
    totalPrice = 0;
    
    if (cartItems.length === 0) {
      container.innerHTML = `<p class="text-center text-gray-500">Cart is empty</p>`;
    } else {
      container.innerHTML = "";
      cartItems.forEach(item => {
        totalPrice += item.price;
        const div = document.createElement("div");
        div.className = "flex justify-between items-center bg-gray-50 p-3 rounded";
        div.innerHTML = `
          <div>
            <p class="font-medium">${item.name}</p>
            <p class="text-sm">৳${item.price}</p>
          </div>
          <button onclick="removeFromCart(${item.id})" class="text-red-500">
            <i class="fa-solid fa-xmark"></i>
          </button>
        `;
        container.appendChild(div);
      });
    }
    
    document.getElementById("total-price").innerText = `৳${totalPrice}`;
  };
loadCategories();