import { Header } from "../../../components";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "~/lib/utils";
import React, { useState } from "react";
import { account } from "~/appwrite/client";
import { useNavigate } from "react-router";

export const loader = async () => {
  // Comprehensive list of countries with their flags and coordinates
  return [
    // Europe
    { name: "🇦🇱 Albania", coordinates: [41.1533, 20.1683], value: "Albania" },
    { name: "🇦🇩 Andorra", coordinates: [42.5063, 1.5218], value: "Andorra" },
    { name: "🇦🇹 Austria", coordinates: [47.5162, 14.5501], value: "Austria" },
    { name: "🇧🇪 Belgium", coordinates: [50.5039, 4.4699], value: "Belgium" },
    {
      name: "🇧🇦 Bosnia and Herzegovina",
      coordinates: [43.9159, 17.6791],
      value: "Bosnia and Herzegovina",
    },
    { name: "🇧🇬 Bulgaria", coordinates: [42.7339, 25.4858], value: "Bulgaria" },
    { name: "🇭🇷 Croatia", coordinates: [45.1, 15.2], value: "Croatia" },
    {
      name: "🇨🇿 Czech Republic",
      coordinates: [49.8175, 15.473],
      value: "Czech Republic",
    },
    { name: "🇩🇰 Denmark", coordinates: [56.2639, 9.5018], value: "Denmark" },
    { name: "🇪🇪 Estonia", coordinates: [58.5953, 25.0136], value: "Estonia" },
    { name: "🇫🇮 Finland", coordinates: [61.9241, 25.7482], value: "Finland" },
    { name: "🇫🇷 France", coordinates: [46.6034, 1.8883], value: "France" },
    { name: "🇩🇪 Germany", coordinates: [51.1657, 10.4515], value: "Germany" },
    { name: "🇬🇷 Greece", coordinates: [39.0742, 21.8243], value: "Greece" },
    { name: "🇭🇺 Hungary", coordinates: [47.1625, 19.5033], value: "Hungary" },
    { name: "🇮🇸 Iceland", coordinates: [64.9631, -19.0208], value: "Iceland" },
    { name: "🇮🇪 Ireland", coordinates: [53.4129, -8.2439], value: "Ireland" },
    { name: "🇮🇹 Italy", coordinates: [41.8719, 12.5674], value: "Italy" },
    { name: "🇱🇻 Latvia", coordinates: [56.8796, 24.6032], value: "Latvia" },
    {
      name: "🇱🇹 Lithuania",
      coordinates: [55.1694, 23.8813],
      value: "Lithuania",
    },
    {
      name: "🇱🇺 Luxembourg",
      coordinates: [49.8153, 6.1296],
      value: "Luxembourg",
    },
    { name: "🇲🇹 Malta", coordinates: [35.9375, 14.3754], value: "Malta" },
    { name: "🇲🇩 Moldova", coordinates: [47.4116, 28.3699], value: "Moldova" },
    { name: "🇲🇨 Monaco", coordinates: [43.7384, 7.4246], value: "Monaco" },
    {
      name: "🇲🇪 Montenegro",
      coordinates: [42.7087, 19.3744],
      value: "Montenegro",
    },
    {
      name: "🇳🇱 Netherlands",
      coordinates: [52.1326, 5.2913],
      value: "Netherlands",
    },
    { name: "🇳🇴 Norway", coordinates: [60.472, 8.4689], value: "Norway" },
    { name: "🇵🇱 Poland", coordinates: [51.9194, 19.1451], value: "Poland" },
    { name: "🇵🇹 Portugal", coordinates: [39.3999, -8.2245], value: "Portugal" },
    { name: "🇷🇴 Romania", coordinates: [45.9432, 24.9668], value: "Romania" },
    { name: "🇷🇺 Russia", coordinates: [61.524, 105.3188], value: "Russia" },
    {
      name: "🇸🇲 San Marino",
      coordinates: [43.9424, 12.4578],
      value: "San Marino",
    },
    { name: "🇷🇸 Serbia", coordinates: [44.0165, 21.0059], value: "Serbia" },
    { name: "🇸🇰 Slovakia", coordinates: [48.669, 19.699], value: "Slovakia" },
    { name: "🇸🇮 Slovenia", coordinates: [46.1512, 14.9955], value: "Slovenia" },
    { name: "🇪🇸 Spain", coordinates: [40.4637, -3.7492], value: "Spain" },
    { name: "🇸🇪 Sweden", coordinates: [60.1282, 18.6435], value: "Sweden" },
    {
      name: "🇨🇭 Switzerland",
      coordinates: [46.8182, 8.2275],
      value: "Switzerland",
    },
    { name: "🇺🇦 Ukraine", coordinates: [48.3794, 31.1656], value: "Ukraine" },
    {
      name: "🇬🇧 United Kingdom",
      coordinates: [55.3781, -3.436],
      value: "United Kingdom",
    },
    {
      name: "🇻🇦 Vatican City",
      coordinates: [41.9029, 12.4534],
      value: "Vatican City",
    },

    // North America
    {
      name: "🇺🇸 United States",
      coordinates: [37.0902, -95.7129],
      value: "United States",
    },
    { name: "🇨🇦 Canada", coordinates: [56.1304, -106.3468], value: "Canada" },
    { name: "🇲🇽 Mexico", coordinates: [23.6345, -102.5528], value: "Mexico" },
    {
      name: "🇬🇹 Guatemala",
      coordinates: [15.7835, -90.2308],
      value: "Guatemala",
    },
    { name: "🇧🇿 Belize", coordinates: [17.1899, -88.4976], value: "Belize" },
    {
      name: "🇸🇻 El Salvador",
      coordinates: [13.7942, -88.8965],
      value: "El Salvador",
    },
    { name: "🇭🇳 Honduras", coordinates: [15.2, -86.2419], value: "Honduras" },
    {
      name: "🇳🇮 Nicaragua",
      coordinates: [12.9654, -85.2072],
      value: "Nicaragua",
    },
    {
      name: "🇨🇷 Costa Rica",
      coordinates: [9.7489, -83.7534],
      value: "Costa Rica",
    },
    { name: "🇵🇦 Panama", coordinates: [8.538, -80.7821], value: "Panama" },

    // Caribbean
    { name: "🇨🇺 Cuba", coordinates: [21.5218, -77.7812], value: "Cuba" },
    { name: "🇯🇲 Jamaica", coordinates: [18.1096, -77.2975], value: "Jamaica" },
    { name: "🇭🇹 Haiti", coordinates: [18.9712, -72.2852], value: "Haiti" },
    {
      name: "🇩🇴 Dominican Republic",
      coordinates: [18.7357, -70.1627],
      value: "Dominican Republic",
    },
    {
      name: "🇵🇷 Puerto Rico",
      coordinates: [18.2208, -66.5901],
      value: "Puerto Rico",
    },
    {
      name: "🇹🇹 Trinidad and Tobago",
      coordinates: [10.6918, -61.2225],
      value: "Trinidad and Tobago",
    },
    {
      name: "�� Barbados",
      coordinates: [13.1939, -59.5432],
      value: "Barbados",
    },

    // South America
    { name: "🇧🇷 Brazil", coordinates: [-14.235, -51.9253], value: "Brazil" },
    {
      name: "🇦🇷 Argentina",
      coordinates: [-38.4161, -63.6167],
      value: "Argentina",
    },
    { name: "🇨🇱 Chile", coordinates: [-35.6751, -71.543], value: "Chile" },
    { name: "🇨🇴 Colombia", coordinates: [4.5709, -74.2973], value: "Colombia" },
    { name: "🇵🇪 Peru", coordinates: [-9.19, -75.0152], value: "Peru" },
    {
      name: "🇻🇪 Venezuela",
      coordinates: [6.4238, -66.5897],
      value: "Venezuela",
    },
    { name: "🇪🇨 Ecuador", coordinates: [-1.8312, -78.1834], value: "Ecuador" },
    { name: "🇴 Bolivia", coordinates: [-16.2902, -63.5887], value: "Bolivia" },
    {
      name: "🇵🇾 Paraguay",
      coordinates: [-23.4425, -58.4438],
      value: "Paraguay",
    },
    { name: "🇺🇾 Uruguay", coordinates: [-32.5228, -55.7658], value: "Uruguay" },
    { name: "🇬🇾 Guyana", coordinates: [4.8604, -58.9302], value: "Guyana" },
    { name: "🇸🇷 Suriname", coordinates: [3.9193, -56.0278], value: "Suriname" },

    // Asia
    { name: "🇨🇳 China", coordinates: [35.8617, 104.1954], value: "China" },
    { name: "🇮🇳 India", coordinates: [20.5937, 78.9629], value: "India" },
    { name: "🇯🇵 Japan", coordinates: [36.2048, 138.2529], value: "Japan" },
    {
      name: "�🇷 South Korea",
      coordinates: [35.9078, 127.7669],
      value: "South Korea",
    },
    {
      name: "🇰🇵 North Korea",
      coordinates: [40.3399, 127.5101],
      value: "North Korea",
    },
    { name: "🇹🇭 Thailand", coordinates: [15.87, 100.9925], value: "Thailand" },
    { name: "🇻🇳 Vietnam", coordinates: [14.0583, 108.2772], value: "Vietnam" },
    {
      name: "🇮🇩 Indonesia",
      coordinates: [-0.7893, 113.9213],
      value: "Indonesia",
    },
    { name: "🇲🇾 Malaysia", coordinates: [4.2105, 101.9758], value: "Malaysia" },
    {
      name: "🇸🇬 Singapore",
      coordinates: [1.3521, 103.8198],
      value: "Singapore",
    },
    {
      name: "�� Philippines",
      coordinates: [12.8797, 121.774],
      value: "Philippines",
    },
    { name: "🇰🇭 Cambodia", coordinates: [12.5657, 104.991], value: "Cambodia" },
    { name: "🇱🇦 Laos", coordinates: [19.8563, 102.4955], value: "Laos" },
    { name: "🇲🇲 Myanmar", coordinates: [21.9162, 95.956], value: "Myanmar" },
    {
      name: "🇧🇩 Bangladesh",
      coordinates: [23.685, 90.3563],
      value: "Bangladesh",
    },
    { name: "🇵🇰 Pakistan", coordinates: [30.3753, 69.3451], value: "Pakistan" },
    {
      name: "🇱🇰 Sri Lanka",
      coordinates: [7.8731, 80.7718],
      value: "Sri Lanka",
    },
    { name: "🇮🇷 Iran", coordinates: [32.4279, 53.688], value: "Iran" },
    { name: "🇮� Iraq", coordinates: [33.2232, 43.6793], value: "Iraq" },
    { name: "🇸🇾 Syria", coordinates: [34.8021, 38.9968], value: "Syria" },
    { name: "🇹🇷 Turkey", coordinates: [38.9637, 35.2433], value: "Turkey" },
    {
      name: "🇸🇦 Saudi Arabia",
      coordinates: [23.8859, 45.0792],
      value: "Saudi Arabia",
    },
    {
      name: "🇦🇪 United Arab Emirates",
      coordinates: [23.4241, 53.8478],
      value: "United Arab Emirates",
    },
    { name: "🇮🇱 Israel", coordinates: [31.0461, 34.8516], value: "Israel" },
    { name: "🇯🇴 Jordan", coordinates: [30.5852, 36.2384], value: "Jordan" },
    { name: "🇱🇧 Lebanon", coordinates: [33.8547, 35.8623], value: "Lebanon" },
    {
      name: "�� Afghanistan",
      coordinates: [33.9391, 67.71],
      value: "Afghanistan",
    },
    {
      name: "🇺🇿 Uzbekistan",
      coordinates: [41.3775, 64.5853],
      value: "Uzbekistan",
    },
    {
      name: "🇰🇿 Kazakhstan",
      coordinates: [48.0196, 66.9237],
      value: "Kazakhstan",
    },
    {
      name: "🇲🇳 Mongolia",
      coordinates: [46.8625, 103.8467],
      value: "Mongolia",
    },

    // Africa
    { name: "🇪🇬 Egypt", coordinates: [26.0975, 31.2357], value: "Egypt" },
    { name: "🇲🇦 Morocco", coordinates: [31.7917, -7.0926], value: "Morocco" },
    { name: "�� Tunisia", coordinates: [33.8869, 9.5375], value: "Tunisia" },
    { name: "🇩🇿 Algeria", coordinates: [28.0339, 1.6596], value: "Algeria" },
    { name: "🇱🇾 Libya", coordinates: [26.3351, 17.2283], value: "Libya" },
    { name: "🇸🇩 Sudan", coordinates: [12.8628, 30.2176], value: "Sudan" },
    { name: "🇪🇹 Ethiopia", coordinates: [9.145, 40.4897], value: "Ethiopia" },
    { name: "🇰🇪 Kenya", coordinates: [-0.0236, 37.9062], value: "Kenya" },
    { name: "🇹🇿 Tanzania", coordinates: [-6.369, 34.8888], value: "Tanzania" },
    { name: "🇬 Uganda", coordinates: [1.3733, 32.2903], value: "Uganda" },
    { name: "🇷🇼 Rwanda", coordinates: [-1.9403, 29.8739], value: "Rwanda" },
    {
      name: "🇿🇦 South Africa",
      coordinates: [-30.5595, 22.9375],
      value: "South Africa",
    },
    { name: "🇳🇬 Nigeria", coordinates: [9.082, 8.6753], value: "Nigeria" },
    { name: "🇬🇭 Ghana", coordinates: [7.9465, -1.0232], value: "Ghana" },
    {
      name: "🇨🇮 Ivory Coast",
      coordinates: [7.54, -5.5471],
      value: "Ivory Coast",
    },
    { name: "�� Senegal", coordinates: [14.4974, -14.4524], value: "Senegal" },
    {
      name: "🇿🇼 Zimbabwe",
      coordinates: [-19.0154, 29.1549],
      value: "Zimbabwe",
    },
    {
      name: "🇧🇼 Botswana",
      coordinates: [-22.3285, 24.6849],
      value: "Botswana",
    },
    { name: "🇳🇦 Namibia", coordinates: [-22.9576, 18.4904], value: "Namibia" },

    // Oceania
    {
      name: "🇦🇺 Australia",
      coordinates: [-25.2744, 133.7751],
      value: "Australia",
    },
    {
      name: "🇳🇿 New Zealand",
      coordinates: [-40.9006, 174.886],
      value: "New Zealand",
    },
    { name: "🇫🇯 Fiji", coordinates: [-16.578, 179.4144], value: "Fiji" },
    {
      name: "🇵🇬 Papua New Guinea",
      coordinates: [-6.3149, 143.9555],
      value: "Papua New Guinea",
    },
    {
      name: "🇸🇧 Solomon Islands",
      coordinates: [-9.6457, 160.1562],
      value: "Solomon Islands",
    },
    { name: "🇻🇺 Vanuatu", coordinates: [-15.3767, 166.9592], value: "Vanuatu" },
    {
      name: "🇳🇨 New Caledonia",
      coordinates: [-20.9043, 165.618],
      value: "New Caledonia",
    },
    { name: "🇹🇴 Tonga", coordinates: [-21.1789, -175.1982], value: "Tonga" },
    { name: "🇼🇸 Samoa", coordinates: [-13.759, -172.1046], value: "Samoa" },
    { name: "🇵🇼 Palau", coordinates: [7.515, 134.5825], value: "Palau" },
  ];
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError("Please provide values for all fields");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days");
      setLoading(false);
      return;
    }

    try {
      const user = await account.get();
      if (!user.$id) {
        setError("User not authenticated. Please sign in again.");
        setLoading(false);
        return;
      }

      console.log("Submitting trip creation request...");

      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          numberOfDays: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
          userId: user.$id,
        }),
      });

      const result: CreateTripResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      if (result?.id) {
        console.log("Trip created successfully:", result.id);
        navigate(`/trips/${result.id}`);
      } else {
        throw new Error("No trip ID returned from server");
      }
    } catch (e) {
      console.error("Error generating trip:", e);

      if (e instanceof Error) {
        if (e.message.includes("not authenticated")) {
          setError("Please sign in again to create a trip.");
        } else if (e.message.includes("AI service")) {
          setError(
            "Our AI service is temporarily unavailable. Please try again later."
          );
        } else if (e.message.includes("Image service")) {
          setError(
            "Image service unavailable, but we can still create your trip. Please try again."
          );
        } else if (e.message.includes("Failed to save")) {
          setError(
            "Failed to save your trip. Please check your internet connection and try again."
          );
        } else if (e.message.includes("Failed to create payment")) {
          setError(
            "Trip created but payment setup failed. Please contact support."
          );
        } else {
          setError(e.message || "Failed to generate trip. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };
  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI Generated travel plans"
      />

      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <Select
              options={countryData.map((country) => ({
                value: country.value,
                label: country.text,
              }))}
              onValueChange={(value) => handleChange("country", value)}
              placeholder="Select a Country"
              className="combo-box"
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Enter a number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <Select
                options={comboBoxItems[key].map((item) => ({
                  value: item,
                  label: item,
                }))}
                onValueChange={(value) => handleChange(key, value)}
                placeholder={`Select ${formatKey(key)}`}
                className="combo-box"
              />
            </div>
          ))}

          <div className="bg-gray-200 h-px w-full" />

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <Button
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
                className={cn("size-5", { "animate-spin": loading })}
                alt={loading ? "Loading" : "Magic star"}
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </Button>
          </footer>
        </form>
      </section>
    </main>
  );
};
export default CreateTrip;
