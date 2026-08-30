/* =========================================================
   PREMIUM FLOATING NAVIGATION
   Version 1.0
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CREATE HTML
       ===================================================== */

    const navigation = document.createElement("div");

    navigation.className = "pfn-container";

    navigation.innerHTML = `

        <!-- KE ATAS -->
        <button
            type="button"
            class="pfn-button"
            id="pfnUp"
            aria-label="Kembali ke atas">

            <span class="pfn-progress"></span>

            <span class="pfn-icon">
                ↑
            </span>

            <span class="pfn-tooltip">
                Ke atas
            </span>

        </button>


        <!-- PEMBATAS -->
        <span class="pfn-separator"></span>


        <!-- KE BAWAH -->
        <button
            type="button"
            class="pfn-button"
            id="pfnDown"
            aria-label="Pergi ke bawah">

            <span class="pfn-icon">
                ↓
            </span>

            <span class="pfn-tooltip">
                Ke bawah
            </span>

        </button>

    `;


    document.body.appendChild(navigation);


    /* =====================================================
       ELEMENT
       ===================================================== */

    const btnUp =
        document.getElementById("pfnUp");

    const btnDown =
        document.getElementById("pfnDown");

    const progress =
        btnUp.querySelector(".pfn-progress");


    /* =====================================================
       SCROLL TO TOP
       ===================================================== */

    btnUp.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /* =====================================================
       SCROLL TO BOTTOM
       ===================================================== */

    btnDown.addEventListener("click", function () {

        window.scrollTo({

            top: document.documentElement.scrollHeight,

            behavior: "smooth"

        });

    });


    /* =====================================================
       UPDATE SCROLL
       ===================================================== */

    function updateNavigation() {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement.scrollHeight;


        const windowHeight =
            window.innerHeight;


        const maxScroll =
            documentHeight - windowHeight;


        /* ---------------------------------------------
           PERSENTASE SCROLL
        --------------------------------------------- */

        let percentage = 0;


        if (maxScroll > 0) {

            percentage =
                (scrollTop / maxScroll) * 100;

        }


        percentage =
            Math.max(
                0,
                Math.min(100, percentage)
            );


        /* ---------------------------------------------
           PROGRESS RING
        --------------------------------------------- */

        progress.style.setProperty(
            "--pfn-progress",
            percentage + "%"
        );


        /* ---------------------------------------------
           BUTTON UP
        --------------------------------------------- */

        if (scrollTop <= 80) {

            btnUp.style.opacity = "0.45";

        } else {

            btnUp.style.opacity = "1";

        }


        /* ---------------------------------------------
           BUTTON DOWN
        --------------------------------------------- */

        if (scrollTop >= maxScroll - 50) {

            btnDown.style.opacity = "0.45";

        } else {

            btnDown.style.opacity = "1";

        }

    }


    /* =====================================================
       SCROLL EVENT
       ===================================================== */

    let ticking = false;


    window.addEventListener(
        "scroll",
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    function () {

                        updateNavigation();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        updateNavigation
    );


    /* =====================================================
       INITIAL UPDATE
       ===================================================== */

    updateNavigation();


})();
