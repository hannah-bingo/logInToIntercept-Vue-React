import Login from "../components/login";
import Book from "../components/book";
import User from "../components/user";
import NotPage from "../components/404";
import Home from "../components/home";
import NoPermission from "../components/noPermission";

const routerConfig = [
	{
		path: "/",
		component: Home,
		auth: true, // 需要被验证
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/book",
		component: Book,
		auth: true, // 需要被验证
	},
	{
		path: "/user",
		component: User,
		auth: true, // 需要被验证
		super: true,
	},
	{
		path: "/noPermission",
		component: NoPermission,
	},
	{
		path: "/404",
		component: NotPage,
	},
	{
		path: "*",
		component: NotPage,
	},
];

export default routerConfig;
