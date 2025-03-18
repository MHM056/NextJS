import Link from "next/link";

export default function MainHeader() {
    return (
        <>
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/news">News</Link></li>
            </ul>
        </nav>
        </>
    );
}