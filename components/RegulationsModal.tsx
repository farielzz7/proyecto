"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RegulationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegulationsModal: React.FC<RegulationsModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Regulations</DialogTitle>
          <DialogDescription>
            Please review the regulations.
          </DialogDescription>
        </DialogHeader>
        <div>
          {/* Regulations content goes here */}
          <p>This is a sample of regulations. Replace this with your actual regulations content.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegulationsModal;
