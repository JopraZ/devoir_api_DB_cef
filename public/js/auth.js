// Redirection si déjà connecté
if (localStorage.getItem('token')) {
	location.href = 'dashboard.html';
}

document.getElementById('login-form').onsubmit = async (e) => {
	e.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const res = await fetch('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
		});

		if (!res.ok) throw new Error('Identifiants incorrects');

		const { token } = await res.json();
		localStorage.setItem('token', token);

		location.href = 'dashboard.html';

	} catch (err) {
		showError(err.message);
	}
};

// Affichage des erreurs
function showError(msg) {
	document.getElementById('error-message')?.remove();

	const p = document.createElement('p');
	p.id = 'error-message';
	p.textContent = msg;
	p.style.color = 'red';
	p.style.textAlign = 'center';

	document.querySelector('.login-form').appendChild(p);
}
