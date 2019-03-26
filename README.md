### 技术栈  
react + umi + dva + antd + es6 + BizCharts + mock模拟数据
### 安装部署  
执行 `npm install` 安装依赖  

执行 `npm run start` 启动本地服务进行开发测试  

执行 `npm run build` 压缩打包 生成 `dist` 文件夹  


### 项目结构

```

├── config 配置文件
│   ├── config.js 基本配置
│   └── config.local.js 本地开发配置
├── jsconfig.json  重命名等配置
├── mock   mock文件
│   ├── goodList.js 商品信息mock
│   ├── home.js 销售分析mock
│   ├── member.js   会员信息mock
│   ├── people.js   员工信息mock
│   ├── peopleList.js   员工列表mock
│   ├── salary.js   薪资信息mock
│   └── users.js    用户信息mock
├── package.json    依赖包信息
├── src 源文件
│   ├── app.js  根文件
│   ├── assets  静态文件
│   │   └── yay.jpg 
│   ├── components  公共组件
│   │   ├── GlobalHeader    头部组件
│   │   ├── PageLoading     全局加载组件
│   │   └── SiderMenu   菜单组件
│   ├── constants   公共数据文件
│   │   └── commonData.js
│   ├── global.css  全局样式
│   ├── layouts 全局布局
│   │   ├── index.css
│   │   └── index.js
│   ├── models  全局models
│   │   ├── login.js 登录
│   │   ├── menus.js 菜单
│   ├── pages   页面文件
│   │   ├── 404.js  404页面
│   │   ├── Login   登录页面
│   │   ├── exception   错误页面
│   │   ├── goods   商品页面
│   │   ├── home    销售分析页面
│   │   ├── index.css
│   │   ├── index.js    根入口
│   │   ├── members 会员页面
│   │   ├── people  员工页面
│   │   ├── salary  薪资页面
│   │   └── user    用户页面
│   ├── services    服务请求文件
│   │   ├── api.js  
│   │   ├── data.js
│   │   ├── goodList.js
│   │   ├── memberList.js
│   │   ├── peopleList.js
│   │   ├── salaryList.js
│   │   └── users.js
│   └── utils 工具文件
│       ├── buildURL.js 
│       ├── download.js 下载
│       ├── methods.js  通用方法
│       └── request.js  封装请求
└── yarn.lock

```