import { NextResponse } from "next/server";
import {
  createCalBooking,
  getAvailableCalSlots,
  type MeetingDuration,
} from "@/lib/cal";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseDuration(value: unknown): MeetingDuration | null {
  const duration = Number(value);
  return duration === 15 || duration === 30 ? duration : null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const duration = parseDuration(searchParams.get("duration"));
    const timeZone = searchParams.get("timeZone") || "Asia/Kolkata";

    if (!duration) {
      return NextResponse.json(
        {
          success: false,
          error: "Choose a 15 or 30 minute meeting.",
        },
        { status: 400 }
      );
    }

    const result = await getAvailableCalSlots(duration, timeZone);

    return NextResponse.json({
      success: true,
      slots: result.slots,
      demo: result.demo,
    });
  } catch (error) {
    console.error("GET Booking Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load meeting slots.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const duration = parseDuration(body.duration);

    const slotStart = String(body.slotStart || "").trim();

    const name = String(body.name || "").trim();

    const email = String(body.email || "").trim();

    const purpose = String(body.purpose || "").trim();

    const timeZone = String(body.timeZone || "Asia/Kolkata").trim();

    // ===== VALIDATION =====

    if (!duration) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid meeting duration.",
        },
        { status: 400 }
      );
    }

    if (!slotStart) {
      return NextResponse.json(
        {
          success: false,
          error: "Please choose an available time slot.",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your name.",
        },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!purpose) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter the purpose of the meeting.",
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(new Date(slotStart).getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid meeting slot selected.",
        },
        { status: 400 }
      );
    }

    // ===== CAL BOOKING =====

    const result = await createCalBooking({
      duration,
      slotStart,
      name,
      email,
      purpose,
      timeZone,
    });

    return NextResponse.json({
      success: true,
      demo: result.demo,
      booking: result.booking,
      message:
        "Meeting booked successfully. A confirmation email and Google Meet link have been sent.",
    });
  } catch (error) {
    console.error("POST Booking Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to schedule the meeting.",
      },
      { status: 500 }
    );
  }
}