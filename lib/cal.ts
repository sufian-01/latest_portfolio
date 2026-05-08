export type MeetingDuration = 15 | 30;

export type AvailableSlot = {
  id: string;
  start: string;
  label: string;
};

export type BookingRequest = {
  duration: MeetingDuration;
  slotStart: string;
  name: string;
  email: string;
  purpose: string;
  timeZone?: string;
};

const CAL_API_BASE = "https://api.cal.com/v2";

const CAL_SLOTS_API_VERSION = "2024-09-04";

const CAL_BOOKINGS_API_VERSION = "2024-08-13";

function getCalConfig() {
  return {
    apiKey: process.env.CAL_API_KEY || "",
    eventTypeId: Number(process.env.CAL_EVENT_TYPE_ID || 0),
  };
}

function hasDemoConfig() {
  const { apiKey, eventTypeId } = getCalConfig();

  return (
    !apiKey ||
    apiKey === "demo_key_replace_later" ||
    !eventTypeId ||
    eventTypeId === 123456
  );
}

function getHeaders(apiVersion: string) {
  const { apiKey } = getCalConfig();

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "cal-api-version": apiVersion,
  };
}

function formatSlotLabel(
  start: string,
  timeZone = "Asia/Kolkata"
) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date(start));
}

function getDemoSlots(
  duration: MeetingDuration,
  timeZone: string
): AvailableSlot[] {
  const slots: AvailableSlot[] = [];

  const now = new Date();

  const base = new Date(now);

  base.setDate(now.getDate() + 1);

  base.setHours(10, 0, 0, 0);

  for (let index = 0; index < 6; index += 1) {
    const slot = new Date(base);

    slot.setDate(base.getDate() + Math.floor(index / 2));

    slot.setHours(
      index % 2 === 0 ? 10 : 15,
      duration === 15 ? 15 : 0,
      0,
      0
    );

    const start = slot.toISOString();

    slots.push({
      id: start,
      start,
      label: formatSlotLabel(start, timeZone),
    });
  }

  return slots;
}

function flattenCalSlots(
  data: unknown,
  timeZone: string
): AvailableSlot[] {
  if (!data || typeof data !== "object") return [];

  const slots = Object.values(data as Record<string, unknown>)
    .flatMap((value) => (Array.isArray(value) ? value : []))
    .map((slot) => {
      if (typeof slot === "string") return slot;

      if (
        slot &&
        typeof slot === "object" &&
        "start" in slot
      ) {
        return String(slot.start);
      }

      return "";
    })
    .filter(Boolean)
    .slice(0, 8);

  return slots.map((start) => ({
    id: start,
    start,
    label: formatSlotLabel(start, timeZone),
  }));
}

/* =========================================================
   GET AVAILABLE SLOTS
========================================================= */

export async function getAvailableCalSlots(
  duration: MeetingDuration,
  timeZone = "Asia/Kolkata"
) {
  if (hasDemoConfig()) {
    return {
      demo: true,
      slots: getDemoSlots(duration, timeZone),
    };
  }

  const { eventTypeId } = getCalConfig();

  const start = new Date();

  const end = new Date();

  end.setDate(start.getDate() + 14);

  const params = new URLSearchParams({
    eventTypeId: String(eventTypeId),
    start: start.toISOString(),
    end: end.toISOString(),
    duration: String(duration),
    timeZone,
    format: "range",
  });

  console.log("FETCHING CAL SLOTS");

  const response = await fetch(
    `${CAL_API_BASE}/slots?${params.toString()}`,
    {
      headers: getHeaders(CAL_SLOTS_API_VERSION),
      cache: "no-store",
    }
  );

  const payload = await response.json().catch(() => ({}));

  console.log("CAL SLOTS RESPONSE:", payload);

  if (!response.ok || payload.status === "error") {
    throw new Error(
      payload?.error?.message ||
        payload?.message ||
        "Unable to fetch Cal.com slots."
    );
  }

  return {
    demo: false,
    slots: flattenCalSlots(payload.data, timeZone),
  };
}

/* =========================================================
   CREATE BOOKING
========================================================= */

export async function createCalBooking(
  booking: BookingRequest
) {
  if (hasDemoConfig()) {
    return {
      demo: true,
      booking: {
        uid: `demo-${Date.now()}`,
        start: booking.slotStart,
        status: "demo",
      },
    };
  }

  const { eventTypeId } = getCalConfig();

  const payloadBody = {
    start: new Date(booking.slotStart).toISOString(),

    eventTypeId,

    attendee: {
      name: booking.name,
      email: booking.email,
      timeZone: booking.timeZone || "Asia/Kolkata",
      language: "en",
    },

    bookingFieldsResponses: {
      purpose: booking.purpose,
    },

    metadata: {
      source: "portfolio-assistant",
      purpose: booking.purpose,
    },
  };

  console.log("CAL BOOKING PAYLOAD:", payloadBody);

  const response = await fetch(
    `${CAL_API_BASE}/bookings`,
    {
      method: "POST",

      headers: getHeaders(CAL_BOOKINGS_API_VERSION),

      body: JSON.stringify(payloadBody),
    }
  );

  const payload = await response.json().catch(() => ({}));

  console.log("CAL BOOKING RESPONSE:", payload);

  if (!response.ok || payload.status === "error") {
    throw new Error(
      payload?.error?.message ||
        payload?.message ||
        "Unable to create Cal.com booking."
    );
  }

  return {
    demo: false,
    booking: payload.data,
  };
}