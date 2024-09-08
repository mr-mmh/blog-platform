import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function AcountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ToastContainer
                rtl
                stacked
                toastClassName="!font-iYekan text-sm w-full"
                position="bottom-center"
            />
            {children}
        </>
    );
}
