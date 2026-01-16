import React, { useMemo } from "react";

/**
 * CvPdfViewer (A4 Frame) — JS
 *
 * - A4 aspect ratio (210/297)
 * - Modern / professional frame using your purple theme
 * - Padding on all corners
 * - Tries to remove BOTH scrollbars (depends on browser PDF viewer)
 * - Title styled like your screenshot (white + red accent)
 */

export default function CvPdfViewer({
  src,
  className = "",
  titlePrimary = "Curriculum",
  titleAccent = "Vitae",
}) {
  const viewerUrl = useMemo(() => {
    // Many browsers render PDFs with a built-in viewer.
    // These hash params attempt to hide UI + fit the page to avoid scrollbars.
    return `${src}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=Fit&zoom=page-fit`;
  }, [src]);

  return (
    <div className={`mx-auto w-[min(92vw,820px)] ${className}`}>
      {/* Title */}
      <div className="pb-6 pt-2 text-center">
        <h2 className="select-none text-6xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-white [text-shadow:0_10px_30px_rgba(0,0,0,0.35)]">
            {titlePrimary}{" "}
          </span>
          <span className="text-[#ff2d2d] [text-shadow:0_10px_30px_rgba(0,0,0,0.35)]">
            {titleAccent}
          </span>
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#3c1c63] via-[#551785] to-[#ff2d2d] opacity-90" />
      </div>

      {/* A4 frame */}
      <div className="relative aspect-[210/250] overflow-hidden rounded-[30px]">
        {/* Outer gradient rim */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1b1936] via-[#2d194e] to-[#551785]"
          aria-hidden="true"
        />

        {/* Rim highlight */}
        <div
          className="absolute inset-[1px] rounded-[29px] bg-[#201a3d]/75"
          aria-hidden="true"
        />

        {/* Glass + glow */}
        <div
          className="absolute inset-[1px] rounded-[29px] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(133,35,175,0.45),transparent_60%)]"
          aria-hidden="true"
        />

        {/* Content padding */}
        <div className="absolute inset-[14px] overflow-hidden rounded-[22px] bg-[#1b1936]/35 ring-1 ring-white/10">
          {/* Subtle top sheen */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_24%)]"
            aria-hidden="true"
          />
          {/* Subtle vignette */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,transparent_60%,rgba(0,0,0,0.35))]"
            aria-hidden="true"
          />

          {/* Inner padding so the PDF never touches the frame */}
          <div className="relative h-full w-full p-[14px]">
            <div className="h-full w-full overflow-hidden rounded-[16px] bg-white">
              {/* PDF */}
              <iframe
                title="CV PDF"
                src={viewerUrl}
                scrolling="no"
                className="block h-full w-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
