let highestZ = 1;

class Paper {

    holdingPaper = false;
    prevMouseX = 0;
    prevMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    velX = 0;
    velY = 0;
    currentPaperX = 0;
    currentPaperY = 0;
    init(paper) {
        paper.addEventListener('mousedown', (e) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            if(e.button === 0) {
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                console.log(this.prevMouseX, this.prevMouseY)
            }

        })

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.velX = this.mouseX - this.prevMouseX;
            this.velY = this.mouseY - this.prevMouseY;

            if(this.holdingPaper){
                this.currentPaperX += this.velX;
                this.currentPaperY += this.velY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;

            }
        })

        window.addEventListener('mouseup', (e) => {
            console.log("released");
            this.holdingPaper = false;
        })
    }
}

const papers = document.querySelectorAll('.paper');
const next = document.getElementById('next');

const nextButtons = document.querySelectorAll('.next');

nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentPaper = button.closest('.paper');
        currentPaper.style.transform = 'translateX(-300%)';
        currentPaper.style.transition = 'transform 0.5s ease-in-out';

        // Remove the current paper after sliding away
        setTimeout(() => {
            currentPaper.remove();
        }, 500);

        // Check if all papers have been shown
        if (document.querySelectorAll('.paper').length === 0) {
            // Show the final message or perform any other action
            const lastMessage = document.getElementById('last-message');
            lastMessage.classList.add('expanded');
        }
    });
});

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
})

// Pre loader
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector("body").classList.add("loaded");
    }, 1000)
  });
