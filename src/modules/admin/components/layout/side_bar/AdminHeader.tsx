import MobileNav from "./MobileNav";


export default function AdminHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-2 border-black bg-white px-6 shadow-sm md:hidden">
            <div className="font-black text-xl">ZEHEL.ADMIN</div>
            <MobileNav />
        </header>
    );
}