@[TOC](文章标题)
# 一、Vue实现登录拦截
> [点击查看项目全貌](http://yiyaobingo.3vkj.club/vuex-exercise/)
## 1-1、 效果展示
> 密码账号没有添加强验证，地址栏不可以直接通过修改路径跳转页面，必须成功登录
> ![请添加图片描述](https://img-blog.csdnimg.cn/d6e369b178e24a55bb4a80777fda219d.gif)

## 1-2 代码展示
### 1-2-1 router.js
```js
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/login.vue")
        },
        {
            path: "/",
            name: "index",
            component: () => import("./pages/index.vue")
        }
    ]
})

export default router

```
### 1-2-2 store文件夹下
>  - [vue多级路由跳转+传参+栗子详解【如何使用路由守卫】](https://blog.csdn.net/hannah2233/article/details/127529887)
>  - [vue路由详解【多级路由+路由守卫】](https://blog.csdn.net/hannah2233/article/details/127529073)
>  #### 1-2-2-1  state.js
>  state ---- 数据仓库
>  - state是比较强大的json，用来存储数据
```js
export default {
    userInfo: "",
}
```
#### 1-2-2-2 index.js
```js
import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store
```
#### 1-2-2-3 mutation.js
> mutation  ---- 用来修改数据的
> - 为什么不能直接实例化state，然后直接修改state的数据
> 	-  通过commit一个mutation，然后通过mutation传入state再对state进行修改
> - **同步的**


```js
export default {
	login(state, v) {
		state.userTnfo = v
	}
}
```
### 1-2-3 main.js【实现登录拦截的关键---全局路由守卫】
1.引入store
`import store from "./store";`
2. 控制未登录之前不能访问其他页面
```js
router.beforeEach((to,from, next) => {
	if(store.state.userInfo || to.path === "/login"){
		next()
	} else {
		next({
			path: "/login"
		})
	}
)
```
### 1-2-4 pages下的login.vue
```html
<template>
    <div class="login">
        <p class="login-title">
            登陆权限
        </p>
        <div class="section">
            <input
                class="section-input"
                v-model="form.account"
                placeholder-class="input-holder"
                placeholder="请输入您的账号"
            />
        </div>
        <div class="section">
            <input
                class="section-input"
                type="password"
                v-model="form.password"
                placeholder-class="input-holder"
                placeholder="请输入您的密码"
            />
        </div>
        <button class="btn" @click="login">登录</button>


    </div>
</template>
<script>
import store from "../store";

export default {
    data() {
        return {
            isHidden: false,
            isPassword: true,
            logs: [],
            form: {
                account: "",
                password: ""
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        login() {
            if (!this.form.account || !this.form.password) {
                alert("请填写账号密码");
                return false;
            }
            const that = this;
            setTimeout(() => {
                store.commit("login", {
                    account: that.form.account,
                    password: that.form.password
                });
                that.$router.push("./");
            }, 500);
        }
    }
};
</script>

<style lang="less">
.login {
    position: relative;
    top: 0;
    left: 0;
    padding: 0 45px;
    p {
        text-align: center;
    }
    &-title {
        color: #111111;
        font-size: 36px;
        padding: 40px 0 30px;

    }
    .section {
        &-input {
            width: 100%;
            height: auto;
            border: none;
            margin-bottom: 30px;
            outline: none;
            font-size: 16px;
            line-height: 1.6;
            border-bottom: 1px solid red;
        }
        .input-holder {
            color: #777777;
            font-size: 16px;
        }
    }
    .btn {
        width: 100%;
        height: auto;
        color: #fff;
        background: #373737;
        margin: 10px 0 20px;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 16px;
    }
    .btn-primary {
        color: #373737;
        background: #fff;
    }
    .login-text {
        position: fixed;
        left: 0;
        bottom: 60px;
        width: 100%;
        height: auto;
        font-size: 12px;
        color: #777777;
        text-align: center;
    }
}

</style>

```
## 1-3 总结
1. 创建store文件夹，进行初始化
2. 在 main.js 中创建全局的导航守卫中，拿取到这个实例 。通过判断`$store.state.userInfo`来守卫导航
	- `next()`
	- 或者`next({path: '/login'})`
3. 在login组件中通过`store.commit`提交userInfo数据

# 二、 Vue项目功能简介
> 项目地址： []()

## 2-1 功能

1. 在main.js中配置全局路由守卫，控制用户登录路由权限
   - 没有登陆时，路由无法跳转
2.  index与userCenter界面共享`$state.userStatus` 和 `$state.vipLevel`状态值
	 - [【Vuex 的 详细讲解 】与【count++的案例实现】](https://blog.csdn.net/hannah2233/article/details/121750807)
	 - [【Vue十三】-- Vuex详细介绍](https://blog.csdn.net/hannah2233/article/details/126923459)

3. 充值不同数额，变成`$state.vipLevel`等级的会员，观看对应课程

## 2-2 查看项目

1.  [点击此处](http://yiyaobingo.3vkj.club/vuex-exercise/)

2.  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a77d34d56b2040b5a2f4bb8e64052121.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/f4475bd6753b4ca782d53cc52a8a4eab.png)

# 三、 React 路由登录和用户身份鉴权
## 3-1 项目简单介绍
### 3-1-1 展示
> [项目在线查看](http://yiyaobingo.3vkj.club/react_router_permission/)

1.  效果图：
![请添加图片描述](https://img-blog.csdnimg.cn/e9c2e47901b34691a3874a1bccf19386.gif)


### 3-1-2 代码结构+思路展示 
#### 3-1-2-1  项目目录：
1.   安装依赖: `yarn add react-router-dom`
	
2.   向React中添加路由
```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouter from "./page/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainRouter />);

=============================================================================
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
```


#### 3-1-2-2  登录逻辑
```js
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

```


# 四、 在github上fork与star该项目
> 更便捷地查看案例，更清晰的理解！
> 打开[源码](https://github.com/hannah-bingo/logInToIntercept-Vue-React)点击Fork

1. fork此项目
>		-   GitHub中Fork 是 服务端的代码仓库克隆（即 新克隆出来的代码仓库在远程服务端），包含了原来的仓库（即upstream repository，上游仓库）所有内容，如分支、Tag、提交。
>		- 代码托管服务（如Github、BitBucket）提供了方便的完成Fork操作的功能（在仓库页面点一下Fork按钮）。这样有了一个你自己的 可以自由提交的远程仓库，然后可以通过的 Pull Request 把你的提交贡献回 原仓库。
>		- 而对于原仓库Owner来说，鼓励别人Fork他的仓库，通过Pull Request 能给他的仓库做贡献，也是提升了原仓库的知名度。


![在这里插入图片描述](https://img-blog.csdnimg.cn/163cd2393bb64396a1ef1a1aa0495e55.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA57-86YGlYmluZ28=,size_20,color_FFFFFF,t_70,g_se,x_16)

2.   复制自己的仓库地址![在这里插入图片描述](https://img-blog.csdnimg.cn/2ee5b2318dd14495b0621b206a11832e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA57-86YGlYmluZ28=,size_20,color_FFFFFF,t_70,g_se,x_16)



### 4-2 本地仓库安装
1.  本地新建文件夹`logInToIntercept`,cmd进入命令行
2.   初始化仓库：`git init`
3.  从远端仓库拉取项目的源码：`git pull 上文复制的仓库地址`

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad602823e71946b48c2959e2fa55deb4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA57-86YGlYmluZ28=,size_20,color_FFFFFF,t_70,g_se,x_16)

### 4-3 本地跑项目【有node环境】


1、安装包依赖：`yarn add` 
2、 根据package的具体配置跑项目：`yarn run serve`或者`yarn start`
3、  浏览器打开即可: ` http://localhost:3000`
