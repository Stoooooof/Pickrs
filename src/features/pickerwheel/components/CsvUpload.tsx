import { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { UploadIcon } from "lucide-react";

type CsvUploadProps = {
  onItemsLoaded: (items: string[]) => void;
};

const CsvUpload = ({ onItemsLoaded }: CsvUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [columns, setColumns] = useState<string[][]>([]);
  const [hasHeader, setHasHeader] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      complete: ({ data: rows }) => {
        if (!rows.length) {
          setError("The CSV file appears to be empty.");
          return;
        }

        const colCount = Math.max(...rows.map((r) => r.length));

        if (colCount <= 1) {
          const items = rows.map((r) => r[0]?.trim() ?? "").filter(Boolean);
          onItemsLoaded(items);
        } else {
          const cols = Array.from({ length: colCount }, (_, i) =>
            rows.map((r) => r[i]?.trim() ?? "").filter(Boolean)
          );
          setColumns(cols);
          setOpen(true);
        }
      },
    });
  };

  const handleSelectColumn = (index: number) => {
    const col = columns[index];
    const items = (hasHeader ? col.slice(1) : col).filter(Boolean);
    onItemsLoaded(items);
    setColumns([]);
    setOpen(false);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <div className="flex flex-1 flex-col gap-1">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon className="size-4" />
          Upload CSV
        </Button>
        {error && <FieldError>{error}</FieldError>}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a column</DialogTitle>
            <DialogDescription>
              Which column contains the items to add?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Checkbox
              id="csv-header"
              checked={hasHeader}
              onCheckedChange={(checked) => setHasHeader(Boolean(checked))}
            />
            <Label htmlFor="csv-header" className="text-sm cursor-pointer select-none">
              First row is a header
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            {columns.map((col, i) => {
              const label = hasHeader ? (col[0] ?? `Column ${i + 1}`) : `Column ${i + 1}`;
              const preview = hasHeader ? col.slice(1, 4) : col.slice(0, 3);
              const total = hasHeader ? col.length - 1 : col.length;
              return (
                <Button
                  key={i}
                  type="button"
                  variant="outline"
                  className="h-auto justify-start py-2 text-left"
                  onClick={() => handleSelectColumn(i)}
                >
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">
                      {preview.join(", ")}
                      {total > preview.length ? ` ... +${total - preview.length} more` : ""}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CsvUpload;
