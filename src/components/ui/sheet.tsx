"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:chat-overlay-in data-[state=closed]:chat-overlay-out",
        className
      )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "right" | "bottom";
  hideClose?: boolean;
  /** Allow clicking and scrolling the page behind the panel */
  nonModal?: boolean;
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side = "right",
      hideClose = false,
      nonModal = false,
      className,
      children,
      onInteractOutside,
      onPointerDownOutside,
      ...props
    },
    ref
  ) => (
  <SheetPortal>
    {!nonModal && <SheetOverlay />}
    <DialogPrimitive.Content
      ref={ref}
      aria-modal={nonModal ? false : undefined}
      onInteractOutside={(event) => {
        if (nonModal) event.preventDefault();
        onInteractOutside?.(event);
      }}
      onPointerDownOutside={(event) => {
        if (nonModal) event.preventDefault();
        onPointerDownOutside?.(event);
      }}
      className={cn(
        "fixed z-50 flex flex-col gap-4 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40",
        side === "right" &&
          "inset-y-0 right-0 h-full w-full sm:max-w-md data-[state=closed]:chat-panel-out data-[state=open]:chat-panel-in",
        side === "bottom" &&
          "inset-x-0 bottom-0 h-[85vh] rounded-t-3xl data-[state=closed]:chat-panel-bottom-out data-[state=open]:chat-panel-bottom-in sm:hidden",
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </SheetPortal>
  )
);
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)}
    {...props}
  />
);

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
};
