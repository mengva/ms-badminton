"use client"

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { DollarSign, Search } from "lucide-react";
import { Label } from "recharts";

export default function BookingDepositPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    ເງິນມັດຈຳການຈອງ
                </h1>

                <p className="text-muted-foreground">
                    ເງິນຝາກການຈອງຂອງລູກຄ້າ.
                </p>
            </div>

            <Card className="max-w-4xl">
                <CardHeader>
                    <CardTitle>
                        Deposit Payment
                    </CardTitle>

                    <CardDescription>
                        Record deposit payment for
                        booking.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Search */}

                    <div className="flex gap-2">
                        <Input placeholder="Search booking id..." />

                        <Button variant="outline">
                            <Search className="size-4 mr-2" />
                            Search
                        </Button>
                    </div>

                    {/* Booking Info */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>
                                Customer
                            </Label>

                            <Input
                                disabled
                                value="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Court
                            </Label>

                            <Input
                                disabled
                                value="Court B"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Total Amount
                            </Label>

                            <Input
                                disabled
                                value="$40"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Deposit Amount
                            </Label>

                            <Input placeholder="Enter deposit amount..." />
                        </div>
                    </div>

                    {/* Payment Method */}

                    <div className="space-y-2">
                        <Label>
                            Payment Method
                        </Label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="cash">
                                    Cash
                                </SelectItem>

                                <SelectItem value="transfer">
                                    Bank Transfer
                                </SelectItem>

                                <SelectItem value="qr">
                                    QR Payment
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action */}

                    <div className="flex justify-end gap-3">
                        <Button variant="outline">
                            Cancel
                        </Button>

                        <Button>
                            <DollarSign className="size-4 mr-2" />
                            Confirm Deposit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}