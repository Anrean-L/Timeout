import { useState } from 'react';
import classNames from 'classnames';
import plusIcon from './../images/plus.svg';
import PropTypes from 'prop-types';
import './Adding.css';

function Adding({ form, submit }) {
	const [opened, setOpened] = useState(false);
	return (
		<div className={classNames({ adding: true, 'adding--opened': opened })}>
			<button
				className='adding__button'
				aria-label='кнопка для добавления нового события'
				onClick={() => setOpened(!opened)}
			>
				<img src={plusIcon} alt='значок плюсика' />
			</button>
			<form
				name='event'
				ref={form}
				onSubmit={e => {
					submit(e);
					setOpened(false);
				}}
			>
				<label className='adding__label'>
					Введите название события
					<input type='text' name='name' className='adding__input' required />
				</label>
				<label className='adding__label'>
					Введите дату
					<input
						type='date'
						name='date'
						className='adding__input'
						required
						defaultValue={new Date().toISOString().slice(0, 10)}
					/>
				</label>
				<input
					type='submit'
					className='adding__input adding__submit'
					value='создать'
					disabled={!opened}
				/>
			</form>
		</div>
	);
}
Adding.propTypes = {
	ref: PropTypes.func,
	submit: PropTypes.func,
};
export default Adding;
