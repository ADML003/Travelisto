import { Link, type LoaderFunctionArgs, useSearchParams } from "react-router";
import { Button } from "../../../components/ui/Button";
import { cn, parseTripData } from "~/lib/utils";
import { Header, TripCard, CinematicSlider } from "../../../components";
import { getAllTrips } from "~/appwrite/trips";
import type { Route } from "../../../.react-router/types/app/routes/admin/+types/trips";
import { useState } from "react";
import { getUser } from "~/appwrite/auth";
import { Pagination } from "../../../components/ui/Pagination";

const FeaturedDestination = ({
  containerClass = "",
  bigCard = false,
  rating,
  title,
  activityCount,
  bgImage,
}: DestinationProps) => (
  <section
    className={cn(
      "rounded-[14px] overflow-hidden bg-cover bg-center size-full min-w-[280px]",
      containerClass,
      bgImage
    )}
  >
    <div className="bg-linear200 h-full">
      <article className="featured-card">
        <div
          className={cn(
            "bg-white rounded-20 font-bold text-red-100 w-fit py-px px-3 text-sm"
          )}
        >
          {rating}
        </div>

        <article className="flex flex-col gap-3.5">
          <h2
            className={cn("text-lg font-semibold text-white", {
              "p-30-bold": bigCard,
            })}
          >
            {title}
          </h2>

          <figure className="flex gap-2 items-center">
            <img
              src="/assets/images/david.webp"
              alt="user"
              className={cn("size-4 rounded-full aspect-square", {
                "size-11": bigCard,
              })}
            />
            <p
              className={cn("text-xs font-normal text-white", {
                "text-lg": bigCard,
              })}
            >
              {activityCount} activities
            </p>
          </figure>
        </article>
      </article>
    </div>
  </section>
);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const [user, { allTrips, total }] = await Promise.all([
    getUser(),
    getAllTrips(limit, offset),
  ]);

  return {
    trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};

const TravelPage = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];

  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };

  // Cinematic image slider data for trending destinations
  const trendingDestinations = [
    {
      id: "barcelona",
      imageUrl:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      location: "Barcelona",
      country: "Spain",
      description:
        "Experience the vibrant culture, stunning architecture, and Mediterranean charm of Barcelona. From Gaudí's masterpieces to the Gothic Quarter's narrow streets, discover a city where art and history come alive.",
      rating: 4.8,
      activities: 247,
    },
    {
      id: "tokyo",
      imageUrl:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      location: "Tokyo",
      country: "Japan",
      description:
        "Dive into the electric energy of Tokyo, where ancient traditions meet cutting-edge technology. Discover hidden temples nestled between neon-lit skyscrapers, world-class cuisine, and the perfect harmony of old and new.",
      rating: 4.9,
      activities: 456,
    },
    {
      id: "santorini",
      imageUrl:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      location: "Santorini",
      country: "Greece",
      description:
        "Witness the most breathtaking sunsets over the Aegean Sea from the iconic whitewashed cliffs of Santorini. Explore volcanic beaches, charming villages, and indulge in world-renowned Greek hospitality.",
      rating: 4.7,
      activities: 89,
    },
    {
      id: "iceland",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      location: "Reykjavik",
      country: "Iceland",
      description:
        "Journey through the mystical land of fire and ice. Experience the ethereal Northern Lights, powerful geysers, and dramatic landscapes that make Iceland a photographer's paradise and nature lover's dream.",
      rating: 4.6,
      activities: 134,
    },
    {
      id: "bali",
      imageUrl:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      location: "Ubud",
      country: "Bali, Indonesia",
      description:
        "Find serenity in the cultural heart of Bali, surrounded by emerald rice terraces and ancient temples. Immerse yourself in a vibrant arts scene, traditional crafts, and spiritual experiences that will captivate your soul.",
      rating: 4.5,
      activities: 298,
    },
    {
      id: "patagonia",
      imageUrl:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      location: "Patagonia",
      country: "Chile & Argentina",
      description:
        "Explore one of Earth's last wild frontiers, where towering glaciers meet pristine lakes and jagged peaks pierce the sky. Patagonia offers unparalleled adventure and some of the planet's most pristine wilderness.",
      rating: 4.9,
      activities: 156,
    },
  ];

  return (
    <main className="flex flex-col">
      <section className="travel-hero">
        <div>
          <section className="wrapper">
            <article>
              <h1 className="p-72-bold text-dark-100">
                🌍 Your Next Adventure Awaits! ✈️
              </h1>

              <p className="text-dark-100">
                AI-powered trip planner that creates personalized itineraries in
                minutes. Pick your destination, share your style, and let us
                craft the perfect adventure! Ready to explore? 🗺️
              </p>
            </article>

            <Link to="#trips">
              <Button
                type="button"
                className="button-class !h-11 !w-full md:!w-[240px]"
              >
                <span className="p-16-semibold text-white">
                  🚀 Start Planning Now
                </span>
              </Button>
            </Link>
          </section>
        </div>
      </section>

      <section className="pt-20 flex flex-col gap-10 h-full">
        <div className="wrapper">
          <Header
            title="🌟 Trending Travel Experiences"
            description="Discover the world's most captivating destinations through immersive video experiences. Each destination is handpicked by our travel experts and loved by adventurers like you! 🏖️🏔️"
          />
        </div>

        <div className="w-full px-4 lg:px-8">
          <CinematicSlider
            slides={trendingDestinations}
            autoPlay={true}
            autoPlayInterval={6000}
          />
        </div>
      </section>

      <section id="trips" className="py-20 wrapper flex flex-col gap-10">
        <Header
          title="✨ AI-Curated Trip Collection"
          description="Explore perfectly crafted journeys designed by our intelligent travel planner. Each itinerary is tailored for unforgettable experiences! 🎯"
        />

        <div className="trip-grid">
          {trips.map((trip) => (
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

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(loaderData.total / 8)}
          onPageChange={handlePageChange}
          className="!mb-4"
        />
      </section>

      <footer className="h-28 bg-white">
        <div className="wrapper footer-container">
          <Link to="/">
            <img
              src="/assets/icons/travelisto-logo-blue.svg"
              alt="Travelisto logo"
              className="size-[40px]"
            />
            <h1>Travelisto</h1>
          </Link>

          <div>
            {["Terms & Conditions", "Privacy Policy"].map((item) => (
              <Link to="/" key={item}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};
export default TravelPage;
