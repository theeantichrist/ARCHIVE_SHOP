const cartTable = document.getElementById('cart-items');
const totalDisplay = document.getElementById('grand-total');
const clearBtn = document.getElementById('clear-cart');

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('archive_cart')) || [];
    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>€${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>€${subtotal.toFixed(2)}</td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    totalDisplay.innerText = total.toFixed(2);
}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('archive_cart');
    displayCart();
});

displayCart();