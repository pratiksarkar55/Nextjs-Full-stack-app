import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { events } from "@/lib/constants";
import { cacheLife } from "next/cache";

const Page = async () => {
  "use cache";
  cacheLife("minutes");

  let fetchedEvents: IEvent[] = [];

  try {
    // Only fetch during runtime, not during build
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
        {
          cache: "no-store",
        }
      );

      if (response.ok) {
        const data = await response.json();
        fetchedEvents = data.events || [];
      }
    }
  } catch (error) {
    console.log("Failed to fetch events, using fallback data");
  }

  // Use fetched events or fallback to constants
  const eventsToDisplay = fetchedEvents.length > 0 ? fetchedEvents : events;

  return (
    <section>
      <h1 className="text-center">
        THE Hub For Every Dev
        <br />
        Events You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups and Conferences, All In One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {eventsToDisplay &&
            eventsToDisplay.length > 0 &&
            eventsToDisplay.map((event: any, index: number) => (
              <li key={event.title || event.slug || index}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
