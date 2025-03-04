document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('thoughtsArea');
    const charCounter = document.getElementById('charCount');
    const clearBtn = document.querySelector('.clear-btn');
    const directionBtns = document.querySelectorAll('.direction-btn');

    // Direction controls
    directionBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            // Remove active class from all buttons
            directionBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Set textarea direction
            const direction = event.target.dataset.direction;
            textarea.dir = direction;
        });
    });

    // Character counter
    function updateCharCount() {
        const newCount = textarea.value.length;
        
        // Remove and re-add animation class
        charCounter.classList.remove('counter-animate');
        void charCounter.offsetWidth; // Trigger reflow
        charCounter.classList.add('counter-animate');
        
        // Update counter text
        charCounter.textContent = newCount;
    }
    textarea.addEventListener('input', updateCharCount);

    // Clear thoughts button
    clearBtn.addEventListener('click', () => {
        // Optional: Add a confirmation before clearing
        const confirmClear = confirm('آیا مطمئن هستید که می‌خواهید افکار خود را پاک کنید؟');
        
        if (confirmClear) {
            textarea.value = '';
            textarea.focus();
            updateCharCount();
        }
    });

    // Optional: Save thoughts to local storage
    const savedThoughts = localStorage.getItem('mindCleanserThoughts');
    if (savedThoughts) {
        textarea.value = savedThoughts;
        updateCharCount();
    }

    textarea.addEventListener('input', () => {
        localStorage.setItem('mindCleanserThoughts', textarea.value);
    });

    // Optional: Export functionality
    function exportThoughts() {
        const thoughts = textarea.value;
        const blob = new Blob([thoughts], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `mind_cleanser_thoughts_${new Date().toISOString().slice(0,10)}.txt`;
        link.click();
    }

    // You could add an export button in HTML and link this function
    // document.getElementById('exportBtn').addEventListener('click', exportThoughts);
});
