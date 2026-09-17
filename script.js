// State Management Keranjang
let cart = [];

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');

const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');

// Event Listeners Modal Keranjang
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Event Listeners Modal Login
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close modal ketika klik area gelap di luar modal
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
    if (e.target === loginModal) loginModal.style.display = 'none';
});

// Tambah Produk ke Keranjang
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseInt(e.target.getAttribute('data-price'));

        // Cek apakah item sudah ada di keranjang
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartUI();
        alert(`${name} berhasil ditambahkan ke keranjang!`);
    });
});

// Render/Update UI Keranjang
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888;">Keranjang Anda masih kosong.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalCount += item.quantity;

            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.quantity} x Rp${item.price.toLocaleString('id-ID')}</small>
                </div>
                <div>
                    <span>Rp${(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    <button class="cart-item-remove" onclick="removeItem(${index})">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    cartCount.innerText = totalCount;
    cartTotalPrice.innerText = `Rp${total.toLocaleString('id-ID')}`;
}

// Hapus Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Form Checkout ke WhatsApp
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Silakan pilih menu terlebih dahulu!');
        return;
    }

    const name = document.getElementById('cust-name').value;
    const address = document.getElementById('cust-address').value;

    let itemsListText = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        itemsListText += `- ${item.name} (${item.quantity}x) : Rp${subtotal.toLocaleString('id-ID')}\n`;
    });

    const waMessage = `Halo Lumpia Azaz Amam, saya ingin memesan:\n\n*Detail Pesanan:*\n${itemsListText}\n*Total:* Rp${total.toLocaleString('id-ID')}\n\n*Data Pemesan:*\nNama: ${name}\nAlamat/Catatan: ${address}`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waNumber = '62895389751177';

    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
});

// Form Login Dummy
document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Berhasil masuk!');
    loginModal.style.display = 'none';
});
