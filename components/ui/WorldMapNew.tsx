import React from "react";

interface MapProps {
  coordinates: number[];
  country: string;
  className?: string;
}

const WorldMap: React.FC<MapProps> = ({ coordinates, country, className }) => {
  // Convert lat/lng to SVG coordinates using Mercator projection
  const mercatorProjection = (lat: number, lng: number) => {
    const width = 800;
    const height = 400;

    // Convert longitude (-180 to 180) to x (0 to width)
    const x = ((lng + 180) / 360) * width;

    // Convert latitude using Mercator projection
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = height / 2 - (width * mercN) / (2 * Math.PI);

    return { x, y };
  };

  const projection =
    coordinates[0] && coordinates[1]
      ? mercatorProjection(coordinates[0], coordinates[1])
      : { x: 400, y: 200 };

  // Country shapes with better geographical accuracy
  const countryPaths: { [key: string]: string } = {
    france:
      "M270,160 L280,155 L290,158 L295,165 L290,175 L280,178 L270,175 L265,168 Z",
    spain: "M250,175 L260,170 L270,178 L265,185 L255,188 L245,185 L240,178 Z",
    italy: "M280,170 L285,165 L290,175 L288,185 L285,195 L280,190 L275,180 Z",
    germany: "M275,145 L285,140 L295,148 L290,158 L280,160 L270,155 Z",
    uk: "M255,145 L265,140 L270,148 L265,155 L260,158 L255,155 Z",
    unitedkingdom: "M255,145 L265,140 L270,148 L265,155 L260,158 L255,155 Z",
    usa: "M120,160 L200,155 L205,170 L195,185 L115,180 Z",
    unitedstates: "M120,160 L200,155 L205,170 L195,185 L115,180 Z",
    japan: "M620,170 L630,165 L635,175 L630,185 L625,180 Z",
    australia: "M550,290 L580,285 L585,300 L575,310 L555,305 Z",
    brazil: "M200,230 L220,225 L225,250 L215,270 L195,260 Z",
    china: "M500,150 L550,145 L555,165 L545,180 L495,175 Z",
    india: "M420,190 L440,185 L445,205 L435,220 L415,215 Z",
    russia: "M320,100 L600,95 L605,130 L315,135 Z",
    canada: "M70,100 L280,95 L285,130 L65,135 Z",
    mexico: "M90,180 L130,175 L135,190 L125,200 L85,195 Z",
    egypt: "M300,210 L310,205 L315,215 L310,225 L295,220 Z",
    southafrica: "M290,290 L310,285 L315,300 L305,310 L285,305 Z",
    argentina: "M180,270 L200,265 L205,295 L195,320 L175,315 Z",
    norway: "M280,100 L290,95 L295,115 L285,120 Z",
    sweden: "M285,100 L295,95 L300,115 L290,120 Z",
    thailand: "M480,220 L490,215 L495,230 L485,240 L475,235 Z",
    vietnam: "M490,210 L500,205 L505,230 L495,245 L485,240 Z",
    turkey: "M310,165 L330,160 L335,170 L325,180 L305,175 Z",
    greece: "M300,180 L310,175 L315,185 L310,195 L295,190 Z",
    portugal: "M235,175 L245,170 L250,180 L245,190 L235,185 Z",
    netherlands: "M265,135 L275,130 L280,140 L270,145 Z",
    switzerland: "M270,155 L280,150 L285,160 L275,165 Z",
  };

  // Get the country path - normalize country name
  const normalizedCountry = country
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("unitedkingdom", "uk")
    .replace("unitedstates", "usa");

  const countryPath = countryPaths[normalizedCountry];

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 rounded-xl overflow-hidden shadow-2xl border-2 border-blue-300 ${className}`}
    >
      <svg
        width="100%"
        height="400"
        viewBox="0 0 800 400"
        className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600"
      >
        <defs>
          {/* Ocean pattern */}
          <pattern
            id="oceanPattern"
            width="60"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 15 Q 15 8 30 15 T 60 15"
              stroke="#0ea5e9"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 0 20 Q 15 13 30 20 T 60 20"
              stroke="#0284c7"
              strokeWidth="0.6"
              fill="none"
              opacity="0.3"
            />
          </pattern>

          {/* Land gradient */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.7" />
          </linearGradient>

          {/* Highlighted country gradient */}
          <linearGradient
            id="highlightGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="countryGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Marker glow */}
          <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean background */}
        <rect width="100%" height="100%" fill="url(#oceanPattern)" />

        {/* World continents - more detailed */}
        {/* North America */}
        <path
          d="M 80 140 Q 140 120 240 135 Q 280 150 270 180 Q 250 200 220 195 Q 180 185 80 140"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* South America */}
        <path
          d="M 220 200 Q 240 220 235 270 Q 230 320 220 310 Q 210 270 215 230 Q 217 215 220 200"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Europe */}
        <path
          d="M 300 120 Q 340 110 380 130 Q 370 150 340 145 Q 310 143 300 120"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Africa */}
        <path
          d="M 310 160 Q 350 165 360 200 Q 370 250 355 290 Q 340 275 330 230 Q 305 195 310 160"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Asia */}
        <path
          d="M 380 110 Q 520 100 640 120 Q 680 135 670 165 Q 640 175 520 160 Q 420 145 380 110"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* China/India region */}
        <path
          d="M 480 160 Q 550 155 580 180 Q 570 210 540 215 Q 500 205 480 160"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Australia */}
        <path
          d="M 600 270 Q 650 265 680 280 Q 675 300 645 295 Q 615 290 600 270"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Highlight selected country */}
        {countryPath && (
          <g>
            {/* Country highlight with glow */}
            <path
              d={countryPath}
              fill="url(#highlightGradient)"
              stroke="#fbbf24"
              strokeWidth="3"
              filter="url(#countryGlow)"
              className="animate-pulse"
            />
            {/* Country name label */}
            <text
              x={projection.x}
              y={projection.y - 25}
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="bold"
              className="drop-shadow-lg"
            >
              {country}
            </text>
          </g>
        )}

        {/* Flight path animation */}
        {coordinates[0] && coordinates[1] && (
          <g>
            <defs>
              <path
                id="flightPath"
                d={`M 400 200 Q ${(400 + projection.x) / 2} ${
                  Math.min(projection.y, 200) - 50
                } ${projection.x} ${projection.y}`}
              />
            </defs>

            {/* Animated flight path */}
            <use
              href="#flightPath"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeDasharray="8,4"
              opacity="0.8"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-12"
                dur="2s"
                repeatCount="indefinite"
              />
            </use>

            {/* Airplane icon */}
            <g>
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#flightPath" />
              </animateMotion>
              <text fontSize="18" fill="#fbbf24" textAnchor="middle">
                ✈️
              </text>
            </g>
          </g>
        )}

        {/* Enhanced destination marker */}
        {coordinates[0] && coordinates[1] && (
          <g>
            {/* Multiple pulsing circles */}
            <circle
              cx={projection.x}
              cy={projection.y}
              r="25"
              fill="#ef4444"
              opacity="0.2"
              className="animate-ping"
            />
            <circle
              cx={projection.x}
              cy={projection.y}
              r="18"
              fill="#dc2626"
              opacity="0.4"
              className="animate-ping"
            />
            <circle
              cx={projection.x}
              cy={projection.y}
              r="12"
              fill="#dc2626"
              stroke="white"
              strokeWidth="3"
              filter="url(#markerGlow)"
            />

            {/* Location pin with flag */}
            <path
              d={`M ${projection.x} ${projection.y - 12} Q ${
                projection.x - 6
              } ${projection.y - 18} ${projection.x} ${projection.y - 24} Q ${
                projection.x + 6
              } ${projection.y - 18} ${projection.x} ${projection.y - 12}`}
              fill="#b91c1c"
              stroke="white"
              strokeWidth="2"
              filter="url(#markerGlow)"
            />

            <polygon
              points={`${projection.x},${projection.y - 24} ${
                projection.x + 15
              },${projection.x - 19} ${projection.x + 15},${
                projection.y - 15
              } ${projection.x},${projection.y - 19}`}
              fill="#fbbf24"
              stroke="white"
              strokeWidth="1"
            />
          </g>
        )}

        {/* Decorative elements */}
        <g opacity="0.4">
          {/* Animated clouds */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;800,0;0,0"
              dur="60s"
              repeatCount="indefinite"
            />
            <ellipse
              cx="100"
              cy="80"
              rx="25"
              ry="12"
              fill="white"
              opacity="0.7"
            />
            <ellipse
              cx="120"
              cy="75"
              rx="20"
              ry="10"
              fill="white"
              opacity="0.7"
            />
            <ellipse
              cx="140"
              cy="78"
              rx="22"
              ry="11"
              fill="white"
              opacity="0.7"
            />
          </g>

          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="800,0;0,0;800,0"
              dur="45s"
              repeatCount="indefinite"
            />
            <ellipse
              cx="600"
              cy="100"
              rx="30"
              ry="15"
              fill="white"
              opacity="0.6"
            />
            <ellipse
              cx="625"
              cy="95"
              rx="25"
              ry="12"
              fill="white"
              opacity="0.6"
            />
          </g>
        </g>

        {/* Grid lines for reference */}
        <g opacity="0.1">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </g>
      </svg>

      {/* Enhanced info panels */}
      {country && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-white to-blue-50 bg-opacity-95 rounded-xl px-5 py-3 shadow-xl border border-blue-200 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <p className="font-bold text-gray-800 text-lg">{country}</p>
              <p className="text-sm text-gray-600">Destination Selected</p>
            </div>
          </div>
        </div>
      )}

      {coordinates[0] && coordinates[1] && (
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-opacity-95 rounded-xl px-4 py-3 shadow-xl">
          <div className="flex items-center gap-2 text-white">
            <span className="text-lg">📍</span>
            <div className="text-sm">
              <p className="font-semibold">{coordinates[0].toFixed(2)}°N</p>
              <p className="font-semibold">{coordinates[1].toFixed(2)}°E</p>
            </div>
          </div>
        </div>
      )}

      {coordinates[0] && coordinates[1] && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-opacity-95 rounded-xl px-4 py-3 shadow-xl">
          <div className="flex items-center gap-2 text-white">
            <span className="text-lg">✈️</span>
            <span className="text-sm font-semibold">Journey Ready!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export { WorldMap };
