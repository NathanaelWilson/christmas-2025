"use client"

interface TreeFrameProps {
  position: "left" | "right"
}

export default function TreeFrame({ position }: TreeFrameProps) {
  const isLeft = position === "left"

  return (
    <svg
      className={`absolute top-0 h-full w-48 ${isLeft ? "left-0" : "right-0"} opacity-90`}
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paper-cut style trees with layered effect */}
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background trees (darker) */}
      {[0, 300, 600].map((y) => (
        <g key={`bg-${y}`} transform={`translate(${isLeft ? 10 : -10}, ${y})`} opacity="0.7">
          {/* Tree triangle */}
          <polygon
            points={`${isLeft ? "50,0" : "150,0"} ${isLeft ? "10,60" : "190,60"} ${isLeft ? "90,60" : "110,60"}`}
            fill="#10b981"
            opacity="0.8"
          />
          <polygon
            points={`${isLeft ? "50,40" : "150,40"} ${isLeft ? "0,100" : "200,100"} ${isLeft ? "100,100" : "100,100"}`}
            fill="#059669"
            opacity="0.7"
          />
          <polygon
            points={`${isLeft ? "50,80" : "150,80"} ${isLeft ? "5,130" : "195,130"} ${isLeft ? "95,130" : "105,130"}`}
            fill="#047857"
            opacity="0.8"
          />
          {/* Trunk */}
          <rect x={isLeft ? 45 : 155} y="110" width="10" height="30" fill="#92400e" opacity="0.7" />
        </g>
      ))}

      {/* Foreground trees (lighter) */}
      {[150, 450, 750].map((y) => (
        <g key={`fg-${y}`} transform={`translate(${isLeft ? -10 : 10}, ${y})`} filter="url(#shadow)">
          {/* Tree triangle */}
          <polygon
            points={`${isLeft ? "50,0" : "150,0"} ${isLeft ? "5,70" : "195,70"} ${isLeft ? "95,70" : "105,70"}`}
            fill="#10b981"
            opacity="0.95"
          />
          <polygon
            points={`${isLeft ? "50,45" : "150,45"} ${isLeft ? "-5,110" : "205,110"} ${isLeft ? "105,110" : "95,110"}`}
            fill="#06b6d4"
            opacity="0.15"
          />
          <polygon
            points={`${isLeft ? "50,85" : "150,85"} ${isLeft ? "0,140" : "200,140"} ${isLeft ? "100,140" : "100,140"}`}
            fill="#059669"
            opacity="0.9"
          />
          {/* Trunk */}
          <rect x={isLeft ? 45 : 155} y="115" width="10" height="35" fill="#b45309" opacity="0.8" />

          {/* Ornaments and decorations */}
          <circle cx={isLeft ? 30 : 170} cy="30" r="3" fill="#fcd34d" opacity="0.8" />
          <circle cx={isLeft ? 70 : 130} cy="50" r="2.5" fill="#f87171" opacity="0.7" />
          <circle cx={isLeft ? 50 : 150} cy="70" r="3" fill="#fbbf24" opacity="0.75" />
        </g>
      ))}

      {/* Snowflakes scattered */}
      {[50, 150, 250, 350, 500, 650, 800, 900].map((y, i) => (
        <text
          key={`snow-${i}`}
          x={isLeft ? 30 + (i % 3) * 40 : 170 - (i % 3) * 40}
          y={y}
          fontSize="20"
          fill="white"
          opacity="0.6"
        >
          ❄
        </text>
      ))}
    </svg>
  )
}
