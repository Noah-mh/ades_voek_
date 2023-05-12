import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import Elliott from '../Elliott';

const Layout = () => {
    return (
        <main className='App'>
            <Header />
            <Elliott />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout;