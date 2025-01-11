export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Sociolytics. All rights reserved.
          </p>
          <p className="mt-2">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a> |
            <a href="/terms" className="hover:text-white"> Terms of Service</a>
          </p>
        </div>
      </footer>
    );
  }
  