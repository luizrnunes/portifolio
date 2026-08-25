document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       TEMA CLARO / ESCURO
    ====================================================== */

    const themeButton = document.getElementById("theme-button");

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-theme");

        if (themeButton) {
            themeButton.textContent = "☀";
        }
    }


    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-theme");

            const isDark =
                document.body.classList.contains("dark-theme");


            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );


            themeButton.textContent =
                isDark ? "☀" : "☾";


            themeButton.setAttribute(
                "aria-label",
                isDark
                    ? "Ativar tema claro"
                    : "Ativar tema escuro"
            );

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


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    elementsToReveal.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       BARRAS DE HABILIDADES
    ====================================================== */

    const skillBars =
        document.querySelectorAll(
            ".skill-bar span"
        );


    skillBars.forEach((bar) => {

        const finalWidth =
            bar.style.width;


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
                    threshold: 0.5
                }
            );


        observer.observe(bar);

    });


    /* =====================================================
       ANO AUTOMÁTICO
    ====================================================== */

    const currentYear =
        document.getElementById(
            "current-year"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
    ====================================================== */

    const backTop =
        document.querySelector(
            ".back-top"
        );


    if (backTop) {

        backTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       FECHAR MENU / SCROLL SUAVE
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
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

});