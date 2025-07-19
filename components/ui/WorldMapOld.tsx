import React from "react";

interface MapProps {
  coordinates: number[];
  country: string;
  className?: string;
}

const WorldMap: React.FC<MapProps> = ({ coordinates, country, className }) => {
  // Convert lat/lng to SVG coordinates (rough approximation)
  const latToY = (lat: number) => ((90 - lat) / 180) * 300;
  const lngToX = (lng: number) => ((lng + 180) / 360) * 600;

  const x = coordinates[1] ? lngToX(coordinates[1]) : 300;
  const y = coordinates[0] ? latToY(coordinates[0]) : 150;

  return (
    <div className={`relative bg-gradient-to-b from-blue-50 to-cyan-100 rounded-xl overflow-hidden shadow-lg border border-blue-200 ${className}`}>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 600 300"
        className="bg-gradient-to-b from-blue-50 via-blue-100 to-cyan-200"
      >
        {/* Enhanced background with ocean effect */}
        <defs>
          <pattern id="oceanWaves" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 Q 10 5 20 10 T 40 10" fill="none" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.3"/>
            <path d="M 0 15 Q 10 10 20 15 T 40 15" fill="none" stroke="#0284c7" strokeWidth="0.3" opacity="0.2"/>
          </pattern>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Ocean background */}
        <rect width="100%" height="100%" fill="url(#oceanWaves)" />
        
        {/* Enhanced continent shapes with better positioning */}
        {/* North America */}
        <path
          d="M 80 90 Q 120 75 180 95 Q 200 110 190 130 Q 170 145 140 140 Q 110 125 80 90"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
        />
        
        {/* South America */}
        <path
          d="M 140 145 Q 155 170 150 200 Q 145 230 135 220 Q 125 190 130 160 Q 133 152 140 145"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
        />
        
        {/* Europe */}
        <path
          d="M 270 75 Q 300 65 330 80 Q 320 95 300 90 Q 280 88 270 75"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
        />
        
        {/* Africa */}
        <path
          d="M 280 100 Q 310 105 320 135 Q 330 170 315 200 Q 300 185 290 155 Q 275 120 280 100"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
        />
        
        {/* Asia */}
        <path
          d="M 330 65 Q 420 55 480 80 Q 510 95 495 115 Q 465 125 420 110 Q 375 95 330 65"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
        />
        
        {/* Australia */}
        <path
          d="M 435 190 Q 480 185 510 200 Q 505 220 475 210 Q 450 205 435 190"
          fill="url(#landGradient)"
          stroke="#166534"
          strokeWidth="1"
        />

        {/* Flight path animation if destination is set */}
        {coordinates[0] && coordinates[1] && (
          <g>
            {/* Curved flight path */}
            <path
              d={`M 300 150 Q ${(300 + x) / 2} ${Math.min(y, 150) - 30} ${x} ${y}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-10"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>

            {/* Airplane icon moving along path */}
            <g>
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href={`#flightPath${Date.now()}`}/>
              </animateMotion>
              <text fontSize="12" fill="#f59e0b">✈️</text>
            </g>
            
            <path
              id={`flightPath${Date.now()}`}
              d={`M 300 150 Q ${(300 + x) / 2} ${Math.min(y, 150) - 30} ${x} ${y}`}
              fill="none"
              opacity="0"
            />
          </g>
        )}

        {/* Enhanced destination marker */}
        {coordinates[0] && coordinates[1] && (
          <g>
            {/* Multiple pulsing circles for better effect */}
            <circle
              cx={x}
              cy={y}
              r="15"
              fill="#ef4444"
              opacity="0.2"
              className="animate-ping"
            />
            <circle
              cx={x}
              cy={y}
              r="10"
              fill="#dc2626"
              opacity="0.4"
              className="animate-ping"
            />
            <circle
              cx={x}
              cy={y}
              r="8"
              fill="#dc2626"
              stroke="white"
              strokeWidth="2"
              filter="url(#glow)"
            />
            
            {/* Enhanced location pin */}
            <path
              d={`M ${x} ${y-8} Q ${x-4} ${y-12} ${x} ${y-16} Q ${x+4} ${y-12} ${x} ${y-8}`}
              fill="#b91c1c"
              stroke="white"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
            
            {/* Small flag on pin */}
            <polygon
              points={`${x},${y-16} ${x+8},${y-13} ${x+8},${y-10} ${x},${y-13}`}
              fill="#fbbf24"
              stroke="white"
              strokeWidth="0.5"
            />
          </g>
        )}

        {/* Decorative elements */}
        <g opacity="0.3">
          {/* Clouds */}
          <ellipse cx="100" cy="40" rx="15" ry="8" fill="white" opacity="0.6"/>
          <ellipse cx="110" cy="35" rx="12" ry="6" fill="white" opacity="0.6"/>
          <ellipse cx="450" cy="50" rx="18" ry="9" fill="white" opacity="0.6"/>
          <ellipse cx="465" cy="45" rx="15" ry="7" fill="white" opacity="0.6"/>
        </g>
      </svg>
      
      {/* Enhanced country label with flag emoji */}
      {country && (
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 rounded-lg px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg border border-blue-200 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">�️</span>
            <span>{country}</span>
          </div>
        </div>
      )}
      
      {/* Enhanced coordinates display */}
      {coordinates[0] && coordinates[1] && (
        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-gray-800 to-gray-700 bg-opacity-90 rounded-lg px-3 py-2 text-xs text-white shadow-lg">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{coordinates[0].toFixed(2)}°, {coordinates[1].toFixed(2)}°</span>
          </div>
        </div>
      )}

      {/* Travel distance indicator */}
      {coordinates[0] && coordinates[1] && (
        <div className="absolute top-3 left-3 bg-blue-600 bg-opacity-90 rounded-lg px-3 py-2 text-xs text-white shadow-lg">
          <div className="flex items-center gap-1">
            <span>✈️</span>
            <span>Ready to explore!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export { WorldMap };
