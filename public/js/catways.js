// Vérification de la connexion
const token = localStorage.getItem('token');
if (!token) location.href = 'index.html';

const table = document.getElementById('catways-table');
const form = document.getElementById('catway-form');

// Chargement
fetch('/catways', {
	headers: { Authorization: `Bearer ${token}` }
	})
	.then(res => res.json())
	.then(catways => {
		catways.forEach(c => table.innerHTML += rowHTML(c));
});

// Ajout
form.onsubmit = async e => {
	e.preventDefault();

	const catway = {
		catwayNumber: +number.value,
		catwayType: type.value,
		catwayState: state.value
	};

	const res = await fetch('/catways', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(catway)
	});

	table.innerHTML += rowHTML(await res.json());
	form.reset();
};


  // MODIFIER / ENREGISTRER
function editCatway(btn, id) {
	const row = btn.closest('tr');
	const inputs = row.querySelectorAll('input, select');

	// Passage en mode édition
	if (btn.textContent === 'Modifier') {
		inputs.forEach(el => el.disabled = false);
		btn.textContent = 'Enregistrer';
		return;
	}

	// Enregistrement en base
	fetch(`/catways/${id}`, {
		method: 'PUT',
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
		catwayType: inputs[1].value,
		catwayState: inputs[2].value
		})
	});

	// Retour en lecture seule
	inputs.forEach(el => el.disabled = true);
	btn.textContent = 'Modifier';
}

// Supprimer
function deleteCatway(id, btn) {
	fetch(`/catways/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	}).then(() => btn.closest('tr').remove());
}

// Template
function rowHTML(c) {
	return `
		<tr>
		<td><input value="${c.catwayNumber}" disabled></td>
		<td>
			<select disabled>
			<option value="short" ${c.catwayType === 'short' ? 'selected' : ''}>short</option>
			<option value="long" ${c.catwayType === 'long' ? 'selected' : ''}>long</option>
			</select>
		</td>
		<td><input value="${c.catwayState || ''}" disabled></td>
		<td>
			<button onclick="editCatway(this, '${c._id}')">Modifier</button>
			<button onclick="deleteCatway('${c._id}', this)">Supprimer</button>
		</td>
		</tr>
	`;
	}
