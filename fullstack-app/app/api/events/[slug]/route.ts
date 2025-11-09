import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event, { IEvent } from "@/database/event.model";

/**
 * Type definition for route parameters
 * Ensures type safety for the dynamic slug parameter
 */
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * API Response types for consistent response structure
 */
interface SuccessResponse {
  event: IEvent;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 *
 * @param request - NextRequest object (unused but required by Next.js)
 * @param params - Route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Extract and validate slug parameter
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json<ErrorResponse>(
        {
          message: "Slug parameter is required",
          error: "Missing slug in URL path",
        },
        { status: 400 }
      );
    }

    // Validate slug format (URL-friendly string)
    if (!isValidSlug(slug)) {
      return NextResponse.json<ErrorResponse>(
        {
          message: "Invalid slug format",
          error: "Slug must contain only letters, numbers, and hyphens",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Query event by slug using lean() for better performance
    const event = (await Event.findOne({ slug }).lean()) as IEvent | null;

    // Handle event not found
    if (!event) {
      return NextResponse.json<ErrorResponse>(
        {
          message: "Event not found",
          error: `No event exists with slug: ${slug}`,
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json<SuccessResponse>({ event }, { status: 200 });
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Error fetching event by slug:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      // Database connection or query errors
      if (
        error.message.includes("connection") ||
        error.message.includes("timeout")
      ) {
        return NextResponse.json<ErrorResponse>(
          {
            message: "Database connection failed",
            error: "Please try again later",
          },
          { status: 503 } // Service Unavailable
        );
      }

      // Validation or other known errors
      return NextResponse.json<ErrorResponse>(
        {
          message: "Error fetching event",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Unknown error type
    return NextResponse.json<ErrorResponse>(
      {
        message: "An unexpected error occurred",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * Validates slug format to ensure it's URL-friendly
 * Allows letters, numbers, hyphens, and prevents injection attacks
 *
 * @param slug - The slug string to validate
 * @returns true if slug is valid, false otherwise
 */
function isValidSlug(slug: string): boolean {
  // Check if slug is a non-empty string
  if (typeof slug !== "string" || slug.length === 0) {
    return false;
  }

  // Check slug length (reasonable limits)
  if (slug.length > 200) {
    return false;
  }

  // Validate slug format: letters, numbers, hyphens only
  // Must not start or end with hyphen
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}
