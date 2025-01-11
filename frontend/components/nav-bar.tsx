import Link from "next/link"

const NavBar = () => {
    return (
        <nav className="px-8 py-4 w-screen bg-purple-950 flex justify-between">
            <p>Logo</p>
            <ul className="flex gap-4">
                <li>
                    <Link href="/cards">Cards</Link>
                </li>
                <li>
                    <Link href="/offers">Offers</Link>
                </li>
                <li>
                    <Link href="/trade">Trades</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;