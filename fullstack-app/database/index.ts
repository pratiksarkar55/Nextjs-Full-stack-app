/**
 * Database Models Index
 * Central export point for all database models
 * Allows importing models from a single location: database/
 */

import Event, { IEvent } from "./event.model";
import Booking, { IBooking } from "./booking.model";

// Export models and their TypeScript interfaces
export { Event, Booking };
export type { IEvent, IBooking };

// Export as default for convenience
export default {
  Event,
  Booking,
};
