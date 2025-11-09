import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { events } from "@/lib/constants";
import { cacheLife } from "next/cache";

const Page = async () => {
  "use cache";
  cacheLife("minutes");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const events = data.events;

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
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
