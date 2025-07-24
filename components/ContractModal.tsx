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

interface ContractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contract</DialogTitle>
          <DialogDescription>
            Please review the contract terms.
          </DialogDescription>
        </DialogHeader>
        <div>
          {/* Contract content goes here */}
          <p>This is a sample contract.  Replace this with your actual contract content.</p>
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

export default ContractModal;
