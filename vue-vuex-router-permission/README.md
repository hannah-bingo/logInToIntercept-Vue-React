# vuex-demo

## 一、项目简介

### 1-1 功能

1. 在main.js中添加全局路由配置，控制用户登录路由权限
   - 没有登陆时，路由无法跳转
2. 多组件共享`state.userStatus` 和 `state.vipLevel`状态
3. 多组件修改`state.userStatus`和`state.vipLevel`

### 1-2 查看项目

[点击此处](http://yiyaobingo.3vkj.club/vuex-exercise/)

- 由于打包后路径问题，线上网址页面暂时无法正常跳转
- 路由限制的原因无法直接访问登录后的界面

### 1-3 详情简介

#### 1-3-1 路由权限控制页面跳转

> 不在是全局创建 store 实例，而是新创建一个 store 文件夹

1. 创建 store 文件夹，进行初始化
2. 在 main.js 中创建全局的导航守卫中，拿取到这个实例
3. 在 login 组件中通过`store.commit`提交 userInfo 数据

### 1-3

## 二、 Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```
