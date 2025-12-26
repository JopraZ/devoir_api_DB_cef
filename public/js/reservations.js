const token = localStorage.getItem('token');
if (!token) location.href = 'index.html';

const table = document.getElementById('reservations-table');
const form = document.getElementById('reservation-form');

// Chargement
fetch('/reservations', {
	headers: { Authorization: `Bearer ${token}` }
})
	.then(r => r.json())
	.then(reservations => {
		reservations.forEach(r => table.innerHTML += rowHTML(r));
});

// Ajout
form.onsubmit = async e => {
	e.preventDefault();

	const reservation = {
		catwayNumber: +catwayNumber.value,
		clientName: clientName.value,
		startDate: startDate.value,
		endDate: endDate.value
	};

	const res = await fetch('/reservations', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(reservation)
	});

	table.innerHTML += rowHTML(await res.json());
	form.reset();
};

// Modifier
function editReservation(btn, id) {
	const row = btn.closest('tr');
	const inputs = row.querySelectorAll('input');

	if (btn.textContent === 'Modifier') {
		inputs.forEach(i => i.disabled = false);
		btn.textContent = 'Enregistrer';
		return;
	}

	fetch(`/reservations/${id}`, {
		method: 'PUT',
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
		clientName: inputs[1].value,
		startDate: inputs[2].value,
		endDate: inputs[3].value
		})
	});

	inputs.forEach(i => i.disabled = true);
	btn.textContent = 'Modifier';
}

// Supprimer
function deleteReservation(id, btn) {
	fetch(`/reservations/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	}).then(() => btn.closest('tr').remove());
}

// Template
	function rowHTML(r) {
	return `
		<tr>
		<td><input value="${r.catwayNumber}" disabled></td>
		<td><input value="${r.clientName}" disabled></td>
		<td><input type="date" value="${r.startDate.slice(0,10)}" disabled></td>
		<td><input type="date" value="${r.endDate.slice(0,10)}" disabled></td>
		<td>
			<button onclick="editReservation(this, '${r._id}')">Modifier</button>
			<button onclick="deleteReservation('${r._id}', this)">Supprimer</button>
		</td>
		</tr>
	`;
}
