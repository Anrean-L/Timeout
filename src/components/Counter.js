import PropTypes from 'prop-types';
import './Counter.css';

const timePrepare = n => {
	n = Math.abs(Math.trunc(n));
	return n < 10 ? `0${n}` : n.toString();
};
const wordEnding = days => {
	days = Math.abs(days);
	if (10 < days % 100 && days % 100 < 20) {
		return 'дней';
	} else if (days % 10 === 1) {
		return 'день';
	} else if (1 < days % 10 && days % 10 < 5) {
		return 'дня';
	} else {
		return 'дней';
	}
};

function Counter({ firstDate, secondDate }) {
	firstDate = firstDate === undefined ? Date() : firstDate;
	const difference = secondDate - firstDate;
	const days = Math.trunc(difference / 1000 / 60 / 60 / 24);
	const hours = timePrepare((difference / 1000 / 60 / 60) % 24);
	const mins = timePrepare((difference / 1000 / 60) % 60);
	const seconds = timePrepare((difference / 1000) % 60);
	[hours, mins, seconds].forEach(
		item => (item = item < 10 ? `0${item}` : item.toString())
	);
	return (
		<div className='counter'>
			{days !== 0 ? (
				<div className='counter__days'>
					{days} {wordEnding(days)}
				</div>
			) : null}
			<div className='counter__time'>
				{hours}:{mins}:{seconds}
			</div>
		</div>
	);
}

Counter.propTypes = {
	firstDate: PropTypes.instanceOf(Date),
	secondDate: PropTypes.instanceOf(Date).isRequired,
};

export default Counter;
