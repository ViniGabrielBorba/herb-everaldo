// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Fórmula 1 Shake Nutritivo",
        category: "nutricao",
        price: 89.90,
        image: "fas fa-coffee",
        description: "Shake nutritivo com proteína de soja"
    },
    {
        id: 2,
        name: "Chá Concentrado Herbalife",
        category: "energia",
        price: 45.90,
        image: "fas fa-leaf",
        description: "Chá concentrado para energia e bem-estar"
    },
    {
        id: 3,
        name: "Barra de Proteína",
        category: "fitness",
        price: 12.90,
        image: "fas fa-cookie-bite",
        description: "Barra rica em proteína para treinos"
    },
    {
        id: 4,
        name: "Multivitamínico",
        category: "nutricao",
        price: 67.90,
        image: "fas fa-pills",
        description: "Suplemento vitamínico completo"
    },
    {
        id: 5,
        name: "Termogênico",
        category: "peso",
        price: 78.90,
        image: "fas fa-fire",
        description: "Suplemento termogênico para queima de gordura"
    },
    {
        id: 6,
        name: "Creme Facial",
        category: "beleza",
        price: 95.90,
        image: "fas fa-spa",
        description: "Creme facial hidratante e nutritivo"
    },
    {
        id: 7,
        name: "Whey Protein",
        category: "fitness",
        price: 125.90,
        image: "fas fa-dumbbell",
        description: "Proteína em pó para ganho de massa muscular"
    },
    {
        id: 8,
        name: "Óleo de Coco",
        category: "nutricao",
        price: 32.90,
        image: "fas fa-tint",
        description: "Óleo de coco extra virgem"
    },
    {
        id: 9,
        name: "Energético Natural",
        category: "energia",
        price: 55.90,
        image: "fas fa-bolt",
        description: "Bebida energética natural"
    },
    {
        id: 10,
        name: "Shampoo Nutritivo",
        category: "beleza",
        price: 42.90,
        image: "fas fa-shower",
        description: "Shampoo com ingredientes naturais"
    },
    {
        id: 11,
        name: "Óleo de Argan",
        category: "beleza",
        price: 68.90,
        image: "fas fa-seedling",
        description: "Óleo de argan para cabelo e pele"
    },
    {
        id: 12,
        name: "Aminoácidos",
        category: "fitness",
        price: 89.90,
        image: "fas fa-dna",
        description: "Aminoácidos essenciais para recuperação"
    },
    // Produtos de promoção
    {
        id: 100,
        name: "Kit Início Saudável",
        category: "promocao",
        price: 280.00,
        image: "fas fa-gift",
        description: "Shake Fórmula 1 + Chá Concentrado + Multivitamínico"
    },
    {
        id: 101,
        name: "Combo Energia Total",
        category: "promocao",
        price: 220.00,
        image: "fas fa-bolt",
        description: "Chá Concentrado + N-R-G + Thermo Complete"
    },
    {
        id: 102,
        name: "Proteína para Atletas",
        category: "promocao",
        price: 180.00,
        image: "fas fa-dumbbell",
        description: "Whey Protein Herbalife + Coqueteleira exclusiva"
    }
];

// Estado do carrinho
let cart = [];
let currentSlide = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProducts();
    initializeCart();
    initializeTestimonials();
    initializeContactForm();
    initializeAnimations();
    initializeSearch();
    initializeSort();
    initializePagination();
    initializeFAQ();
});

// Navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Menu hambúrguer mobile
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (hamburger && !hamburger.contains(e.target) && navMenu && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Produtos
function initializeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (productsGrid) {
        // Renderiza todos os produtos
        renderProducts(products);
    }
    
    // Filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active ao botão clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            const filteredProducts = filter === 'all' 
                ? products 
                : products.filter(product => product.category === filter);
            
            renderProducts(filteredProducts);
        });
    });
}

function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Adicionar ao Carrinho
            </button>
        </div>
    `;
    return card;
}

function getCategoryName(category) {
    const categories = {
        'nutricao': 'Nutrição',
        'energia': 'Energia',
        'peso': 'Controle de Peso',
        'fitness': 'Fitness',
        'beleza': 'Beleza'
    };
    return categories[category] || category;
}

// Carrinho
function initializeCart() {
    updateCartUI();
    
    // Event listeners para o carrinho
    const cartFloat = document.getElementById('cartFloat');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartFloat) {
        cartFloat.addEventListener('click', showCart);
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', hideCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Fecha modal ao clicar fora
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                hideCart();
            }
        });
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Produto adicionado ao carrinho!');
    
    // Animação do botão
    const button = event.target.closest('.add-to-cart');
    if (button) {
        button.style.background = 'var(--secondary-green)';
        button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        
        setTimeout(() => {
            button.style.background = 'var(--primary-green)';
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
        }, 2000);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCartItems();
    showNotification('Produto removido do carrinho!');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartUI();
            renderCartItems();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        // Animação do contador
        cartCount.style.animation = 'none';
        setTimeout(() => {
            cartCount.style.animation = 'bounce 0.5s ease-in-out';
        }, 10);
    }
    
    // Mostra/oculta carrinho flutuante
    const cartFloat = document.getElementById('cartFloat');
    if (cartFloat) {
        if (totalItems > 0) {
            cartFloat.style.display = 'flex';
        } else {
            cartFloat.style.display = 'none';
        }
    }
}

function showCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.add('show');
        renderCartItems();
        document.body.style.overflow = 'hidden';
    }
}

function hideCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <i class="${item.image}"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" class="quantity-input" value="${item.quantity}" 
                       min="1" onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Atualiza total
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = getCartTotal().toFixed(2);
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!');
        return;
    }
    
    const total = getCartTotal();
    const message = `Olá! Gostaria de finalizar minha compra:\n\n${cart.map(item => 
        `${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    hideCart();
    showNotification('Redirecionando para WhatsApp...');
}

// Depoimentos/Carrossel
function initializeTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (slides.length > 0) {
        // Auto-play do carrossel
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return;
    
    // Remove active da slide atual
    slides[currentSlide].classList.remove('active');
    
    // Calcula nova posição
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Adiciona active à nova slide
    slides[currentSlide].classList.add('active');
}

// Formulário de contato
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simula envio do formulário
            showNotification('Mensagem enviada com sucesso!');
            form.reset();
        });
    }
}

// FAQ
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                // Fecha outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        if (otherAnswer) otherAnswer.style.display = 'none';
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle item atual
                item.classList.toggle('active');
                
                if (answer) {
                    if (answer.style.display === 'block') {
                        answer.style.display = 'none';
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    } else {
                        answer.style.display = 'block';
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    }
                }
            });
        }
    });
}

// Busca
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
}

function filterProducts(searchTerm = '') {
    const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    let filteredProducts = products;
    
    // Aplica filtro de categoria
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentFilter);
    }
    
    // Aplica busca por texto
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            getCategoryName(product.category).toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Ordenação
function initializeSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }
}

function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'category':
            sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
            break;
    }
    
    renderProducts(sortedProducts);
}

// Paginação
let currentPage = 1;
const itemsPerPage = 6;

function initializePagination() {
    // Paginação será implementada se necessário
}

// Filtro por categoria
function filterByCategory(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    filterProducts();
}

// Animações
function initializeAnimations() {
    // Animação de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-bottom');
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.highlight-card, .product-card, .feature, .testimonial-slide');
    animatedElements.forEach(el => observer.observe(el));
}

// Utilitários
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message) {
    // Cria notificação temporária
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideInFromRight 0.3s ease-out;
        font-family: 'Poppins', sans-serif;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideInFromRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Event listeners adicionais
document.addEventListener('click', (e) => {
    // Carrinho flutuante
    if (e.target.closest('.cart-float')) {
        showCart();
    }
    
    // Botões de adicionar ao carrinho (produtos normais)
    if (e.target.closest('.add-to-cart')) {
        const button = e.target.closest('.add-to-cart');
        const productId = button.getAttribute('data-product-id');
        
        if (productId) {
            addToCart(parseInt(productId));
        }
        
        button.style.background = 'var(--secondary-green)';
        button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        
        setTimeout(() => {
            button.style.background = 'var(--primary-green)';
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
        }, 2000);
    }
    
    // Botões de promoção
    if (e.target.closest('.promotion-btn')) {
        const button = e.target.closest('.promotion-btn');
        const productId = button.getAttribute('data-product-id');
        
        if (productId) {
            addToCart(parseInt(productId));
        }
        
        button.style.background = 'var(--secondary-green)';
        button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        
        setTimeout(() => {
            button.style.background = 'var(--primary-green)';
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
        }, 2000);
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image i');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce ao scroll
const debouncedScroll = debounce(() => {
    // Lógica de scroll otimizada aqui
}, 10);

window.addEventListener('scroll', debouncedScroll);
