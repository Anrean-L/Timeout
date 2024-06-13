import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Adding from './Adding';
import Event from './Event';
import clone from './../moduls/clone';
function DataFlow({ initialData }) {
	const [data, setData] = useState(initialData);
	const form = useRef();
	function updateData(id, form) {
		const newData = clone(data);
		newData[id] = {
			name: form.name.value,
			date: new Date(form.date.value),
		};
		localStorage.setItem('data', JSON.stringify(newData));
		setData(newData);
	}
	return (
		<>
			{Object.keys(data).map(item => (
				<Event name={data[item].name} date={data[item].date} key={item} />
			))}
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

export default DataFlow;
