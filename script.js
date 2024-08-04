document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------- Skills --------------------------------------- */
    const skillData = [
        {
            name: "WEB",
            level: "Expert",
            color: "#FF6B6B",
            subSkills: ["HTML", "CSS", "JS", "React", "Node.js", "Next.js"]
        },
        {
            name: "AI",
            level: "Advanced",
            color: "#4ECDC4",
            subSkills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"]
        },
        {
            name: "CLOUD",
            level: "Intermediate",
            color: "#45B7D1",
            subSkills: ["AWS", "Docker", "Kubernetes"]
        },
        {
            name: "DATABASE",
            level: "Advanced",
            color: "#F9D56E",
            subSkills: ["SQL", "MongoDB", "Firebase"]
        },
        {
            name: "MOBILE",
            level: "Intermediate",
            color: "#FF8C42",
            subSkills: ["iOS"]
        }
    ];

    const skillContainer = document.querySelector('.skill-container');
    const tooltip = document.getElementById('skill-tooltip');

    skillData.forEach((skill, index) => {
        const skillCircle = createSkillCircle(skill, index);
        skillContainer.appendChild(skillCircle);
    });

    function createSkillCircle(skill, index) {
        const circle = document.createElement('div');
        circle.className = 'skill-circle';
        circle.style.setProperty('--skill-color', skill.color);

        const content = document.createElement('div');
        content.className = 'skill-content';
        content.innerHTML = `
        <div class="skill-title">${skill.name}</div>
        <div class="skill-level">${skill.level}</div>
    `;

        circle.appendChild(content);

        // Create sub-skills
        skill.subSkills.forEach((subSkill, subIndex) => {
            const subCircle = createSubSkillCircle(subSkill, subIndex, skill.subSkills.length);
            circle.appendChild(subCircle);
        });

        // Hover effects
        circle.addEventListener('mouseenter', () => showSubSkills(circle));
        circle.addEventListener('mouseleave', () => hideSubSkills(circle));

        // Tooltip
        circle.addEventListener('click', (e) => showTooltip(e, skill));

        return circle;
    }

    function createSubSkillCircle(subSkill, index, total) {
        const subCircle = document.createElement('div');
        subCircle.className = 'sub-skill';

        const angle = (index / total) * 2 * Math.PI;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        subCircle.style.transform = `translate(${x}px, ${y}px)`;

        const content = document.createElement('div');
        content.className = 'sub-skill-content';
        content.textContent = subSkill;

        subCircle.appendChild(content);

        return subCircle;
    }

    function showSubSkills(circle) {
        const subSkills = circle.querySelectorAll('.sub-skill');
        subSkills.forEach(subSkill => {
            subSkill.style.opacity = '1';
        });
    }

    function hideSubSkills(circle) {
        const subSkills = circle.querySelectorAll('.sub-skill');
        subSkills.forEach(subSkill => {
            subSkill.style.opacity = '0';
        });
    }

    function showTooltip(event, skill) {
        tooltip.innerHTML = `
        <h3>${skill.name}</h3>
        <p>Level: ${skill.level}</p>
        <p>Sub-skills: ${skill.subSkills.join(', ')}</p>
    `;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;

        document.addEventListener('click', hideTooltip);
    }

    function hideTooltip() {
        tooltip.style.display = 'none';
        document.removeEventListener('click', hideTooltip);
    }

    /* --------------------------------------------------------------------------*/

    // Background animation
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 0.1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(177, 156, 217, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 25) * (canvas.height / 25)) {
                    ctx.strokeStyle = 'rgba(177, 156, 217, 0.1)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Initialize and start the animation
    initParticles();
    animateParticles();

    // GSAP and ScrollTrigger initialization
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Custom cursor
    const cursor = document.querySelector("#cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });


    // Hover effect for buttons and cards
    const hoverElements = document.querySelectorAll('.btn, .project-card, .skill');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });

            // Update active navigation link
            document.querySelector('nav a.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate skill items
    gsap.from('.skill', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills-container',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero p');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });

    // Parallax effect for hero section
    gsap.to('.hero-background', {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});

// Update active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionHeight = section.offsetHeight;

        // For the last section, make sure to include the case where user has scrolled to the bottom of the page
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        } else if (scrollPosition + windowHeight >= documentHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[navLinks.length - 1].classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
