// components/legal-dialog.tsx
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type LegalDialogProps = {
    label: string
    title: string
    children: React.ReactNode
}

export const LegalDialog = ({ label, title, children }: LegalDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger className="hover:opacity-100 opacity-70 transition cursor-pointer">
                {label}
            </DialogTrigger>
            <DialogContent className="max-w-4xl! w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="text-sm leading-relaxed text-muted-foreground">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}