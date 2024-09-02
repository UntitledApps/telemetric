import { EmailForm } from "@/components/emailform";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen font-inter text-gray-900 bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo and Name */}
          <div className="text-lg font-bold flex items-center">
            <img src="/images/logo.png" alt="Logo" className="h-8 mr-2" />
            <span>Telemetric</span>
          </div>
          {/* Call to Action Button */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Analytics for modern entrepreneurs
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Telemetric is a privacy-focused analytics platform for your apps, web
          apps, and websites. Tired of all the mediocre analytics platforms out
          there? Telemetric is here to change that.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <EmailForm />
        </div>

        <p className="text-gray-500">Made for Apps, Webapps & Websites</p>

        <div className="flex justify-center space-x-6 mt-4">
          <img
            src="/images/frameworks/flutter.png"
            alt="Flutter"
            className="h-10"
          />
          <img
            src="/images/frameworks/nextjs.png"
            alt="Next.js"
            className="h-10"
          />
          <img
            src="/images/frameworks/react.png"
            alt="React"
            className="h-10"
          />
          <img
            src="/images/frameworks/angular.png"
            alt="Angular"
            className="h-10"
          />
          <img
            src="/images/frameworks/unity.png"
            alt="Unity"
            className="h-10"
          />
          <img
            src="/images/frameworks/framer.png"
            alt="Framer"
            className="h-10"
          />
          <img
            src="/images/frameworks/webflow.png"
            alt="Webflow"
            className="h-10"
          />
          <img
            src="/images/frameworks/wordpress.png"
            alt="WordPress"
            className="h-10"
          />
          <img src="/images/os/ios.png" alt="iOS" className="h-10" />
          <img src="/images/os/android.png" alt="Android" className="h-10" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto flex flex-col gap-6 py-16 max-w-3xl">
        <div className="p-8 bg-white shadow-sm border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-2xl mb-4">Privacy focused</h3>
          <p className="text-gray-600">
            Your users' data is anonymized and encrypted. No more worrying about
            GDPR or CCPA. Finally, get rid of your cookie banner.
          </p>
        </div>

        <div className="p-8 bg-white shadow-sm border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-2xl mb-4">
            Well thought-through UI & UX
          </h3>
          <p className="text-gray-600">
            Most analytics platforms are hard to use and overwhelming. I have
            spent a lot of time making sure that the UI is easy to use and
            understand—and looks good.
          </p>
        </div>

        <div className="p-8 bg-white shadow-sm border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-2xl mb-4">Liveview</h3>
          <p className="text-gray-600">
            See how your users interact with your product in real time.
          </p>
        </div>

        <div className="p-8 bg-white shadow-sm border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-2xl mb-4">No data lock-in</h3>
          <p className="text-gray-600">
            Your data is yours. You can export it at any time. You can also
            import data from other platforms.
          </p>
        </div>

        <div className="p-8 bg-white shadow-sm border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-2xl mb-4">Data Explorer</h3>
          <p className="text-gray-600">
            Let AI explain what's going on. Coming soon.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <Link href="https://untitledapps.vercel.app">Imprint & Privacy</Link>
        </div>
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; 2024 UNTITLEDAPPS e.U. | All rights reserved.
        </div>
      </footer>
    </div>
  );
}
