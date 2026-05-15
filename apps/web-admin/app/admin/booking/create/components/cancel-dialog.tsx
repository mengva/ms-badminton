'use client';

import { useState } from 'react';
import { Textarea } from '@workspace/ui/components/textarea';
import { Button } from '@workspace/ui/components/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@workspace/ui/components/dialog';
import { Label } from '@workspace/ui/components/label';

export function CancelDialog({ booking, open, onOpenChange, onSuccess }: any) {
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = async () => {
        if (!reason.trim()) return alert('Please provide a reason');

        setIsLoading(true);
        // API call to cancel booking
        console.log('Cancelling booking:', booking.id, 'Reason:', reason);

        setTimeout(() => {
            onSuccess();
            setReason('');
            setIsLoading(false);
        }, 800);
    };

    if (!booking) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel this booking? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="text-sm">
                        <strong>Booking ID:</strong> {booking.id}<br />
                        <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}<br />
                        <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                    </div>

                    <div>
                        <Label htmlFor="reason">Cancellation Reason</Label>
                        <Textarea
                            id="reason"
                            placeholder="Customer requested cancellation..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Keep Booking
                    </Button>
                    <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
                        {isLoading ? 'Cancelling...' : 'Confirm Cancellation'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}