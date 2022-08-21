export default function reload(delay = 5000) {
	window &&
		setTimeout(() => {
			window.location.reload();
		}, delay);
}
