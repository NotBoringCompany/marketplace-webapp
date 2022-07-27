const weekdays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const sentenceGenerator = (differenceInDays, fDate, sDate) => {
	const hoursAndMinutesGenerator = () =>
		`${secondDate.getHours() < 10 ? `0` : ``}${secondDate.getHours()}:${
			secondDate.getMinutes() < 10 ? `0` : ``
		}${secondDate.getMinutes()}`;

	const secondDate = new Date(sDate);
	if (differenceInDays === -8888) return ``;

	if (differenceInDays === 0) return `today, ${hoursAndMinutesGenerator()}`;
	if (differenceInDays === 1) return `tomorrow, ${hoursAndMinutesGenerator()}`;
	if (differenceInDays >= 2 && differenceInDays <= 14)
		return `on ${weekdays[secondDate.getDay()]}, ${hoursAndMinutesGenerator()}`;

	if (differenceInDays >= 15)
		return `${secondDate.getDate()} ${
			months[secondDate.getMonth() + 1]
		}, ${hoursAndMinutesGenerator()}`;
};

//sDate and fDate are epoch MS
const dayDifference = (fDate, sDate) => {
	const firstDate = new Date(fDate);
	const secondDate = new Date(sDate);

	if (firstDate.getFullYear() !== secondDate.getFullYear()) return -8888; // different year

	const diffTime = Math.abs(secondDate - firstDate);
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const dateFormatter = (fDate, sDate) => {
	const dayDiff = dayDifference(fDate, sDate);

	return sentenceGenerator(dayDiff, fDate, sDate);
};

export default dateFormatter;
