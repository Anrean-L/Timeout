import Counter from './Counter';

function Discovery() {
	return (
		<>
			<Counter
				firstDate={new Date('1995-12-17T03:23:00')}
				secondDate={new Date('1995-11-06T03:24:00')}
			></Counter>
		</>
	);
}

export default Discovery;
