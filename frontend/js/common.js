let basketCount = document.getElementById('basketCount');
basketCount.innerHTML = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')).length : '0';