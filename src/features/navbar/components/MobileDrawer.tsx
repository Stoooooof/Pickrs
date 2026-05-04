import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronRight } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { linkItems } from "../utils/linkItems";

const logoUrl = `${import.meta.env.BASE_URL}Logo.png`;

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button className="absolute left-4" variant="outline">
          ☰
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row justify-between items-center">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt="Pickr Logo" className="h-8 w-8" />
          </Link>
          <DrawerClose>
            <Button variant="outline" size="icon-sm">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex w-full max-w-md flex-col gap-4 p-4">
          {linkItems.map((link) => (
            <Item
              key={link.to}
              variant="outline"
              render={<NavLink to={link.to} onClick={() => setOpen(false)} />}
              className="text-lg flex justify-between"
            >
              <div>
                <ItemTitle>{link.label}</ItemTitle>
                <ItemDescription>{link.description}</ItemDescription>
              </div>
              <ItemActions>
                <ChevronRight className="size-4 text-white/60" />
              </ItemActions>
            </Item>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
