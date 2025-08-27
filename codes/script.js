// Explore button
document.getElementById("exploreBtn").addEventListener("click", function () {
  document.querySelector(".welcome").style.display = "none";
  document.getElementById("blogSection").classList.remove("hidden");
});

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

const cards = document.querySelectorAll(".blog-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");

let currentPage = 1;
const cardsPerPage = 3;
let activeCategory = "all"; // default category

// Function to get currently filtered cards (by search + category)
function getFilteredCards() {
  let filter = document.getElementById("searchBar").value.toLowerCase();
  return Array.from(cards).filter(card => {
    const matchesSearch = card.innerText.toLowerCase().includes(filter);
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
}

function showPage(page) {
  let filteredCards = getFilteredCards();

  // Hide all first
  cards.forEach(card => (card.style.display = "none"));

  // Show only the cards for current page
  filteredCards.forEach((card, index) => {
    if (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage) {
      card.style.display = "";
    }
  });

  // Update pagination info
  const totalPages = Math.max(1, Math.ceil(filteredCards.length / cardsPerPage));
  pageIndicator.textContent = `Page ${page} of ${totalPages}`;
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === totalPages;

  // Reset page if currentPage > totalPages
  if (page > totalPages) {
    currentPage = totalPages;
    showPage(currentPage);
  }
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  let filteredCards = getFilteredCards();
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
});

// Search filter (now linked with pagination)
document.getElementById("searchBar").addEventListener("keyup", function () {
  currentPage = 1; // reset to first page on search
  showPage(currentPage);
});

// Category filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    currentPage = 1;
    showPage(currentPage);
  });
});

// Initialize first page
showPage(currentPage);
