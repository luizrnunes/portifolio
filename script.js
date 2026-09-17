document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TEMA CLARO / ESCURO
    ====================================================== */

    const themeButton = document.getElementById("theme-button");
    const savedTheme = localStorage.getItem("portfolio-theme");


    function updateThemeButton() {

        if (!themeButton) {
            return;
        }

        const isDark =
            document.body.classList.contains("dark-theme");

        themeButton.textContent =
            isDark ? "☀" : "☾";

        themeButton.setAttribute(
            "aria-label",
            isDark
                ? "Ativar tema claro"
                : "Ativar tema escuro"
        );

    }


    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }


    updateThemeButton();


    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-theme");

            const isDark =
                document.body.classList.contains("dark-theme");

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            updateThemeButton();

        });

    }


    /* =====================================================
       MENU ATIVO
    ====================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav a");


    function updateActiveMenu() {

        let currentSection = "inicio";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });


        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveMenu,
        { passive: true }
    );


    updateActiveMenu();


    /* =====================================================
       ANIMAÇÃO DAS SEÇÕES
    ====================================================== */

    const elementsToReveal =
        document.querySelectorAll(
            ".projects-section, " +
            ".about-section, " +
            ".experience-section, " +
            ".stats-section, " +
            ".contact-section, " +
            ".footer"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        elementsToReveal.forEach((element) => {
            element.classList.add("visible");
        });

    } else {

        elementsToReveal.forEach((element) => {
            element.classList.add("reveal");
        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.08
                }
            );


        elementsToReveal.forEach((element) => {
            revealObserver.observe(element);
        });

    }


    /* =====================================================
       BARRAS DE HABILIDADES
    ====================================================== */

    const skillBars =
        document.querySelectorAll(".skill-bar span");


    skillBars.forEach((bar) => {

        const finalWidth =
            bar.style.width;


        if (reducedMotion) {

            bar.style.width = finalWidth;
            return;

        }


        bar.style.width = "0";


        const observer =
            new IntersectionObserver(
                (entries, currentObserver) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        setTimeout(() => {

                            bar.style.width =
                                finalWidth;

                        }, 150);

                        currentObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.4
                }
            );


        observer.observe(bar);

    });


    /* =====================================================
       ANO AUTOMÁTICO
    ====================================================== */

    const currentYear =
        document.getElementById("current-year");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
    ====================================================== */

    const backTop =
        document.querySelector(".back-top");


    if (backTop) {

        backTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: reducedMotion
                        ? "auto"
                        : "smooth"
                });

            }
        );

    }


    /* =====================================================
       SCROLL SUAVE
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: reducedMotion
                        ? "auto"
                        : "smooth",
                    block: "start"
                });

            }
        );

    });

});