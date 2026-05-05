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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const itemList = (
    <ul>
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
  );

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
        <div className="flex justify-between items-center gap-2 pb-2">
          <div className="flex items-center gap-1">
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
          <div className="hidden md:block">
            <CsvUpload
              onItemsLoaded={(newItems) =>
                setItems((prev) => [...prev, ...newItems])
              }
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder={"Add items separated by new lines..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
          </div>
        </form>

        {/* Mobile: dialog trigger */}
        <div className="mt-3 md:hidden">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!items.length}
                />
              }
            >
              View list ({items.length} item{items.length !== 1 ? "s" : ""})
            </DialogTrigger>
            <DialogContent className="max-h-[80dvh] flex flex-col sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Wheel Inputs</DialogTitle>
              </DialogHeader>
              <ScrollArea className="flex-1 min-h-0 -mx-4 px-4">
                {itemList}
              </ScrollArea>
              <DialogFooter showCloseButton>
                <Button
                  variant="destructive"
                  disabled={!items.length}
                  onClick={() => {
                    setItems([]);
                    setDialogOpen(false);
                  }}
                >
                  Clear all
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Desktop: inline list */}
        <ScrollArea className="hidden md:block md:h-112 flex-1 min-h-0 rounded-md mt-2">
          {itemList}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WheelInputList;
