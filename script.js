const checkBoxes = document.querySelectorAll('.filter-check');
const products = document.querySelectorAll('.product');
const buyButtons = document.querySelectorAll('.buy-btn');

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        const activeFilters = Array.from(checkBoxes)
            .filter(i => i.checked)
            .map(i => i.value);

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

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        
        let cart = JSON.parse(localStorage.getItem('archive_cart')) || [];
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('archive_cart', JSON.stringify(cart));
        alert(name + " added to your cart!");
    });
});