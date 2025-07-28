import { Navbar } from "@/components/navbar";
import React from "react";

type MainLayoutProps = {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen relative overflow-hidden">
            {/* Just background decorations */}
            <div className="hidden md:block absolute -z-10 -right-[10vw] -bottom-[15vh] rounded-full w-[20vw] h-[40vh] bg-rose-500 blur-[10vh]"/>
            <div className="hidden md:block absolute -z-10 -left-[5vw] -bottom-[2vh] rounded-full w-[13vw] h-[26vh] bg-stone-500/80 blur-[5vh]"/>
            <div className="hidden md:block absolute -z-10 left-[5vw] -bottom-[8vh] rounded-full w-[10vw] h-[20vh] bg-rose-500 blur-[5vh]"/>

            {/* Content */}
            <div className="relative flex flex-col min-h-screen bg-zinc-100/80">
                <Navbar />
                <main className="flex-grow w-full p-3 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
};

export default MainLayout;