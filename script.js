document.addEventListener('DOMContentLoaded', function () {

    // --- Animações ao Scroll (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.initial-hidden');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Adiciona uma classe específica para o icon do diferencial para ativar o bounceIn
                // Se você quiser que o bounceIn seja a animação padrão para `.initial-hidden` nos diferenciais,
                // pode remover esta linha e adicionar `animation: bounceIn 1s forwards;` diretamente ao `.initial-hidden`
                // ou a uma classe específica para os diferenciais no CSS.
                // Como estamos usando `fade-in-scale-up` para os diferenciais, o bounceIn não será ativado por esta lógica.
                // Se quiser o bounceIn para eles, teríamos que ajustar o CSS ou a lógica aqui.
                // Por enquanto, a animação principal para eles é `fade-in-scale-up`.
                observer.unobserve(entry.target); // Para de observar depois que anima
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Animação inicial para o conteúdo da Hero Section ---
    // Estes elementos já têm `initial-hidden` e `delay-X` no HTML.
    // O `setTimeout` garante que eles apareçam com um pequeno atraso ao carregar a página,
    // mesmo antes de qualquer scroll.
    const heroTitle = document.querySelector('#hero h1');
    const heroParagraph = document.querySelector('#hero p.lead');
    const heroButton = document.querySelector('#hero .btn');

    if (heroTitle) {
        setTimeout(() => { heroTitle.classList.add('visible'); }, 500);
    }
    if (heroParagraph) {
        setTimeout(() => { heroParagraph.classList.add('visible'); }, 800);
    }
    if (heroButton) {
        setTimeout(() => { heroButton.classList.add('visible'); }, 1200);
    }


    // --- Scroll Suave para os links do menu ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                // Scroll suave
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Fechar o menu hamburguer após clicar em um link (apenas para mobile)
                const navbarCollapse = document.getElementById('navbarNav');
                // Verifica se o Bootstrap 5 está carregado e se o elemento é um colapso
                if (navbarCollapse && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

});