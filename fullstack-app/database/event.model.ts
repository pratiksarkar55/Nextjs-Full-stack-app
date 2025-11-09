import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Event document interface extending Mongoose Document
 * Defines the TypeScript type for Event documents
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event schema definition with validation and indexing
 */
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
      maxlength: [500, "Overview cannot exceed 500 characters"],
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
      validate: {
        validator: function (value: string) {
          // Validate ISO date format (YYYY-MM-DD)
          return /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        message: "Date must be in ISO format (YYYY-MM-DD)",
      },
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
      validate: {
        validator: function (value: string) {
          // Validate 24-hour time format (HH:MM)
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        },
        message: "Time must be in 24-hour format (HH:MM)",
      },
    },
    mode: {
      type: String,
      required: [true, "Event mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
      lowercase: true,
    },
    audience: {
      type: String,
      required: [true, "Event audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: function (value: string[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: function (value: string[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one tag is required",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    versionKey: false, // Disable __v version field
  }
);

/**
 * Pre-save hook for slug generation and data normalization
 * Runs before every save operation
 */
eventSchema.pre("save", function (next) {
  // Only regenerate slug if title has changed
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }

  // Normalize date to ISO format if modified
  if (this.isModified("date")) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time format if modified
  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }

  next();
});

/**
 * Generates a URL-friendly slug from the title
 * Converts to lowercase, replaces spaces with hyphens, removes special characters
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Normalizes date string to ISO format (YYYY-MM-DD)
 * Handles common date formats and converts them to standard ISO format
 */
function normalizeDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD part
}

/**
 * Normalizes time string to 24-hour format (HH:MM)
 * Converts various time formats to consistent 24-hour format
 */
function normalizeTime(timeString: string): string {
  // Handle 12-hour format with AM/PM
  const time12HourMatch = timeString.match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM)$/i);

  if (time12HourMatch) {
    let hours = parseInt(time12HourMatch[1], 10);
    const minutes = time12HourMatch[2] ? parseInt(time12HourMatch[2], 10) : 0;
    const period = time12HourMatch[3].toUpperCase();

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  // Handle 24-hour format (already normalized)
  const time24HourMatch = timeString.match(/^(\d{1,2}):(\d{2})$/);
  if (time24HourMatch) {
    const hours = parseInt(time24HourMatch[1], 10);
    const minutes = parseInt(time24HourMatch[2], 10);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  throw new Error("Invalid time format. Use HH:MM or H:MM AM/PM");
}

/**
 * Create and export the Event model
 * Prevents re-compilation errors in development by checking if model exists
 */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;
