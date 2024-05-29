import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RouterType, { publicRouters } from './router';
import { Fragment } from 'react/jsx-runtime';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRouters.map((route: RouterType, index: number) => {
                        const Page = route.page;
                        const path = route.path;
                        const Layout = route.layout ? route.layout : Fragment;

                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
