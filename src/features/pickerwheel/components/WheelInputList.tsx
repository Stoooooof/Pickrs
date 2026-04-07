import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
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
    <Card className="w-96 min-h-128">
      <CardHeader>
        <CardTitle>Add to wheel</CardTitle>
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
      </CardContent>
    </Card>
  );
};

export default WheelInputList;
