// waiting till window is fully loaded:
window.onload = () => {
	// capture header element:
	const headerObject = document.querySelector('header');

	headerObject.addEventListener('click', (event) => {
		// prevent default action:
		event.preventDefault();

		// capture desired path:
		const path =
			event.target.parentElement.dataset.path !== undefined
				? event.target.parentElement.dataset.path
				: event.target.dataset.path;

		console.log(`path: ${path}`);

		// redirect to the captured path:
		window.location.href = path;
		// window.location.replace(path);
	});
};
