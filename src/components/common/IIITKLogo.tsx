import React from "react";
import { cn } from "../../lib/utils";

interface IIITKCrestProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
  primaryColor?: string;
  transparentBg?: boolean;
}

export function IIITKCrest({ className, size = 48, monochrome = false, primaryColor: customPrimaryColor, transparentBg = false }: IIITKCrestProps) {
  const primaryColor = customPrimaryColor || (monochrome ? "currentColor" : "#1A4FD8");
  const darkStroke = monochrome ? "currentColor" : "#000000";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      aria-label="IIIT Kalyani Crest"
    >
      {/* Outer Shield Double Border */}
      <path
        d="M20 25 L100 10 L180 25 L180 145 C180 185 140 220 100 232 C60 220 20 185 20 145 Z"
        fill={transparentBg ? "none" : "white"}
        className={transparentBg ? "" : "dark:fill-[#000000]"}
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M28 32 L100 19 L172 32 L172 143 C172 178 136 211 100 221 C64 211 28 178 28 143 Z"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Top Sanskrit Motto Arc: विद्याधनं सर्वधनप्रधानम् */}
      <path
        id="mottoArc"
        d="M 45 78 A 62 48 0 0 1 155 78"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
      />
      <text
        fill={primaryColor}
        fontSize="10"
        fontWeight="800"
        fontFamily="'Noto Sans Devanagari', 'Noto Sans', sans-serif"
        letterSpacing="0.08em"
      >
        <textPath href="#mottoArc" startOffset="50%" textAnchor="middle">
          विद्याधनं सर्वधनप्रधानम्
        </textPath>
      </text>

      {/* Central Radiating / Transmission Arc Structure (Bridge Pylon & Satellite) */}
      <g stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Central Bridge Cables / Tower */}
        <path d="M100 80 L100 160" strokeWidth="3" />
        <path d="M100 80 L88 160" />
        <path d="M100 80 L112 160" />
        <path d="M78 160 L100 105 L122 160" />
        
        {/* Parabolic Satellite Dish Antenna on top of tower */}
        <path d="M85 75 Q100 62 115 75" fill="none" strokeWidth="2.5" />
        <path d="M100 67 L114 55" strokeWidth="2" />
        <circle cx="114" cy="55" r="2.5" fill={primaryColor} />
        
        {/* Broadcast Waves */}
        <path d="M118 50 Q124 54 118 62" fill="none" strokeWidth="1.5" />
        <path d="M122 46 Q130 54 122 66" fill="none" strokeWidth="1.5" />
      </g>

      {/* Left Symbol: Conch Shell (Shankha) - Symbol of Auspicious Knowledge */}
      <g stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M55 105 C42 115 44 135 56 148 C68 142 70 120 62 108 C58 103 57 104 55 105 Z" fill={primaryColor} fillOpacity="0.12" />
        <path d="M56 108 C53 118 57 132 66 140" strokeWidth="1.8" />
        <path d="M50 118 C52 126 58 136 62 144" strokeWidth="1.5" />
        <circle cx="56" cy="106" r="2.5" fill={primaryColor} />
      </g>

      {/* Right Symbol: Flying Dove of Enlightenment & Peace */}
      <g stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M142 105 C146 98 156 102 160 108 C152 112 148 120 152 128 C144 128 136 122 134 116 C136 112 140 108 142 105 Z" fill={primaryColor} fillOpacity="0.12" />
        {/* Wings */}
        <path d="M142 105 C145 92 158 90 162 96 C155 102 150 108 146 112" strokeWidth="2" />
        <path d="M148 100 C154 94 165 94 167 100" strokeWidth="1.5" />
        {/* Tail feathers */}
        <path d="M134 118 L126 124 M132 120 L126 128" strokeWidth="1.8" />
      </g>

      {/* Ribbon Banner: INDIAN INSTITUTE OF INFORMATION TECHNOLOGY */}
      <g>
        {/* Ribbon Fold Ends */}
        <path d="M18 162 L28 152 L28 174 L18 184 Z" fill={primaryColor} fillOpacity={transparentBg ? "0.3" : "0.8"} />
        <path d="M182 162 L172 152 L172 174 L182 184 Z" fill={primaryColor} fillOpacity={transparentBg ? "0.3" : "0.8"} />

        {/* Main Ribbon Arch */}
        <path
          d="M24 160 Q100 178 176 160 L176 182 Q100 200 24 182 Z"
          fill={transparentBg ? "none" : "white"}
          className={transparentBg ? "" : "dark:fill-slate-900"}
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        <path
          id="ribbonArc"
          d="M 28 174 Q 100 193 172 174"
          fill="none"
        />
        <text
          fill={primaryColor}
          fontSize="6.2"
          fontWeight="900"
          fontFamily="'Noto Sans', sans-serif"
          letterSpacing="0.05em"
        >
          <textPath href="#ribbonArc" startOffset="50%" textAnchor="middle">
            INDIAN INSTITUTE OF INFORMATION TECHNOLOGY
          </textPath>
        </text>
      </g>

      {/* Bottom Scroll Box: KALYANI */}
      <g>
        <rect
          x="68"
          y="190"
          width="64"
          height="18"
          rx="3"
          fill={transparentBg ? "none" : "white"}
          className={transparentBg ? "" : "dark:fill-slate-900"}
          stroke={primaryColor}
          strokeWidth="2.5"
        />
        <text
          x="100"
          y="203"
          fill={primaryColor}
          fontSize="9"
          fontWeight="900"
          fontFamily="'Noto Sans', sans-serif"
          letterSpacing="0.16em"
          textAnchor="middle"
        >
          KALYANI
        </text>
      </g>
    </svg>
  );
}

interface IIITKBannerProps {
  className?: string;
  crestSize?: number;
  orientation?: "horizontal" | "vertical" | "compact";
  showTagline?: boolean;
}

export function IIITKBanner({
  className,
  crestSize = 58,
  orientation = "horizontal",
  showTagline = true,
}: IIITKBannerProps) {
  if (orientation === "compact") {
    return (
      <div className={cn("flex items-center gap-3.5 select-none", className)}>
        <IIITKCrest size={crestSize} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">
              IIIT Kalyani
            </span>
            <span className="px-2 py-0.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-teal text-[10px] font-black rounded-md tracking-wider uppercase">
              Sarthi OS
            </span>
          </div>
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 font-sans tracking-wide mt-1">
            भारतीय सूचना प्रौद्योगिकी संस्थान, कल्याणी
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 select-none",
        orientation === "vertical" ? "flex-col text-center" : "flex-row",
        className
      )}
    >
      <div className="relative group shrink-0">
        <IIITKCrest size={crestSize} />
        <div className="absolute inset-0 bg-brand-primary/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>

      <div className={cn("space-y-0.5", orientation === "vertical" && "text-center")}>
        <h2 className="text-sm sm:text-base font-bold font-serif text-slate-900 dark:text-white leading-tight tracking-tight">
          Indian Institute of Information Technology, Kalyani
        </h2>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans leading-tight">
          भारतीय सूचना प्रौद्योगिकी संस्थान, कल्याणी
        </p>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 font-sans leading-tight">
          ভারতীয় তথ্যপ্রযুক্তি প্রতিষ্ঠান, কল্যাণী
        </p>
        {showTagline && (
          <div className="pt-1 flex items-center gap-2">
            <span className="text-[11px] font-serif italic text-amber-700 dark:text-amber-400 font-medium tracking-tight">
              An Institute of National Importance
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">•</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Govt. of India</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default IIITKCrest;
