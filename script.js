document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'archive_cart';
    const checkBoxes = document.querySelectorAll('.filter-check');
    const products = document.querySelectorAll('.product');
    const buyBtns = document.querySelectorAll('.buy-btn');

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

    checkBoxes.forEach(box => {
        box.addEventListener('change', () => {
            const activeFilters = Array.from(checkBoxes).filter(i => i.checked).map(i => i.value);
            const filters = activeFilters.length ? activeFilters : ['all'];

            products.forEach(product => {
                const category = product.dataset.category;
                if (filters.includes('all') || filters.includes(category)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

   
    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            let cart = loadCart();
            
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            saveCart(cart);
            
            const originalText = btn.innerText;
            btn.innerText = "ADDED!";
            setTimeout(() => { btn.innerText = originalText; }, 1000);
        });
    });
});