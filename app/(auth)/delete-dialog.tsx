import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";

  
  type DeleteConfirmationDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
  };
  
  const DeleteConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
  }: DeleteConfirmationDialogProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white shadow-lg p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold dark:text-black">Delete Information</DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete this content? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DeleteConfirmationDialog;
  