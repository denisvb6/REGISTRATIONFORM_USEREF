import { useRef, useState } from 'react';
import './App.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [passwordError, setPasswordError] = useState(null);
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newError = null;

		if (!/^[a-zA-Z0-9_]*$/.test(target.value)) {
			newError =
				'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание';
		}

		setPasswordError(newError);
	};
	const onСonfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);

		if (confirmPassword.length === 6) {
			submitButtonRef.current.focus();
		}
	};

	const onPasswordBlur = ({ target }) => {
		setPassword(target.value);

		if (target.value.length < 7) {
			setPasswordError('Неверный пароль. Должно быть больше 6 символов');
		}
	};
	const onСonfirmPasswordBlur = ({ target }) => {
		setConfirmPassword(target.value);

		if (password.indexOf(confirmPassword)) {
			setConfirmPasswordError('Пароли не совпадают');
		}
	};

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, confirmPassword });
	};

	return (
		<form className="regform" onSubmit={onSubmit}>
			{passwordError && <div className="errorLabel">{passwordError}</div>}
			{confirmPasswordError && (
				<div className="errorLabel">{confirmPasswordError}</div>
			)}

			<input
				className="field"
				name="email"
				type="email"
				value={email}
				placeholder="email..."
				onChange={onEmailChange}
			/>

			<input
				className="field"
				name="password"
				type="password"
				value={password}
				placeholder="Пароль..."
				onChange={onPasswordChange}
				onBlur={onPasswordBlur}
			/>

			<input
				className='field'
				name="confirmPassword"
				type="password"
				value={confirmPassword}
				placeholder="Подтвердить пароль..."
				onChange={onСonfirmPasswordChange}
				onBlur={onСonfirmPasswordBlur}
			/>

			<button
				ref={submitButtonRef}
				className='button_f'
				type="submit"
				disabled={!!(passwordError || confirmPasswordError)}
			>
				Зарегистрироваться
			</button>
		</form>
	);
};
