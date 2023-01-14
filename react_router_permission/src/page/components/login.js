import React from "react";
import { setToken } from "../../utils/token";

function LoginComponent(props) {
	const { history } = props;
	return (
		<div>
			<h1>Login Page</h1>
			<button
				onClick={() => {
					const LoginInfo = {
						value: "chenjiang",
						level: 0, // 标志普通管理员
					};
					setToken(JSON.stringify(LoginInfo));
					history.push("/");
				}}
			>
				管理员登录
			</button>
			<button
				onClick={() => {
					const LoginInfo = {
						value: "chenjiang",
						level: 1, // 标志超级管理员
					};
					setToken(JSON.stringify(LoginInfo));
					history.push("/");
				}}
			>
				超级管理员登录
			</button>
		</div>
	);
}

export default LoginComponent;
