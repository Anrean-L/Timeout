import Counter from './Counter';
import './Event.css';
import PropTypes from 'prop-types';

function Event({ name, date, now }) {
	return (
		<div className='event'>
			<div className='event__title-wrapper'>
				<h2 className='event__title'>{name}</h2>
			</div>
			<time dateTime={date} className='event__date'>
				{date.toLocaleString()}
			</time>
			<Counter firstDate={now} secondDate={date}></Counter>
		</div>
	);
}

Event.propTypes = {
	name: PropTypes.string,
	date: PropTypes.instanceOf(Date),
	now: PropTypes.instanceOf(Date),
};

export default Event;
