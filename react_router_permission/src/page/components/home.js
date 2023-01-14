import React from "react";
import { NavLink } from "react-router-dom";
import { removeToken } from "../../utils/token";

function HomeComponent(props) {
	const { history } = props;
	return (
		<div>
			<p>
				<NavLink to="/book" exact>
					图书管理页
				</NavLink>
			</p>
			<p>
				<NavLink to="/user" exact>
					用户管理页
				</NavLink>
			</p>
			<p>
				<button
					onClick={() => {
						removeToken();
						history.push("/login");
					}}
				>
					退出登录
				</button>
			</p>
		</div>
	);
}

export default HomeComponent;
