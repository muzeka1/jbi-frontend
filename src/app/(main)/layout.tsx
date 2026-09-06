import Header from '@/src/components/header/header';
import Footer from '../../components/Footer/Footer';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

