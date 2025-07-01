import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent
} from "@heroui/navbar";
import { Logo } from "@/components/icons";

export const Navbar = () => {
 

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 "
            color="foreground"
            href="/"
          >
            <div className="bg-rose-500"><Logo /></div>
            <p className="font-bold text-inherit">Skelbiu</p>
          </Link>
        </NavbarBrand>
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 "
            color="foreground"
            href="/"
          >
            PLaceHolder
          </Link>
        </NavbarBrand>
      </NavbarContent>
    </HeroUINavbar>
  );
};
