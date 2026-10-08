document.addEventListener("DOMContentLoaded", () => {
    // 1. DYNAMIC AUTO-TYPING ENGINE RULES
    const typingSpan = document.createElement("span");
    typingSpan.style.color = "#d4af37";
    typingSpan.style.fontWeight = "600";
    
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";
    cursorSpan.innerText = "|";

    const taglineElement = document.querySelector("aside .tagline");
    if (taglineElement) {
        taglineElement.innerHTML = "Helping leaders streamline operations, optimize workflows, and specialize in <br>";
        taglineElement.appendChild(typingSpan);
        taglineElement.appendChild(cursorSpan);
    }

    const rolesArray = ["Executive Support.", "Virtual Assistance.", "CRM Administration.", "Workflow Automation."];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const executeTypingLoop = () => {
        const currentRole = rolesArray[roleIndex];
        
        if (isDeleting) {
            typingSpan.innerText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.innerText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % rolesArray.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(executeTypingLoop, typingSpeed);
    };
    executeTypingLoop();

    // 2. ACTIVE NAVIGATION MENU HIGH-LIGHTER SCROLL LOOP
    const contentArea = document.querySelector(".content-area");
    const sectionsArray = document.querySelectorAll("main section");
    const navLinksArray = document.querySelectorAll("aside nav a");

    const trackScrollHighlight = () => {
        let activeSectionId = "";
        const scrollPosition = contentArea ? contentArea.scrollTop : window.scrollY;

        sectionsArray.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            if (scrollPosition >= sectionTop) {
                activeSectionId = section.getAttribute("id");
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    // 3. SMOOTH ENTRY REVEAL ON SCROLL FRAMEWORK
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => card.classList.add("reveal-card"));

    const triggerRevealScroll = () => {
        const triggerHeight = window.innerHeight * 0.85;

        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerHeight) {
                card.classList.add("visible");
            }
        });
    };

    // Attach listeners based on responsiveness layouts
    if (contentArea && window.innerWidth > 992) {
        contentArea.addEventListener("scroll", () => {
            trackScrollHighlight();
            triggerRevealScroll();
        });
    } else {
        window.addEventListener("scroll", () => {
            trackScrollHighlight();
            triggerRevealScroll();
        });
    }
    
    // Initial triggers
    trackScrollHighlight();
    setTimeout(triggerRevealScroll, 300);
});
