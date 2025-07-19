import { Link, type LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import type { Route } from "./+types/travel-detail";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import { Header, InfoPill, TripCard } from "../../../components";
import { Button } from "../../../components/ui/Button";
import { Chip, ChipList } from "../../../components/ui/Chip";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) throw new Error("Trip ID is required");

  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    getAllTrips(4, 0),
  ]);

  return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
  };
};

const TravelDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.trip?.imageUrls || [];
  const tripData = parseTripData(loaderData?.trip?.tripDetail);
  const paymentLink = loaderData?.trip?.payment_link;

  // Country coordinate mapping for common destinations
  const getCountryCoordinates = (countryName: string): number[] => {
    const coordinates: { [key: string]: number[] } = {
      france: [48.8566, 2.3522],
      paris: [48.8566, 2.3522],
      japan: [35.6762, 139.6503],
      tokyo: [35.6762, 139.6503],
      italy: [41.9028, 12.4964],
      rome: [41.9028, 12.4964],
      spain: [40.4168, -3.7038],
      madrid: [40.4168, -3.7038],
      "united kingdom": [51.5074, -0.1278],
      london: [51.5074, -0.1278],
      "united states": [40.7128, -74.006],
      "new york": [40.7128, -74.006],
      germany: [52.52, 13.405],
      berlin: [52.52, 13.405],
      australia: [-33.8688, 151.2093],
      sydney: [-33.8688, 151.2093],
      brazil: [-22.9068, -43.1729],
      greece: [37.9838, 23.7275],
      thailand: [13.7563, 100.5018],
      india: [28.7041, 77.1025],
      china: [39.9042, 116.4074],
      canada: [45.4215, -75.6972],
      mexico: [19.4326, -99.1332],
    };

    const normalizedCountry = countryName.toLowerCase().trim();
    return (
      coordinates[normalizedCountry] || tripData?.location?.coordinates || []
    );
  };

  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};
  const allTrips = loaderData.allTrips as Trip[] | [];

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit:", items: bestTimeToVisit },
    { title: "Weather:", items: weatherInfo },
  ];

  return (
    <main className="travel-detail pt-40 wrapper">
      <div className="travel-div">
        <Link to="/" className="back-link">
          <img src="/assets/icons/arrow-left.svg" alt="back icon" />
          <span>Go back</span>
        </Link>

        <section className="container wrapper-md">
          <header>
            <h1 className="p-40-semibold text-dark-100">{name}</h1>
            <div className="flex items-center gap-5">
              <InfoPill
                text={`${duration} day plan`}
                image="/assets/icons/calendar.svg"
              />

              <InfoPill
                text={
                  itinerary
                    ?.slice(0, 4)
                    .map((item) => item.location)
                    .join(", ") || ""
                }
                image="/assets/icons/location-mark.svg"
              />
            </div>
          </header>

          <section className="gallery">
            {imageUrls.map((url: string, i: number) => (
              <img
                src={url}
                key={i}
                className={cn(
                  "w-full rounded-xl object-cover",
                  i === 0
                    ? "md:col-span-2 md:row-span-2 h-[330px]"
                    : "md:row-span-1 h-[150px]"
                )}
              />
            ))}
          </section>

          <section className="flex gap-3 md:gap-5 items-center flex-wrap">
            <ChipList>
              {pillItems.map((pill, i) => {
                const variant = pill.bg.includes("pink")
                  ? "pink"
                  : pill.bg.includes("primary")
                  ? "primary"
                  : pill.bg.includes("success")
                  ? "success"
                  : pill.bg.includes("navy")
                  ? "navy"
                  : "default";
                return (
                  <Chip
                    key={i}
                    text={getFirstWord(pill.text)}
                    variant={variant}
                    className="!text-base !font-medium !px-4"
                  />
                );
              })}
            </ChipList>

            <ul className="flex gap-1 items-center">
              {Array(5)
                .fill("null")
                .map((_, index) => (
                  <li key={index}>
                    <img
                      src="/assets/icons/star.svg"
                      alt="star"
                      className="size-[18px]"
                    />
                  </li>
                ))}

              <li className="ml-1">
                <Chip text="4.9/5" variant="yellow" />
              </li>
            </ul>
          </section>

          <section className="title">
            <article>
              <h3>
                {duration}-Day {country} {travelStyle} Trip
              </h3>
              <p>
                {budget}, {groupType} and {interests}
              </p>
            </article>

            <h2>{estimatedPrice}</h2>
          </section>

          <p className="text-sm md:text-lg font-normal text-dark-400">
            {description}
          </p>

          <ul className="itinerary">
            {itinerary?.map((dayPlan: DayPlan, index: number) => (
              <li key={index}>
                <h3>
                  Day {dayPlan.day}: {dayPlan.location}
                </h3>

                <ul>
                  {dayPlan.activities.map((activity, index: number) => (
                    <li key={index}>
                      <span className="flex-shring-0 p-18-semibold">
                        {activity.time}
                      </span>
                      <p className="flex-grow">{activity.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {visitTimeAndWeatherInfo.map((section) => (
            <section key={section.title} className="visit">
              <div>
                <h3>{section.title}</h3>

                <ul>
                  {section.items?.map((item) => (
                    <li key={item}>
                      <p className="flex-grow">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <a href={paymentLink} className="flex">
            <Button className="button-class">
              <span className="p-16-semibold text-white">
                Pay to join the trip
              </span>
              <span className="price-pill">{estimatedPrice}</span>
            </Button>
          </a>
        </section>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>

        <div className="trip-grid">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
export default TravelDetail;
