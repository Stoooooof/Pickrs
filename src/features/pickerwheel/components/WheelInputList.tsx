import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CsvUpload from "./CsvUpload";
import { useState } from "react";

type InputListProps = {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  saveEnabled: boolean;
  setSaveEnabled: (enabled: boolean) => void;
};

const parseItems = (value: string): string[] =>
  value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const WheelInputList = ({
  items,
  setItems,
  saveEnabled,
  setSaveEnabled,
}: InputListProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddItems = () => {
    const newItems = parseItems(inputValue);
    if (newItems.length) {
      setItems([...items, ...newItems]);
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddItems();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddItems();
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Card className="relative flex-1 w-full md:flex-none md:w-[28rem] md:h-164">
      <CardHeader>
        <CardTitle>Wheel Input</CardTitle>
        <CardAction>
          <Button disabled={!items.length} onClick={() => setItems([])}>
            Clear List
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-2 pb-2">
          <Checkbox
            id="save-items"
            checked={saveEnabled}
            onCheckedChange={(checked) => setSaveEnabled(Boolean(checked))}
          />
          <Label
            htmlFor="save-items"
            className="text-sm cursor-pointer select-none"
          >
            Save items
          </Label>
        </div>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder={"Item 1\nItem 2\nItem 3 ..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none h-20"
          />
          <div className="flex gap-2 mt-3 w-full">
            <Button
              className="flex-1"
              type="submit"
              disabled={!inputValue.trim()}
            >
              Add
            </Button>
            <CsvUpload
              onItemsLoaded={(newItems) =>
                setItems((prev) => [...prev, ...newItems])
              }
            />
          </div>
        </form>
        <ScrollArea className="md:h-112 flex-1 min-h-0 rounded-md mt-2">
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
                      onClick={() => handleRemoveItem(index)}
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
