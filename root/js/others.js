const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.side-bar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
});
