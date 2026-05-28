document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const paginationContainer = document.getElementById('pagination');
    
    // Create pagination dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        
        dot.addEventListener('click', () => {
            slides[index].scrollIntoView({ behavior: 'smooth' });
        });
        
        paginationContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Setup intersection observer for animations and pagination updates
    const observerOptions = {
        root: sliderContainer,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to slide for animation
                entry.target.classList.add('active');
                
                // Update pagination dots
                const index = Array.from(slides).indexOf(entry.target);
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            } else {
                // Remove active class when slide is out of view
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => {
        observer.observe(slide);
    });
});
