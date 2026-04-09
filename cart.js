const cartTable = document.getElementById('cart-content');
const totalDisplay = document.getElementById('grand-total');
const clearBtn = document.getElementById('clear-cart');

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('archive_cart')) || [];
    cartTable.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const rowTotal = item.price * item.quantity;
        total += rowTotal;
        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>€${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>€${rowTotal.toFixed(2)}</td>
            </tr>`;
    });
    totalDisplay.innerText = total.toFixed(2);
}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('archive_cart');
    loadCart();
});

loadCart();