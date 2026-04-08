import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { linkItems } from "../utils/linkItems";

export default function DropdownMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pickers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-2 p-4">
              {linkItems.map((link) => (
                <li key={link.to}>
                  <NavigationMenuLink
                    render={({ className }) => (
                      <NavLink
                        to={link.to}
                        className={`flex-row items-center gap-2 ${className}`}
                      >
                        {link.label}
                      </NavLink>
                    )}
                  />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
