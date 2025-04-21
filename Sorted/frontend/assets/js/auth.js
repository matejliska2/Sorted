function isLoggedIn() {
    return !!localStorage.getItem('auth_token');
}

function getUserRole() {
    return localStorage.getItem('user_role');
}

function protectPage(requiredRole = null) {
    if (!isLoggedIn()) {
        window.location.href = '../login.html';
        return;
    }

    const role = getUserRole();

    if (requiredRole && role !== requiredRole) {
        alert('Access denied: wrong role');
        window.location.href = '../login.html';
    }
}
