import { Camera, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-6 w-6 text-primary-400" />
              <span className="font-bold text-lg">Fadhlan Khalid Photography</span>
            </div>
            <p className="text-gray-400">
              Professional Aqiqah photography services in Kuala Lumpur, Malaysia.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>contact@fadhlan.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2 text-gray-400">
              <a href="#packages" className="block hover:text-primary-400 transition">Packages</a>
              <a href="#add-ons" className="block hover:text-primary-400 transition">Add-ons</a>
              <a href="#portfolio" className="block hover:text-primary-400 transition">Portfolio</a>
              <a href="#service-area" className="block hover:text-primary-400 transition">Service Area</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fadhlan Khalid Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
