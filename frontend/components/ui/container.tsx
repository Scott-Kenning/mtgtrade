import { ReactNode } from "react";
import NavBar from "../nav-bar";

const Container = ({children}: {children: ReactNode}) => {
    return (
        <div className="gap-y-8">
            <NavBar/>
            <div className="flex flex-col max-w-6xl items-center gap-y-4 px-4 md:px-0">
                {children}
            </div>
        </div>
    )
}

export default Container;