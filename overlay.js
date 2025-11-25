document.addEventListener('DOMContentLoaded', function() {
    // === SELECTORES DE ELEMENTOS ===
    const toggleBtn = document.querySelector('.menu-toggle-btn');
    const menu = document.querySelector('.menu-lateral');
    const header = document.getElementById('main-header'); // Asegúrate de que tu <header> tenga este ID.
    const visibleClass = 'is-visible'; // Clase para mostrar el botón de toggle.
    
    // 1. Crear dinámicamente el elemento de fondo oscuro (overlay)
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // === LÓGICA DE APERTURA/CIERRE (CORTINA) ===

    /**
     * Función que añade o quita la clase 'is-active'
     * para deslizar el menú y mostrar/ocultar el overlay.
     */
    function toggleMenu() {
        menu.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
    }

    // Eventos de clic para abrir/cerrar
    toggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Opcional: Cerrar menú si se hace clic en un enlace de navegación final
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cierra si el enlace tiene un destino (no es solo #, asume que es una navegación final)
            if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
                 menu.classList.remove('is-active');
                 overlay.classList.remove('is-active');
            }
        });
    });


    // === LÓGICA DE VISIBILIDAD DEL BOTÓN POR SCROLL ===

    /**
     * Función que controla la visibilidad del botón de toggle lateral
     * basándose en la posición del header.
     */
    function toggleMenuButtonVisibility() {
        // Solo ejecuta si el header existe y no estamos dentro de un menú abierto
        if (!header) {
            // Si no se encuentra el header, salimos para evitar errores
            return;
        }

        // Calcula la posición: Si hemos bajado más allá de la altura total del header
        if (window.scrollY > header.offsetHeight) {
            // Header invisible: Mostramos el botón
            toggleBtn.classList.add(visibleClass);
        } else {
            // Header visible: Ocultamos el botón
            toggleBtn.classList.remove(visibleClass);
        }
    }

    // Ejecutar la función en cada evento de scroll
    window.addEventListener('scroll', toggleMenuButtonVisibility);

    // Ejecutar una vez al cargar la página (por si la página se carga ya con scroll)
    toggleMenuButtonVisibility();
});