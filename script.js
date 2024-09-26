
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


particlesJS('particles-js', {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 700
            }
        },
        color: {
            value: "#3B9E51"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 1,
                color: "#999999"
            },
        },
        opacity: {
            value: 0.3,
            random: false,
        },
        size: {
            value: 7,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6cad7c",
            opacity: 0.5,
            width: 2
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
    },
    retina_detect: true
});

document.getElementById('mobile-menu-toggle').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('mobile-menu').classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// TIENDA
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
            }
        });
    }

    const el = document.getElementById("imgHome");
const height = el.clientHeight;
const width = el.clientWidth;

el.addEventListener('mousemove', (evt) => {
    const { layerX, layerY } = evt;

    const yRotation = (
        (layerX - width / 2) / width
    ) * 20;

    const xRotation = (
        (layerY - height / 2) / height
    ) * 20;

    // Usar backticks para interpolar las variables en la cadena
    const string = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    el.style.transform = string;
});

// Resetear la rotación cuando el mouse salga de la imagen
el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
});


    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    let totalPrice = 0; // Para mantener el precio total

    function showItem(index) {
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    // Muestra el primer ítem al cargar
    showItem(currentIndex);

    const pricePerUnit = 900.00; // Precio por unidad
    const quantityInput = document.getElementById('quantity-input');
    const totalPriceDisplay = document.getElementById('total-price');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');

    // Función para formatear el precio con comas
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Función para actualizar el precio total
    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = (quantity * pricePerUnit).toFixed(2);
        totalPriceDisplay.innerText = `$${formatPrice(totalPrice)} MXN`;
    }

    // Inicializa el precio total
    updateTotalPrice();

    // Evento para aumentar la cantidad
    incrementBtn.addEventListener('click', function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity < 20) {
            quantity += 1;
            quantityInput.value = quantity;
            updateTotalPrice();
        }
    });

    // Evento para disminuir la cantidad
    decrementBtn.addEventListener('click', function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            quantity -= 1;
            quantityInput.value = quantity;
            updateTotalPrice();
        }
    });

    // Agregar SweetAlert al botón "COMPRAR AHORA"
    document.getElementById('add-to-cart').addEventListener('click', function () {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = (quantity * pricePerUnit).toFixed(2); // Calcula el total

        // Verificar si el precio total es 0
        if (totalPrice === "0.00") {
            Swal.fire({
                title: 'Error',
                text: 'Debes seleccionar productos para realizar un pedido.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Pedido realizado',
                text: 'Se ha enviado la solicitud de tu pedido.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Reiniciar las variables a 0
                    quantityInput.value = 0; // Reinicia el input
                    updateTotalPrice(); // Actualiza el precio total
                }
            });
        }
    });

});
