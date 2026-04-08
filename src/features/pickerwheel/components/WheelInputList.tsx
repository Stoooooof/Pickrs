import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

type InputListProps = {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const WheelInputList = ({ items, setItems }: InputListProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = inputValue.trim();
    if (newUser) {
      setItems([...items, newUser]);
      setInputValue("");
    }
  };
  const handleRemoveUser = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Card className="relative w-96 md:h-164 h-72">
      <CardHeader>
        <CardTitle>Wheel Input</CardTitle>
        <CardAction>
          <Button disabled={!items.length} onClick={() => setItems([])}>
            Clear List
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddUser}>
          <Field orientation="horizontal" className="gap-2">
            <Input
              id="user-input"
              placeholder="Item 1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" disabled={!inputValue.trim()}>
              +
            </Button>
          </Field>
        </form>
        <ScrollArea className="md:h-134 h-42 rounded-md mt-4">
          <ul className="my-4">
            {items.map((item, index) => (
              <li key={index}>
                <Item className="px-0">
                  <ItemContent>
                    <ItemTitle>{item}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveUser(index)}
                    >
                      -
                    </Button>
                  </ItemActions>
                </Item>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WheelInputList;
