"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { Button } from "@workspace/ui/components/button";

import { Input } from "@workspace/ui/components/input";

import { Label } from "@workspace/ui/components/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

import { Textarea } from "@workspace/ui/components/textarea";

import {
  CalendarDays,
  Clock3,
  DollarSign,
} from "lucide-react";

// ==================== MOCK DATA ====================

const customers = [
  {
    id: "customer-1",
    name: "John Doe",
  },
  {
    id: "customer-2",
    name: "Alex",
  },
];

const courts = [
  {
    id: "court-1",
    name: "Court A",
    pricePerHour: 10,
  },
  {
    id: "court-2",
    name: "Court B",
    pricePerHour: 15,
  },
];

// ==================== VALIDATION ====================

const bookingSchema = z.object({
  customerId: z.string().min(1, "Please select customer"),

  courtId: z.string().min(1, "Please select court"),

  bookingDate: z
    .string()
    .min(1, "Booking date is required"),

  startTime: z
    .string()
    .min(1, "Start time is required"),

  endTime: z
    .string()
    .min(1, "End time is required"),

  depositAmount: z
    .string()
    .min(1, "Deposit amount is required"),

  note: z.string().optional(),
});

type BookingFormValues = z.infer<
  typeof bookingSchema
>;

// ==================== PAGE ====================

export default function CreateBookingPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      customerId: "",
      courtId: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
      depositAmount: "",
      note: "",
    },
  });

  const courtId = watch("courtId");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  // ==================== TOTAL HOURS ====================

  const totalHours = useMemo(() => {
    if (!startTime || !endTime)
      return 0;

    const start = new Date(
      `2025-01-01T${startTime}`
    );

    const end = new Date(
      `2025-01-01T${endTime}`
    );

    const diff =
      (end.getTime() -
        start.getTime()) /
      (1000 * 60 * 60);

    return diff > 0 ? diff : 0;
  }, [startTime, endTime]);

  // ==================== TOTAL AMOUNT ====================

  const totalAmount = useMemo(() => {
    const selectedCourt = courts.find(
      (court) => court.id === courtId
    );

    if (!selectedCourt) return 0;

    return (
      totalHours *
      selectedCourt.pricePerHour
    );
  }, [courtId, totalHours]);

  // ==================== SUBMIT ====================

  async function onSubmit(
    values: BookingFormValues
  ) {
    try {
      const payload = {
        ...values,
        totalHours,
        totalAmount,
      };

      console.log(payload);

      // TODO:
      // call trpc mutation here

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-muted/40 p-6">
      {/* ==================== HEADER ==================== */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Create Booking
        </h1>

        <p className="text-muted-foreground">
          Create new badminton court
          booking.
        </p>
      </div>

      {/* ==================== FORM ==================== */}

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>
            Booking Information
          </CardTitle>

          <CardDescription>
            Fill all required booking
            information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* ==================== GRID ==================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer */}

              <div className="space-y-2">
                <Label>
                  Customer
                </Label>

                <Select
                  onValueChange={(value) =>
                    setValue(
                      "customerId",
                      value,
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>

                  <SelectContent>
                    {customers.map(
                      (customer) => (
                        <SelectItem
                          key={customer.id}
                          value={
                            customer.id
                          }
                        >
                          {customer.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                {errors.customerId && (
                  <p className="text-sm text-red-500">
                    {
                      errors.customerId
                        .message
                    }
                  </p>
                )}
              </div>

              {/* Court */}

              <div className="space-y-2">
                <Label>
                  Court
                </Label>

                <Select
                  onValueChange={(value) =>
                    setValue(
                      "courtId",
                      value,
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select court" />
                  </SelectTrigger>

                  <SelectContent>
                    {courts.map((court) => (
                      <SelectItem
                        key={court.id}
                        value={court.id}
                      >
                        {court.name} (
                        $
                        {
                          court.pricePerHour
                        }
                        /hour)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.courtId && (
                  <p className="text-sm text-red-500">
                    {
                      errors.courtId
                        .message
                    }
                  </p>
                )}
              </div>

              {/* Booking Date */}

              <div className="space-y-2">
                <Label htmlFor="bookingDate">
                  Booking Date
                </Label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-3 size-4 text-muted-foreground" />

                  <Input
                    id="bookingDate"
                    type="date"
                    className="pl-10"
                    {...register(
                      "bookingDate"
                    )}
                  />
                </div>

                {errors.bookingDate && (
                  <p className="text-sm text-red-500">
                    {
                      errors
                        .bookingDate
                        .message
                    }
                  </p>
                )}
              </div>

              {/* Deposit */}

              <div className="space-y-2">
                <Label htmlFor="depositAmount">
                  Deposit Amount
                </Label>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 size-4 text-muted-foreground" />

                  <Input
                    id="depositAmount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    {...register(
                      "depositAmount"
                    )}
                  />
                </div>

                {errors.depositAmount && (
                  <p className="text-sm text-red-500">
                    {
                      errors
                        .depositAmount
                        .message
                    }
                  </p>
                )}
              </div>

              {/* Start Time */}

              <div className="space-y-2">
                <Label htmlFor="startTime">
                  Start Time
                </Label>

                <div className="relative">
                  <Clock3 className="absolute left-3 top-3 size-4 text-muted-foreground" />

                  <Input
                    id="startTime"
                    type="time"
                    className="pl-10"
                    {...register(
                      "startTime"
                    )}
                  />
                </div>

                {errors.startTime && (
                  <p className="text-sm text-red-500">
                    {
                      errors.startTime
                        .message
                    }
                  </p>
                )}
              </div>

              {/* End Time */}

              <div className="space-y-2">
                <Label htmlFor="endTime">
                  End Time
                </Label>

                <div className="relative">
                  <Clock3 className="absolute left-3 top-3 size-4 text-muted-foreground" />

                  <Input
                    id="endTime"
                    type="time"
                    className="pl-10"
                    {...register(
                      "endTime"
                    )}
                  />
                </div>

                {errors.endTime && (
                  <p className="text-sm text-red-500">
                    {
                      errors.endTime
                        .message
                    }
                  </p>
                )}
              </div>
            </div>

            {/* ==================== SUMMARY ==================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Total Hours
                  </p>

                  <h2 className="text-2xl font-bold">
                    {totalHours} Hour
                    {totalHours > 1
                      ? "s"
                      : ""}
                  </h2>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Total Amount
                  </p>

                  <h2 className="text-2xl font-bold">
                    $
                    {totalAmount.toFixed(
                      2
                    )}
                  </h2>
                </CardContent>
              </Card>
            </div>

            {/* ==================== NOTE ==================== */}

            <div className="space-y-2">
              <Label htmlFor="note">
                Note
              </Label>

              <Textarea
                id="note"
                placeholder="Optional note..."
                rows={4}
                {...register("note")}
              />
            </div>

            {/* ==================== ACTION ==================== */}

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating..."
                  : "Create Booking"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}