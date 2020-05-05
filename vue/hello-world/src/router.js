import Hi from './components/Hi'
//简单路由页面
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }


//路由规则
export const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/hi', component: Hi },
]