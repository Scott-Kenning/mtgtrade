import { ReactNode } from "react";
import NavBar from "../nav-bar";

const Container = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex flex-col items-center gap-y-4 px-4 md:px-8">
            <NavBar/>
            {children}
        </div>
    )
}

export default Container;