const totalPageCounter = (fetchedDataLength, show) => {
	if (fetchedDataLength % show > 0) {
		return parseInt(fetchedDataLength / show) + 1;
	}
	return parseInt(fetchedDataLength / show);
};

export default totalPageCounter;
