import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import clone from './../moduls/clone';
import PropTypes from 'prop-types';
import Adding from './Adding';
import Event from './Event';
import './DataFlow.css';
import arrowImage from './../images/arrow.svg';

function DataFlow({ initialData }) {
	const [data, setData] = useState(initialData);
	const form = useRef();
	const [now, setNow] = useState(new Date());
	function removeEvent(id) {
		const newData = clone(data);
		delete newData[id];
		localStorage.setItem('data', JSON.stringify(newData));
		setData(newData);
	}
	function updateData(id, form) {
		const newData = Object.assign(clone(data), {
			[id]: Array.from(form).reduce((obj, input) => {
				if (input.type !== 'submit') obj[input.name] = input.value;
				return obj;
			}, {}),
		});
		localStorage.setItem('data', JSON.stringify(newData));
		setData(newData);
	}
	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<>
			{Object.keys(data).length ? (
				Object.keys(data).map(id => {
					return (
						<Event
							key={id}
							name={data[id].name}
							date={new Date(data[id].date)}
							now={now}
							edit={() => alert()}
							remove={() => removeEvent(id)}
						/>
					);
				})
			) : (
				<p class='no-events'>
					Список событий пуст!
					<br />
					Нажмите и создайте
					<br />
					первое событие
					<img
						src={arrowImage}
						alt='стрелка, указывающая на значок добавления события'
					/>
				</p>
			)}
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
