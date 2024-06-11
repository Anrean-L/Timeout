import Counter from './Counter';
import Event from './Event';

function Discovery() {
	return (
		<>
			<h2>Counter</h2>
			<Counter
				firstDate={new Date('1995-12-17T03:23:00')}
				secondDate={new Date('1995-11-06T03:24:00')}
			></Counter>
			<h2>Event</h2>
			<Event
				name='sdlkfjaskd'
				date={new Date('1995-12-17T03:23:00')}
				now={new Date(0)}
			></Event>
		</>
	);
}

export default Discovery;
