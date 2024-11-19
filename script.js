let interval;
let picking = false; // To track if the process is still ongoing
const allCards = document.querySelectorAll('.card');

function scrollToCard(card) {
    // Scroll the card into view smoothly without interrupting the current scroll
    card.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
    });
}

// Flip card when clicked
allCards.forEach(card => {
    card.addEventListener('click', function() {
        // Stop the "I'm Feeling Lucky" process if it's ongoing
        if (picking) {
            clearTimeout(interval);
            picking = false; // Stop picking process
        }

        card.classList.toggle('flipped');
        // Remove highlight from all cards
        allCards.forEach(c => c.classList.remove('highlighted'));
    });
});

document.getElementById("feelingLuckyBtn").onclick = function() {
    // Reset card styles
    allCards.forEach(card => card.classList.remove('highlighted'));

    // Start the picking process
    if (picking) return; // If already picking, do nothing
    picking = true;
    let foundTarget = false;
    let speed = 150; // Initial speed

    let currentIndex = 0;
    scrollToCard(allCards[currentIndex]); // Scroll to the first card

    // Random index to stop at
    let randomIndex = Math.floor(Math.random() * allCards.length);

    function highlightNext() {
        // Unhighlight all cards at the beginning of each iteration
        allCards.forEach(card => card.classList.remove('highlighted'));

        // Highlight the current card and trigger the rotation
        allCards[currentIndex].classList.add('highlighted');

        // Scroll to the current card without interrupting the flow
        scrollToCard(allCards[currentIndex]);

        // Move to the next card sequentially
        currentIndex = (currentIndex + 1) % allCards.length;

        // Check if we've reached the random card
        if (!foundTarget) {
            if (currentIndex === randomIndex) {
                foundTarget = true;
            }
        }

        // Slow down and stop if the target card is found
        if (foundTarget) {
            speed *= 1.1; // Gradually slow down the speed
            if (speed >= 500) { // Stop when speed is sufficiently slow
                picking = false;
                clearTimeout(interval);
                return;
            }
        }

        // Schedule the next highlight
        interval = setTimeout(highlightNext, speed);
    }

    highlightNext(); // Start the cycle
};
