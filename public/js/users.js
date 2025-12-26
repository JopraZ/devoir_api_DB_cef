const token = localStorage.getItem('token');
if (!token) location.href = 'index.html';

const table = document.getElementById('users-table');
const form = document.getElementById('user-form');

// Chargerment
fetch('/users', {
	headers: { Authorization: `Bearer ${token}` }
})
	.then(r => r.json())
	.then(users => {
		users.forEach(u => table.innerHTML += rowHTML(u));
});

// Ajout
form.onsubmit = async e => {
	e.preventDefault();

	const user = {
		username: username.value,
		email: email.value,
		password: password.value,
		role: role.value
	};

	const res = await fetch('/users', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(user)
	});

	table.innerHTML += rowHTML(await res.json());
	form.reset();
};

// Modifier
function editUser(btn, id) {
	const row = btn.closest('tr');
	const inputs = row.querySelectorAll('input, select');

	if (btn.textContent === 'Modifier') {
		inputs.forEach(el => el.disabled = false);
		btn.textContent = 'Enregistrer';
		return;
	}

	fetch(`/users/${id}`, {
		method: 'PUT',
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
		username: inputs[0].value,
		email: inputs[1].value,
		role: inputs[2].value
		})
	});

	inputs.forEach(el => el.disabled = true);
	btn.textContent = 'Modifier';
}

// Supprimer
function deleteUser(id, btn) {
	fetch(`/users/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	}).then(() => btn.closest('tr').remove());
}

// Template
function rowHTML(u) {
	return `
		<tr>
		<td><input value="${u.username}" disabled></td>
		<td><input value="${u.email}" disabled></td>
		<td>
			<select disabled>
			<option value="user" ${u.role === 'user' ? 'selected' : ''}>user</option>
			<option value="admin" ${u.role === 'admin' ? 'selected' : ''}>admin</option>
			</select>
		</td>
		<td>
			<button onclick="editUser(this, '${u._id}')">Modifier</button>
			<button onclick="deleteUser('${u._id}', this)">Supprimer</button>
		</td>
		</tr>
	`;
}
