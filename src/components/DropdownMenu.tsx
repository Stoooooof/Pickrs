import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

export default function DropdownMenu() {
  const components = [
    {
      title: "Picker Wheel",
      description: "A fun way to make group decisions with a spinning wheel.",
      href: "/pickerwheel",
    },
    {
      title: "Finger Color Picker",
      description:
        "Place your fingers on the screen and get selected at random.",
      href: "/fingerpicker",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pickers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-2 p-4">
              {components.map((component) => (
                <li key={component.href}>
                  <NavigationMenuLink
                    render={({ className }) => (
                      <NavLink
                        to={component.href}
                        className={`flex-row items-center gap-2 ${className}`}
                      >
                        {component.title}
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
