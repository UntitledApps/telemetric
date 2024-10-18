import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Telemetric",
        short_name: "Telemetric",
        description:
            "Elegant, privacy-focused user analytics for your websites, apps & webapps.",
        start_url: "/",
        display: "standalone",
        background_color: "var(--on-dominant)",
        theme_color: "var(--on-dominant)",
        icons: [
            {
                src: "/images/logo.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/images/logo.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
