const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <main className="container max-w-[30rem]">{children}</main>
        </div>
    );
};

export default AuthLayout;
