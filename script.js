 // Sidebar toggle
const sidebar = document.getElementById('sidebar');
function toggleSidebar() {
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
}

// Show section
function showSection(id){
    document.querySelectorAll('main section').forEach(sec=>sec.classList.remove('active-section'));
    document.getElementById(id).classList.add('active-section');
    sidebar.style.left = '-250px'; // auto-close sidebar
}   
