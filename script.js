// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const profilePic = document.querySelector('.profile-pic img');

// Header scroll behavior
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) {
    header.classList.add('scrolled');
    if(profilePic) profilePic.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    if(profilePic) profilePic.classList.remove('scrolled');
  }
});

// Chess personality test (for chess.html)
const personalityBtns = document.querySelectorAll('.personality-btn');
const chessResult = document.getElementById('chess-result');

if(personalityBtns.length > 0) {
  const personalityDescriptions = {
    pawn: "You're a Pawn! Methodical and persistent, you understand that small steps lead to big victories. You may start small, but you have great potential for growth and transformation.",
    knight: "You're a Knight! Creative and unpredictable, you think outside the box and often surprise others with your unconventional solutions. You're not afraid to take calculated risks.",
    bishop: "You're a Bishop! Strategic and focused, you work well along clear lines of thought and action. You're excellent at long-term planning and seeing the bigger picture.",
    rook: "You're a Rook! Direct and powerful, you approach challenges head-on with straightforward solutions. You value efficiency and don't get distracted by unnecessary complexities.",
    queen: "You're a Queen! Versatile and capable, you can adapt to many different situations and handle multiple challenges simultaneously. You're a natural leader with great influence.",
    king: "You're a King! While you may not always be on the front lines, you provide essential direction and stability. You understand that protecting your resources is key to long-term success."
  };
  
  personalityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const piece = btn.getAttribute('data-piece');
      chessResult.innerHTML = `
        <h4>${piece.charAt(0).toUpperCase() + piece.slice(1)}</h4>
        <p>${personalityDescriptions[piece]}</p>
      `;
      chessResult.classList.add('active');
    });
  });
}

// Form submission (for contact.html)
const contactForm = document.getElementById('contactForm');

if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
      // In a real implementation, you would send the form data to Formspree
      alert('Thanks for your message! I\'ll get back to you soon.');
      contactForm.reset();
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Dynamic copyright year
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll('.copyright');
  copyrightElements.forEach(element => {
    element.textContent = `© ${currentYear} Eseoghene Christine Otuaga. All rights reserved.`;
  });

  // Totoro interaction
  const totoro = document.getElementById('totoro');
  if(totoro) {
    totoro.addEventListener('click', () => {
      alert('Hello! I\'m a friendly Totoro here to bring some Ghibli magic to your day!');
    });
  }
  
  setActiveNavLink();
});

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else if(currentPage === '' && link.getAttribute('href') === 'index.html') {
      link.classList.add('active');
    }
  });
}
