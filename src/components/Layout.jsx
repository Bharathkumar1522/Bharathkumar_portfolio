import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import TextureOverlay from './TextureOverlay';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden relative">
            <TextureOverlay type="noise" className="fixed opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" />
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

