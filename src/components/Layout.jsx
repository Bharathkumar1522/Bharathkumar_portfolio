import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
