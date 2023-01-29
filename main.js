let cart = document.querySelector('.cart');
document.querySelector('#cart-icon').onclick = () => {
    cart.classList.toggle('active');
    nbar.classList.remove('active');

}

let nbar = document.querySelector(".nbar");

document.querySelector('#menu-icon').onclick = () => {
    nbar.classList.toggle('active');
    cart.classList.remove('active');

}

window.onscroll = () => {
    nbar.classList.remove('active');
    cart.classList.remove('active');
}



var swiper = new Swiper(".new-arrival", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 0,
        },
        568: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // cart delete button

    var removeCartButton = document.getElementsByClassName('cart-remove')
    console.log(removeCartButton)
    for (var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i]
        button.addEventListener('click', removeCartItem)
    }

    //Quantity Change
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // add to cart 
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}

//   remove item from cart 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();

}

// Quantity Change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// add to cart 
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('prouduct-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();

}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-p-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }

    }

    var cartBoxContent = `
                         <img src="${productImg}" class="cart-img" alt="">
                          <div class="text">
                             <h3 class="cart-p-title">${title}</h3>
                              <span  class="cart-price">${price}</span>
                             <input type="number" value="1" class="cart-quantity">
                          </div>
                         <i class='bx bx-trash cart-remove'></i> `;



    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}


// update total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart')[0];
    var cartBoxes = cartContent.getElementsByClassName('box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    // if price contain some points 
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;

}







console.log('working')