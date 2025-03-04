document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('thoughtsArea');
    const charCounter = document.getElementById('charCount');
    const clearBtn = document.querySelector('.clear-btn');
    const directionBtns = document.querySelectorAll('.direction-btn');

    directionBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            directionBtns.forEach(b => b.classList.remove('active'));
            
            event.target.classList.add('active');
            
            const direction = event.target.dataset.direction;
            textarea.dir = direction;
        });
    });

    function updateCharCount() {
        const trimmedText = textarea.value.trim();
        const newCount = trimmedText.length;
        
        charCounter.classList.remove('counter-animate');
        void charCounter.offsetWidth;
        charCounter.classList.add('counter-animate');
        
        charCounter.textContent = newCount;
    }
    textarea.addEventListener('input', updateCharCount);

    clearBtn.addEventListener('click', () => {
        const confirmClear = confirm('آیا مطمئن هستید که می‌خواهید افکار خود را پاک کنید؟');
        
        if (confirmClear) {
            textarea.value = '';
            textarea.focus();
            updateCharCount();
        }
    });

    const savedThoughts = localStorage.getItem('mindCleanserThoughts');
    if (savedThoughts) {
        textarea.value = savedThoughts;
        updateCharCount();
    }

    textarea.addEventListener('input', () => {
        localStorage.setItem('mindCleanserThoughts', textarea.value);
    });
});