console.log("Portfolio loaded successfully");
const togglebtn = document.getElementById("theme-toggle");
togglebtn.addEventListener('click ',() => {
    document.body.classList.toggle('light-mode');
    toggleBtn.textContent = document.body.classList.contains('light-mode')
    ? ' Light Mode'
    : ' Dark Mode';
});