import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routerConfig from "./config";
import { getToken } from "../../utils/token";

const PrivateRoute = (props) => {
	const { routerConfig, location } = props;
	const { pathname } = location;
	const isLogin = JSON.parse(getToken()); // 判断是否登录
	const currentRoute = routerConfig.find((item) => item.path === pathname); // 找到路由对应的组件

	/* 这些if eles 部分可以省略，只是为了直观一点 */
	if (isLogin) {
		/* 已经登录，再次进登录页面，就让它跳转到首页 */
		if (pathname === "/login") {
			return <Redirect to={"/"} />;
		} else {
			if (currentRoute) {
				/* 登录成功后，访问非登录页面，路由匹配的上 */
				if (currentRoute.super && isLogin.level <= 0) {
					// 权限不够
					return <Redirect to={"/noPermission"} />;
				}
				return <Route path={pathname} component={currentRoute.component} />;
			} else {
				/* 路由匹配不上 */
				return <Redirect to={"/404"} />;
			}
		}
	} else {
		/* 非登录状态 */
		if (currentRoute) {
			if (currentRoute.auth) {
				/* 可以匹配到路由，但是访问这个页面需要登录 */
				return <Redirect to={"/login"} />;
			} else {
				/* 可以匹配到路由， 但是不需要登录， 就可以直接访问了 */
				return <Route path={pathname} component={currentRoute.component} />;
			}
		} else {
			/* 匹配不到路由， 直接跳转到404 */
			return <Redirect to={"/404"} />;
		}
	}
};

function MainRouter(props) {
	return (
		<div>
			<HashRouter>
				<Switch>
					<PrivateRoute routerConfig={routerConfig} />
					{/* {routerConfig.map(({ path, component: Component }) => {
						return <Route key={path} path={path} component={Component} />;
					})} */}
				</Switch>
			</HashRouter>
		</div>
	);
}

export default MainRouter;
