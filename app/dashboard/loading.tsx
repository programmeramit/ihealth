"use client"
const styles = `
  @keyframes ringPulse {
    0%   { transform: scale(0.5); opacity: 0.85; }
    100% { transform: scale(1.3); opacity: 0; }
  }
  @keyframes heartbeat {
    0%   { transform: scale(1); }
    14%  { transform: scale(1.18); }
    28%  { transform: scale(1); }
    42%  { transform: scale(1.12); }
    56%  { transform: scale(1); }
    100% { transform: scale(1); }
  }
  @keyframes ecgScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-200px); }
  }
  @keyframes labelBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }
  .hl-ring   { animation: ringPulse 2s ease-out infinite; }
  .hl-ring-1 { animation-delay: 0s; }
  .hl-ring-2 { animation-delay: 0.4s; }
  .hl-ring-3 { animation-delay: 0.8s; }
  .hl-heart-bg { animation: heartbeat 1.2s ease-in-out infinite; }
  .hl-ecg-svg  { animation: ecgScroll 1.8s linear infinite; }
  .hl-label    { animation: labelBlink 1.2s ease-in-out infinite; }
`;

export default function HeartLoader() {
  return (
    <>
      <style>{styles}</style>

      {/* Full screen transparent wrapper */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Heart + rings container */}
          <div
            style={{
              position: "relative",
              width: 200,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Pulse rings */}
            {[
              { size: 120, color: "#e05a7a", delay: "0s" },
              { size: 155, color: "#e05a7a", delay: "0.4s" },
              { size: 190, color: "#c0445e", delay: "0.8s" },
            ].map((ring, i) => (
              <div
                key={i}
                className={`hl-ring hl-ring-${i + 1}`}
                style={{
                  position: "absolute",
                  width: ring.size,
                  height: ring.size,
                  borderRadius: "50%",
                  border: `3px solid ${ring.color}`,
                  opacity: 0,
                  animationDelay: ring.delay,
                }}
              />
            ))}

            {/* Heart circle */}
            <div
              className="hl-heart-bg"
              style={{
                position: "relative",
                zIndex: 4,
                width: 90,
                height: 90,
                background: "linear-gradient(135deg, #e05a7a 0%, #c0445e 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 32px rgba(224,90,122,0.5)",
              }}
            >
              <svg
                width="46"
                height="46"
                viewBox="0 0 100 90"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Heart shape */}
                <path
                  d="M50 85 C50 85 5 55 5 30 C5 15 17 5 30 5 C38 5 45 10 50 17 C55 10 62 5 70 5 C83 5 95 15 95 30 C95 55 50 85 50 85Z"
                  fill="white"
                  opacity="0.95"
                />
                {/* ECG pulse inside heart */}
                <polyline
                  points="20,48 30,48 36,32 42,62 48,28 54,60 60,40 68,40 74,48 80,48"
                  fill="none"
                  stroke="#e05a7a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* ECG strip */}
          <div
            style={{
              marginTop: 32,
              width: 200,
              overflow: "hidden",
              height: 36,
              position: "relative",
            }}
          >
            <svg
              className="hl-ecg-svg"
              width="400"
              height="36"
              viewBox="0 0 400 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[0, 200].map((off) => (
                <polyline
                  key={off}
                  fill="none"
                  stroke="#e05a7a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={[
                    [0 + off, 18], [20 + off, 18], [28 + off, 18],
                    [33 + off, 4], [37 + off, 32], [41 + off, 8],
                    [46 + off, 26], [52 + off, 18], [72 + off, 18],
                    [80 + off, 18], [85 + off, 4], [89 + off, 32],
                    [93 + off, 8], [98 + off, 26], [104 + off, 18],
                    [124 + off, 18], [132 + off, 18], [137 + off, 4],
                    [141 + off, 32], [145 + off, 8], [150 + off, 26],
                    [156 + off, 18], [176 + off, 18], [184 + off, 18],
                    [189 + off, 4], [193 + off, 32], [197 + off, 8],
                    [202 + off, 26], [200 + off, 18],
                  ]
                    .map(([x, y]) => `${x},${y}`)
                    .join(" ")}
                />
              ))}
            </svg>
          </div>

          {/* Loading label */}
          <div
            className="hl-label"
            style={{
              marginTop: 16,
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "#e05a7a",
              fontFamily: "monospace",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    </>
  );
}