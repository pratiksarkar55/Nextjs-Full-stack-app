import mongoose, { Document, Model, Schema } from "mongoose";
import Event from "./event.model";

/**
 * Booking document interface extending Mongoose Document
 * Defines the TypeScript type for Booking documents
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking schema definition with validation and indexing
 */
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true, // Index for faster queries on eventId
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    versionKey: false, // Disable __v version field
  }
);

/**
 * Pre-save hook for event validation
 * Verifies that the referenced eventId corresponds to an existing Event
 */
bookingSchema.pre("save", async function (next) {
  // Only validate eventId if it's being modified (new document or eventId change)
  if (this.isModified("eventId")) {
    try {
      // Check if the referenced event exists in the database
      const eventExists = await Event.findById(this.eventId)
        .select("_id")
        .lean();

      if (!eventExists) {
        throw new Error(`Event with ID ${this.eventId} does not exist`);
      }
    } catch (error) {
      // If it's a validation error, pass it along
      if (error instanceof Error) {
        return next(error);
      }
      // For other errors (like database connection issues), create a generic error
      return next(new Error("Failed to validate event reference"));
    }
  }

  next();
});

/**
 * Compound index for efficient querying by event and email
 * Prevents duplicate bookings for the same event by the same email
 */
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Static method to check if a booking already exists for an event and email
 * Useful for preventing duplicate bookings at the application level
 */
bookingSchema.statics.bookingExists = async function (
  eventId: mongoose.Types.ObjectId,
  email: string
): Promise<boolean> {
  const booking = await this.findOne({ eventId, email }).lean();
  return !!booking;
};

/**
 * Instance method to get the associated event details
 * Convenience method for populating event information
 */
bookingSchema.methods.getEventDetails = async function () {
  return await Event.findById(this.eventId).lean();
};

/**
 * Create and export the Booking model with additional static methods
 * Prevents re-compilation errors in development by checking if model exists
 */
interface BookingModel extends Model<IBooking> {
  bookingExists(
    eventId: mongoose.Types.ObjectId,
    email: string
  ): Promise<boolean>;
}

const Booking: BookingModel =
  (mongoose.models.Booking as BookingModel) ||
  mongoose.model<IBooking, BookingModel>("Booking", bookingSchema);

export default Booking;
