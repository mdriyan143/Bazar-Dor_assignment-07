import { getCategories } from "@/lib/api";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

const Header = async () => {
  const categories = await getCategories();

  return (
    <header className="bg-base-100 border-line border-b">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />
        <UserMenu />
      </div>
      <div className="border-line border-t">
        <NavLinks categories={categories} />
      </div>
    </header>
  );
};

export default Header;