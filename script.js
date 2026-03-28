const checkBoxes = document.querySelectorAll('.filter-check');
const products = document.querySelectorAll('.product');

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