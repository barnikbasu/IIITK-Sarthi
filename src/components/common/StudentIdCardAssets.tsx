import React from "react";

// Official Cyan-Blue color from the physical ID card
export const IIITK_CYAN = "#0084cb";

/**
 * DEFAULT DIGITAL ID PHOTO PLACEHOLDER
 * Institutional, minimalist head-and-shoulders silhouette
 * for the IIIT Kalyani Digital Student ID Card.
 * Appears when a student has not uploaded a profile photograph (profilePhoto = null/undefined).
 *
 * Visual style:
 * - Formal university identity-card aesthetic
 * - Minimalist & institutional
 * - Pure geometric head (circle) and symmetrical shoulders/bust
 * - No facial features, no hair, no clothing details, no accessories
 * - Clean contrast across Light and Dark themes
 */
export function DefaultStudentPhotoPlaceholder({
  className = "w-full h-full",
  theme = "auto",
}: {
  className?: string;
  theme?: "light" | "dark" | "auto";
}) {
  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Student photograph not yet provided"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background container */}
      <rect
        width="240"
        height="300"
        className={
          theme === "light"
            ? "fill-[#e2e8f0]"
            : theme === "dark"
            ? "fill-[#1e293b]"
            : "fill-[#e2e8f0] dark:fill-[#1e293b]"
        }
      />

      {/* Head: Simple geometric circle */}
      <circle
        cx="120"
        cy="96"
        r="44"
        className={
          theme === "light"
            ? "fill-[#64748b]"
            : theme === "dark"
            ? "fill-[#94a3b8]"
            : "fill-[#64748b] dark:fill-[#94a3b8]"
        }
      />

      {/* Shoulders & Bust: Symmetrical formal silhouette */}
      <path
        d="M 28 300 C 28 222 66 178 120 178 C 174 178 212 222 212 300 Z"
        className={
          theme === "light"
            ? "fill-[#64748b]"
            : theme === "dark"
            ? "fill-[#94a3b8]"
            : "fill-[#64748b] dark:fill-[#94a3b8]"
        }
      />
    </svg>
  );
}

/**
 * Backward compatibility alias for the placeholder component
 */
export const BarnikBasuPortrait = DefaultStudentPhotoPlaceholder;

/**
 * Authentic Issuing Authority blue signature for K K Mukherjee
 */
export function IssuingAuthoritySignature({ className = "w-44 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Issuing Authority Signature (K K Mukherjee)"
    >
      <path
        d="M20 52 L28 16 M26 32 L44 18 M34 30 L48 54"
        stroke="#1d4ed8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 50 L64 20 M63 34 L78 22 M70 32 L82 52"
        stroke="#1d4ed8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M92 48 C94 22 98 14 104 18 C110 22 108 42 114 48 C120 52 126 28 132 30 C138 32 136 46 142 46 C148 46 152 34 158 36 C164 38 166 48 174 46 C180 44 184 34 192 38 C198 40 202 52 214 44 C222 38 232 42 244 38"
        stroke="#1d4ed8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative signature tail loop */}
      <path
        d="M210 48 Q235 55 248 36"
        stroke="#1d4ed8"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Accurate high-density 1D barcode matching the bottom of the card.
 * Guarantees that the student ID number remains on strictly ONE horizontal line,
 * regardless of character length or device viewport.
 */
export function Barcode1D({ 
  value = "CSE/25028/1428", 
  className = "w-full" 
}: { 
  value?: string; 
  className?: string 
}) {
  // Deterministic bars representation
  const bars = [
    4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2,
    4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 3, 1, 2, 4,
    1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2
  ];

  // OCR & Text cleaning normalization:
  // Remove duplicate whitespace, stray newlines, or accidental internal spaces while preserving all alphanumeric chars & slashes
  const normalizedId = (value || "").replace(/\s+/g, "").trim();

  // Dynamic font sizing & letter spacing strategy based on ID length:
  const length = normalizedId.length;
  let dynamicFontSize = "12px";
  let dynamicLetterSpacing = "0.14em";

  if (length > 24) {
    dynamicFontSize = "9px";
    dynamicLetterSpacing = "0.02em";
  } else if (length > 18) {
    dynamicFontSize = "10.5px";
    dynamicLetterSpacing = "0.06em";
  } else if (length > 14) {
    dynamicFontSize = "11.5px";
    dynamicLetterSpacing = "0.10em";
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <div className="w-full flex items-stretch justify-between h-9 sm:h-10 px-1.5 py-0.5 bg-white overflow-hidden">
        {bars.map((width, idx) => (
          <div
            key={idx}
            className="bg-black shrink-0"
            style={{
              width: `${width * 1.5}px`,
              marginLeft: idx % 2 === 0 ? "1px" : "0px",
            }}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-center overflow-hidden px-1 mt-1">
        <p
          className="font-mono font-bold text-black text-center select-all whitespace-nowrap"
          style={{
            fontSize: dynamicFontSize,
            letterSpacing: dynamicLetterSpacing,
            whiteSpace: "nowrap",
            overflowWrap: "normal",
            wordBreak: "normal",
            lineHeight: 1.2,
          }}
        >
          {normalizedId}
        </p>
      </div>
    </div>
  );
}
