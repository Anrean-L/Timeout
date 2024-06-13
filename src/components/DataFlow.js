import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Adding from './Adding';
import Event from './Event';
import clone from './../moduls/clone';
import PropTypes from 'prop-types';
function DataFlow({ initialData }) {
	const [data, setData] = useState(initialData);
	const form = useRef();
	const [now, setNow] = useState(new Date());
	function updateData(id, form) {
		const newData = clone(data);
		newData[id] = Array.from(form).reduce((obj, input) => {
			if (input.type !== 'submit') obj[input.name] = input.value;
			return obj;
		}, {});
		localStorage.setItem('data', JSON.stringify(newData));
		setData(newData);
	}
	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<>
			{Object.keys(data).map(item => {
				return (
					<Event
						name={data[item].name}
						date={new Date(data[item].date)}
						now={now}
						key={item}
					/>
				);
			})}
			<Adding
				form={form}
				submit={e => {
					e.preventDefault();
					updateData(nanoid(), form.current);
				}}
			/>
		</>
	);
}
DataFlow.propTypes = {
	initialData: PropTypes.object,
};
export default DataFlow;
