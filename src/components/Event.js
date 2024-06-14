import PropTypes from 'prop-types';
import Counter from './Counter';
import './Event.css';
import editIcon from './../images/edit.svg';
import removeIcon from './../images/cross.svg';

function Event({ name, date, now, edit, remove }) {
	return (
		<div className='event'>
			<div className='event__title-wrapper'>
				<h2 className='event__title'>{name}</h2>
				<div className='event__actions'>
					<button className='event__button' onClick={edit}>
						<img src={editIcon} alt='иконка редактирования' />
					</button>
					<button className='event__button' onClick={remove}>
						<img src={removeIcon} alt='иконка удаления' />
					</button>
				</div>
			</div>
			<time dateTime={date} className='event__date'>
				{date.toLocaleString().slice(0, 10)}
			</time>
			<Counter firstDate={now} secondDate={date}></Counter>
		</div>
	);
}

Event.propTypes = {
	name: PropTypes.string,
	date: PropTypes.instanceOf(Date),
	now: PropTypes.instanceOf(Date),
	edit: PropTypes.func,
	remove: PropTypes.func,
};

export default Event;
