import Header from '@/src/components/header/header';
import SmoothScroll from '../../components/smooth-scroll/smooth-scroll';
import Footer from '../../components/Footer/Footer';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <SmoothScroll>
                <Header />
                {children}
                <Footer/>
            </SmoothScroll>
    );
}