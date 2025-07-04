import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent
} from "@heroui/navbar";
import Logo from "@/static/Logo";

export const Navbar = () => {
 

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex items-center justify-start gap-1 "
            color="foreground"
            href="/"
          >
            <div>
              <Logo 
                className="stroke-black size-5 fill-rose-500 bg-rose-500"
              />
            </div>
            <p className="font-bold text-inherit">Skelbiu</p>
          </Link>
        </NavbarBrand>
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex items-center justify-start gap-1 "
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
