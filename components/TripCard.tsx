import { Link, useLocation } from "react-router";
import { cn, getFirstWord } from "~/lib/utils";
import { Chip, ChipList } from "./ui/Chip";

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags,
  price,
}: TripCardProps) => {
  const path = useLocation();

  return (
    <Link
      to={
        path.pathname === "/" || path.pathname.startsWith("/travel")
          ? `/travel/${id}`
          : `/trips/${id}`
      }
      className="trip-card"
    >
      <img src={imageUrl} alt={name} />

      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipList>
          {tags?.map((tag, index) => (
            <Chip
              key={index}
              text={getFirstWord(tag)}
              variant={index === 1 ? "pink" : "success"}
            />
          ))}
        </ChipList>
      </div>

      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};
export default TripCard;
