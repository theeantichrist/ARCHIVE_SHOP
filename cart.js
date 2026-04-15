document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'archive_cart';
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartBtn = document.getElementById('empty-cart');

    function loadCart() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (err) {
                console.error('Invalid cart data in localStorage', err);
            }
        }

        if (window.name) {
            try {
                return JSON.parse(window.name);
            } catch (err) {
                console.error('Invalid cart data in window.name', err);
            }
        }

        return [];
    }

    function saveCart(cart) {
        const payload = JSON.stringify(cart);
        try {
            localStorage.setItem(STORAGE_KEY, payload);
        } catch (err) {
            console.warn('Unable to save cart to localStorage', err);
        }
        window.name = payload;
    }

    function renderCart() {
        let cart = loadCart();
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:30px;">Your cart is empty.</td></tr>';
            totalPriceElement.innerText = '€0.00';
            return;
        }

        cart.forEach(item => {
            const rowTotal = item.price * item.quantity;
            total += rowTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>€${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>€${rowTotal.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceElement.innerText = `€${total.toFixed(2)}`;
    }

    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', () => {
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (err) {
                console.warn('Unable to clear localStorage', err);
            }
            window.name = '';
            renderCart();
        });
    }

    renderCart();
});