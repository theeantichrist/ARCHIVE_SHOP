const checkBoxes = document.querySelectorAll('.filter-check');
const products = document.querySelectorAll('.product');
const buyBtns = document.querySelectorAll('.buy-btn');

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        const activeFilters = Array.from(checkBoxes).filter(i => i.checked).map(i => i.value);
        products.forEach(product => {
            const category = product.dataset.category;
            if (activeFilters.includes('all') || activeFilters.includes(category)) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    });
});

buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        let cart = JSON.parse(localStorage.getItem('archive_cart')) || [];
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        localStorage.setItem('archive_cart', JSON.stringify(cart));
        alert(name + " added to cart!");
    });
});