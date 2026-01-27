import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import "./globals.css";

export const metadata = {
    title: "Auth0 Next.js App",
    description: "Next.js app with Auth0 authentication",
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" className="light scroll-smooth scroll-pt-16">
            <body>
                <Auth0Provider>
                    {children}
                </Auth0Provider>
            </body>
        </html>
    );
}
