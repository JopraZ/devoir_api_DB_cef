// Vérification de la connexion
const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html';
}

const payload = JSON.parse(atob(token.split('.')[1]));

document.getElementById('username').textContent = payload.username;
document.getElementById('email').textContent = payload.email;

// Déconnexion
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Date du jour
document.getElementById('today').textContent = new Date().toLocaleDateString();

// Récupération des réservations
fetch('/reservations', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(reservations => {
      const table = document.getElementById('reservations-table');

      reservations.forEach(r => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${r.catwayNumber}</td>
          <td>${r.clientName}</td>
          <td>${new Date(r.startDate).toLocaleDateString()}</td>
          <td>${new Date(r.endDate).toLocaleDateString()}</td>
        `;
        table.appendChild(row);
      });
  })
  .catch(err => console.error(err));
