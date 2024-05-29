import HomePage from '../pages/home';

type RouterType = {
    page: () => JSX.Element;
    path: string;
    layout?: () => JSX.Element;
};

const publicRouters: RouterType[] = [
    {
        page: HomePage,
        path: '/home',
    },
];

export { publicRouters };
export default RouterType;
