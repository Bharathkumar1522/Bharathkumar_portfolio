import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden">
            <CustomCursor />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

