import { Button } from "@/components/ui/button";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function Chapter({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className="bg-card rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-muted/50 text-muted-foreground"
                >
                  <CloudUploadIcon className="h-5 w-5" />
                  <span className="sr-only">Upload Chapter</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Upload Files</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-muted/50 text-muted-foreground"
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Delete Chapter</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Chapter</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="space-y-2">
        {children ?? "No file to display for the moment"}
      </div>
    </div>
  );
}
