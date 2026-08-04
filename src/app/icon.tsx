import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #05070d, #0d1120)",
          border: "2px solid #4fd8e8",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            fontFamily: "monospace",
            background: "linear-gradient(115deg, #4fd8e8, #9f7bea)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          PA
        </div>
      </div>
    ),
    { ...size }
  );
}
