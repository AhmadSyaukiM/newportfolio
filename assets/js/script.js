'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      // Menyusun perbandingan berdasarkan teks yang ada di dalam tombol
      if (this.querySelector(".link-text").innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}




const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Warna untuk background .circle
const colors = [
  "#f0ece2", // Warna putih susu yang lembut
];

// Menambahkan titik hitam ke setiap elemen .circle
circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
  
  // Tambahkan titik hitam kecil di dalam circle
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.width = "5px"; // Ukuran titik hitam
  dot.style.height = "5px";
  dot.style.backgroundColor = "#000"; // Warna hitam untuk titik
  dot.style.borderRadius = "50%"; // Bentuk bulat
  dot.style.position = "absolute"; // Untuk memposisikan titik di dalam circle
  dot.style.left = "50%"; // Titik di tengah-tengah
  dot.style.top = "50%"; 
  dot.style.transform = "translate(-50%, -50%)"; // Mengatur agar titik berada tepat di tengah
  circle.appendChild(dot); // Menambahkan dot ke dalam circle
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    // Menempatkan posisi circle berdasarkan mouse
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    // Mengubah skala setiap circle berdasarkan indeksnya
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();







const clientsList = document.querySelector('.clients-list');
const images = document.querySelectorAll('.clients-item img'); // Select all images


let isDragging = false;
let startX;
let scrollLeft;
let velocity = 0; // Track the velocity of scrolling
let momentumID; // ID for momentum animation frame

// Disable default drag behavior for images
images.forEach((img) => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});

// Handle mouse down (start drag)
clientsList.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - clientsList.offsetLeft;
  scrollLeft = clientsList.scrollLeft;
  velocity = 0; // Reset velocity
  cancelMomentum(); // Stop existing momentum
  clientsList.style.cursor = 'grabbing';
});

// Handle mouse up (stop drag)
clientsList.addEventListener('mouseup', () => {
  isDragging = false;
  clientsList.style.cursor = 'default';
  applyMomentum(); // Apply momentum after releasing the drag
});

// Handle mouse leave (stop drag if leaving container)
clientsList.addEventListener('mouseleave', () => {
  isDragging = false;
  clientsList.style.cursor = 'default';
});

// Handle mouse move (scroll)
clientsList.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - clientsList.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the multiplier for speed
  velocity = walk; // Track current velocity
  clientsList.scrollLeft = scrollLeft - walk;
});

// Apply momentum after scrolling stops
function applyMomentum() {
  if (Math.abs(velocity) < 1) return; // Stop when velocity is minimal
  clientsList.scrollLeft += velocity;
  velocity *= 0.9; // Reduce velocity gradually for deceleration
  momentumID = requestAnimationFrame(applyMomentum);
}

// Cancel momentum when needed
function cancelMomentum() {
  if (momentumID) cancelAnimationFrame(momentumID);
}

