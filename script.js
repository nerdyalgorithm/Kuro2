document.addEventListener("DOMContentLoaded", function() {
    // TAB SWITCHING FOR WORK SECTION (only on index.html)
    if (document.querySelector(".tabs")) {
        const tabs = document.querySelectorAll(".tab-btn");
        const contents = document.querySelectorAll(".work-content");

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(content => content.classList.remove("active"));

                tab.classList.add("active");
                document.getElementById(tab.dataset.target).classList.add("active");
            });
        });
    }

    // LOAD STYLING INSPO IMAGES (index.html only)
    const stylingInspoGallery = document.getElementById("styling-inspo-gallery");
    if (stylingInspoGallery) {
        const totalInspoImages = 31; // Total number of inspo images
        let stylingImages = [];

        // Dynamically generate image paths
        for (let i = 1; i <= totalInspoImages; i++) {
            stylingImages.push(`inspo${i}.jfif`);
        }

        // Load images into the gallery
        stylingImages.forEach((image, index) => {
            let img = document.createElement("img");
            img.src = `images/styling_inspo/${image}`;
            img.alt = `Styling Inspiration ${index + 1}`;
            img.dataset.index = index;
            img.addEventListener("click", () => openLightbox(index, stylingImages.map(img => `images/styling_inspo/${img}`)));
            stylingInspoGallery.appendChild(img);
        });
    }

    // LOAD FORMAL RAGE IMAGES (formal-rage.html only)
    const formalRageFullGallery = document.getElementById("formal-rage-full-gallery");
    if (formalRageFullGallery) {
        let personalProjectImages = [];
        for (let i = 1; i <= 15; i++) {
            let img = document.createElement("img");
            img.src = `images/personal_projects/formal_rage/work${i}.jfif`;
            img.alt = `Formal Rage ${i}`;
            img.dataset.index = i - 1;
            personalProjectImages.push(img.src);
            img.addEventListener("click", () => openLightbox(i - 1, personalProjectImages));
            formalRageFullGallery.appendChild(img);
        }
    }

    // LIGHTBOX FUNCTIONALITY (shared across pages)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const closeBtn = document.getElementById("close-btn");

    let currentIndex = 0;
    let currentImages = [];

    function openLightbox(index, images) {
        currentIndex = index;
        currentImages = images;
        lightboxImg.src = currentImages[currentIndex];
        lightbox.style.display = "flex";
    }

    function closeLightbox() {
        lightbox.style.display = "none";
    }

    function changeImage(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = currentImages.length - 1; // Loop to end
        else if (currentIndex >= currentImages.length) currentIndex = 0; // Loop to start
        lightboxImg.src = currentImages[currentIndex];
    }

    // Event listeners
    prevBtn.addEventListener("click", () => changeImage(-1));
    nextBtn.addEventListener("click", () => changeImage(1));
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") changeImage(-1);
            else if (e.key === "ArrowRight") changeImage(1);
            else if (e.key === "Escape") closeLightbox();
        }
    });
});