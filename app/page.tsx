'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  CheckIcon,
  StarIcon,
  WhatsAppIcon,
  LocationPinIcon,
  ArrowTopRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CalendarIcon,
} from '@/components/icons';
import { useState, useEffect, useCallback } from 'react';
import { fetchPortfolioFolders, type PortfolioFolder } from '@/lib/database';

// ==========================================
// DATA MODELS
// ==========================================
const PACKAGES = {
  basic: {
    name: 'Basic Package',
    price: 450,
    duration: '3 hours',
    deliverables: 'Aqiqah Photography Package',
    label: 'Basic',
    features: [
      'All pictures edited',
      '100+ pictures',
      '3 hour coverage',
      'Online gallery for sharing',
      'Mini portrait session outdoor',
      '1 x photographer',
    ],
    highlighted: [] as string[],
    isFeatured: false,
    buttonVariant: 'outline' as const,
  },
  standard: {
    name: 'Standard Package',
    price: 700,
    duration: '3 hours',
    deliverables: 'Aqiqah Photography + Album Package',
    label: 'Standard',
    features: [
      'All pictures edited',
      '100+ pictures',
      '3 hour coverage',
      'Online gallery for sharing',
      'Mini portrait session outdoor',
      '1 x photographer',
    ],
    highlighted: ['10x12 in 20 pages photobook album'],
    isFeatured: true,
    buttonVariant: 'primary' as const,
  },
  premium: {
    name: 'Premium Package',
    price: 1550,
    duration: '3 hours',
    deliverables: 'Aqiqah Photo + Album + Video Package',
    label: 'Premium',
    features: [
      'All pictures edited',
      '100+ pictures',
      '3 hour coverage',
      'Online gallery for sharing',
      'Mini portrait session outdoor',
      '1 x photographer',
      '10x12 in 20 pages photobook album',
    ],
    highlighted: ['1080p HD video (2-3 min)', '1 x videographer'],
    isFeatured: false,
    buttonVariant: 'outline' as const,
  },
};

type PackageKey = keyof typeof PACKAGES;

const ADDONS = {
  'extra-hour': { name: 'Extra Hour', price: 150, description: 'Extend your coverage' },
  'express-editing': { name: 'Express Editing (24hr)', price: 250, description: '24-hour turnaround' },
  'extra-photobook': { name: 'Extra Photobook', price: 250, description: '10x12 in 20 pages' },
  'crystal-album': { name: 'Crystal Album', price: 450, description: 'Premium finish' },
};

type AddonKey = keyof typeof ADDONS;

// Portfolio folder structure - folder-based organization
interface PortfolioFolder {
  name: string;
  displayName: string;
  thumbnail: string;
  images: string[];
}

const generatePageImages = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) =>
    `page_${String(i + 1).padStart(2, '0')}.jpg`
  );
};

const generateFirzanaImages = (): string[] => {
  return [
    '1FK_8748_2.jpg',
    '1FK_8764_2.jpg',
    '1FK_8768_2.jpg',
    '1FK_8811_2.jpg',
    '1FK_8830_2.jpg',
    '1FK_8860_2.jpg',
    '1FK_8884_2.jpg',
    '1FK_8953_2.jpg',
    '1FK_8957_2.jpg',
    '1FK_8977_2.jpg',
    '1FK_8982_2.jpg',
    '1FK_9001_2.jpg',
    '1FK_9016_2.jpg',
    '1FK_9039_2.jpg',
    '1FK_9057_2.jpg',
    '1FK_9060_2.jpg',
    '1FK_9165_2.jpg',
    '1FK_9174_2.jpg',
    '1FK_9178_2.jpg',
    '1FK_9195_2.jpg',
    '1FK_9204_2.jpg',
    '1FK_9207_2.jpg',
    '1FK_9211_2.jpg',
    '1FK_9220_2.jpg',
    '1FK_9241_2.jpg',
    '1FK_9252_2.jpg',
    '1FK_9255_2.jpg',
  ];
};

const PORTFOLIO_FOLDERS: PortfolioFolder[] = [
  {
    name: 'Aqiqah Emma Yasmin | 8 Feb 2026',
    displayName: 'Emma Yasmin | 8 Feb 2026',
    thumbnail: '/portfolio/Aqiqah Emma Yasmin | 8 Feb 2026/page_01.jpg',
    images: generatePageImages(20).map(img =>
      `/portfolio/Aqiqah Emma Yasmin | 8 Feb 2026/${img}`
    ),
  },
  {
    name: 'Aqiqah  Zarif Aidan 14 Feb 2026',
    displayName: 'Zarif Aidan | 14 Feb 2026',
    thumbnail: '/portfolio/Aqiqah  Zarif Aidan 14 Feb 2026/page_01.jpg',
    images: generatePageImages(20).map(img =>
      `/portfolio/Aqiqah  Zarif Aidan 14 Feb 2026/${img}`
    ),
  },
  {
    name: 'Aqiqah Firzana | 14 Feb 2022',
    displayName: 'Firzana | 14 Feb 2022',
    thumbnail: '/portfolio/Aqiqah Firzana | 14 Feb 2022/1FK_8748_2.jpg',
    images: generateFirzanaImages().map(img =>
      `/portfolio/Aqiqah Firzana | 14 Feb 2022/${img}`
    ),
  },
  {
    name: 'Aqiqah  Amir 9 Feb 2026',
    displayName: 'Amir | 9 Feb 2026',
    thumbnail: '/portfolio/Aqiqah  Amir 9 Feb 2026/page_01.jpg',
    images: generatePageImages(20).map(img =>
      `/portfolio/Aqiqah  Amir 9 Feb 2026/${img}`
    ),
  },
];

const testimonials = [
  {
    name: 'Siti Nurhaliza',
    location: 'Shah Alam',
    text: 'Terima kasih Fadhlan! Gambar Aqiqah anak saya cantik sangat. Professional dan friendly. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Ahmad Faizal',
    location: 'Petaling Jaya',
    text: 'Kualiti gambar memang terbaik. Editor pun detail. Album yang dapat sangat cantik. Worth every penny!',
    rating: 5,
  },
  {
    name: 'Nurul Aina',
    location: 'Kuala Lumpur',
    text: 'From booking until delivery, everything smooth. Photographer datang on time dan sangat professional dengan baby. Love hasil kerja!',
    rating: 5,
  },
];

// ==========================================
// PACKAGE CARD COMPONENT
// ==========================================
function PackageCard({
  packageKey,
  pkg,
  onBook,
  revealDelay,
}: {
  packageKey: PackageKey;
  pkg: (typeof PACKAGES)[PackageKey];
  onBook: (key: PackageKey) => void;
  revealDelay: number;
}) {
  return (
    <div
      className={`package-card ${pkg.isFeatured ? 'featured' : ''} reveal ${revealDelay > 0 ? `reveal-delay-${revealDelay}` : ''}`}
    >
      {pkg.isFeatured && <div className="badge absolute top-4 right-4">Popular</div>}

      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold mb-2 text-fg">{pkg.label}</h3>
        <p className="text-muted text-sm">{pkg.deliverables}</p>
      </div>

      <div className="mb-6">
        <span className="price-tag text-5xl text-accent">RM{pkg.price}</span>
        <span className="text-muted text-sm ml-2">/ {pkg.duration}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="text-accent shrink-0 mt-0.5" />
            <span className="text-muted text-sm">{feature}</span>
          </li>
        ))}
        {pkg.highlighted.length > 0 && (
          <>
            {pkg.highlighted.map((feature, index) => (
              <li
                key={`highlighted-${index}`}
                className={`flex items-start gap-3 ${index === 0 ? 'pt-3 border-t border-border' : ''}`}
              >
                <CheckIcon className="text-accent shrink-0 mt-0.5" />
                <span className="text-fg text-sm font-medium">{feature}</span>
              </li>
            ))}
          </>
        )}
      </ul>

      <button
        onClick={() => onBook(packageKey)}
        className={`${pkg.buttonVariant === 'primary' ? 'btn-primary' : 'btn-outline'} w-full`}
      >
        Book {pkg.label}
      </button>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Home() {
  const [selectedAddons, setSelectedAddons] = useState<AddonKey[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<PortfolioFolder | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [portfolioFolders, setPortfolioFolders] = useState<PortfolioFolder[]>([]);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);

  // ==========================================
  // PORTFOLIO LOADING
  // ==========================================
  useEffect(() => {
    async function loadPortfolios() {
      try {
        setIsPortfolioLoading(true);
        setPortfolioError(null);
        const folders = await fetchPortfolioFolders();
        setPortfolioFolders(folders);
      } catch (err) {
        console.error('Failed to load portfolios:', err);
        setPortfolioError('Failed to load portfolio images. Please try again later.');
      } finally {
        setIsPortfolioLoading(false);
      }
    }

    loadPortfolios();
  }, []);

  // ==========================================
  // WHATSAPP FUNCTIONS
  // ==========================================
  const WHATSAPP_NUMBER = '60127704714';

  const generateWhatsAppURL = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  }, []);

  const openWhatsApp = () => {
    const message = `Assalamualaikum, saya nak tanya pakej Aqiqah photography.

Saya berminat untuk mengetahui lebih lanjut tentang perkhidmatan photography anda.

Terima kasih!`;

    window.open(generateWhatsAppURL(message), '_blank');
    showToast('Opening WhatsApp...');
  };

  const bookPackage = (packageKey: PackageKey) => {
    const pkg = PACKAGES[packageKey];
    if (!pkg) return;

    const addonsList = selectedAddons.map((key) => {
      const addon = ADDONS[key];
      return `  - ${addon.name} (RM${addon.price})`;
    });

    const addonsTotal = selectedAddons.reduce((sum, key) => sum + ADDONS[key].price, 0);
    const total = pkg.price + addonsTotal;

    let message = `Assalamualaikum, saya ingin booking pakej Aqiqah photography:

PAKEJ: ${pkg.name}
HARGA: RM${pkg.price}
DURASI: ${pkg.duration}

TERTASUK:
${pkg.features.map((f) => `  - ${f}`).join('\n')}`;

    if (selectedAddons.length > 0) {
      message += `\n
ADD-ONS:
${addonsList.join('\n')}`;
    }

    message += `\n
TOTAL: RM${total}

Sila hubungi saya untuk pengesahan. Terima kasih!`;

    window.open(generateWhatsAppURL(message), '_blank');
    showToast(`Opening WhatsApp for ${pkg.name}...`);
  };

  const toggleAddon = (addonKey: AddonKey) => {
    setSelectedAddons((prev) => {
      const isCurrentlySelected = prev.includes(addonKey);
      const newAddons = isCurrentlySelected
        ? prev.filter((a) => a !== addonKey)
        : [...prev, addonKey];

      const addon = ADDONS[addonKey];
      showToast(`${addon.name} ${isCurrentlySelected ? 'removed' : 'added'}`);

      return newAddons;
    });
  };

  // ==========================================
  // GALLERY FUNCTIONS
  // ==========================================
  const openGallery = (folder: PortfolioFolder) => {
    setSelectedFolder(folder);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
  };

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    setSelectedFolder(null);
  }, []);

  const navigateImage = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedFolder) return;
      const length = selectedFolder.images.length;
      setCurrentImageIndex((prev) =>
        direction === 'next'
          ? (prev + 1) % length
          : (prev - 1 + length) % length
      );
    },
    [selectedFolder]
  );

  // ==========================================
  // BODY OVERFLOW MANAGEMENT
  // ==========================================
  useEffect(() => {
    const updateBodyOverflow = () => {
      if (galleryOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    };

    updateBodyOverflow();

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [galleryOpen]);

  // ==========================================
  // SCROLL REVEAL
  // ==========================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (galleryOpen && selectedFolder) {
        switch (e.key) {
          case 'Escape':
            closeGallery();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            navigateImage('prev');
            break;
          case 'ArrowRight':
            e.preventDefault();
            navigateImage('next');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, selectedFolder, closeGallery, navigateImage]);

  return (
    <main className="min-h-screen bg-bg">
      {/* Background texture */}
      <div className="bg-texture"></div>

      {/* Gradient orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative z-10">
              <div className="hero-title">
                <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
                  Aqiqah Photography Specialist
                </span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-none mb-6 text-fg">
                  Capturing<br />
                  <span className="italic text-accent">Precious</span>
                  <br />
                  Moments
                </h1>
              </div>

              <p className="hero-subtitle text-muted text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                Professional Aqiqah photography services in Kuala Lumpur. We capture the joy and
                blessings of your little one's special day with artistry and care.
              </p>

              <div className="hero-cta flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary"
                >
                  View Packages
                </button>
                <button onClick={openWhatsApp} className="btn-outline">
                  Ask Us Anything
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-12 mt-16">
                <div className="reveal">
                  <span className="font-display text-4xl font-semibold text-accent">
                    500+
                  </span>
                  <p className="text-muted text-sm mt-1">Families Served</p>
                </div>
                <div className="reveal reveal-delay-1">
                  <span className="font-display text-4xl font-semibold text-accent">
                    5+
                  </span>
                  <p className="text-muted text-sm mt-1">Years Experience</p>
                </div>
                <div className="reveal reveal-delay-2">
                  <span className="font-display text-4xl font-semibold text-accent">
                    100%
                  </span>
                  <p className="text-muted text-sm mt-1">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative reveal">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                <Image
                  src="/hero/hero image.jpg"
                  alt="Baby photography"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0a] via-transparent to-transparent"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <StarIcon size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-fg">Trusted by Families</p>
                    <p className="text-xs text-muted">Across Klang Valley</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Our Work
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4 mb-6 text-fg">
              Portfolio
            </h2>
            <div className="decorative-line mx-auto"></div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="gallery">
            {isPortfolioLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="text-accent text-6xl mb-4">
                  <svg className="animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12v8a2 2 2 2 6"></path>
                  </svg>
                </div>
                <p className="text-fg text-lg">Loading portfolio...</p>
              </div>
            ) : portfolioError ? (
              <div className="col-span-full text-center py-20">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <p className="text-fg text-lg mb-2">{portfolioError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              portfolioFolders.map((folder, index) => (
                <div
                  key={folder.id}
                  className={`gallery-thumbnail reveal reveal-delay-${index % 4}`}
                onClick={() => openGallery(folder)}
              >
                <Image
                  src={folder.thumbnail}
                  alt={folder.displayName}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="thumbnail-label">
                  <span className="text-fg text-sm font-medium">{folder.displayName}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <a
              href="https://photos.app.goo.gl/FiUxyWRp96FktyNz5"
              target="_blank"
              rel="noopener"
              className="btn-outline inline-flex items-center gap-2"
            >
              <span>View Full Portfolio</span>
              <ArrowTopRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1814]/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 reveal">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Investment
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4 mb-6 text-fg">
              Our Packages
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Choose the perfect package for your little one's Aqiqah celebration. All packages include
              professional editing and online gallery.
            </p>
            <div className="decorative-line mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {(Object.entries(PACKAGES) as [PackageKey, (typeof PACKAGES)[PackageKey]][]).map(
              ([key, pkg], index) => (
                <PackageCard
                  key={key}
                  packageKey={key}
                  pkg={pkg}
                  onBook={bookPackage}
                  revealDelay={index}
                />
              )
            )}
          </div>

          {/* Add-ons Section */}
          <div className="mt-20 reveal" id="add-ons">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-center mb-10 text-fg">
              Add-Ons
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="addons">
              {(Object.entries(ADDONS) as [AddonKey, (typeof ADDONS)[AddonKey]][]).map(
                ([key, addon]) => (
                  <div
                    key={key}
                    className={`addon-card ${selectedAddons.includes(key) ? 'selected' : ''}`}
                    onClick={() => toggleAddon(key)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-accent font-display text-2xl font-semibold">
                          RM{addon.price}
                        </p>
                        <p className="text-fg text-sm mt-1">{addon.name}</p>
                        <p className="text-muted text-xs mt-1">{addon.description}</p>
                      </div>
                      <div className="custom-checkbox">
                        <CheckIcon
                          size={12}
                          strokeWidth={3}
                          className="text-bg"
                          style={{ opacity: selectedAddons.includes(key) ? 1 : 0 }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <p className="text-center text-muted text-sm mt-6">
              Click to select add-ons. Your selections will be included in your booking message.
            </p>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section id="service-area" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="reveal">
              <span className="text-accent text-sm font-medium tracking-widest uppercase">
                Coverage
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6 text-fg">
                Service Area
              </h2>
              <div className="decorative-line mb-8"></div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <LocationPinIcon className="text-accent" />
                    </div>
                    <div>
                      <p className="text-fg font-medium">Lembah Klang</p>
                      <p className="text-accent font-semibold">FREE Transport</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                      <LocationPinIcon className="text-muted" />
                    </div>
                    <div>
                      <p className="text-fg font-medium">Outside Lembah Klang</p>
                      <p className="text-muted">+RM100 (according to distance)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-1">
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0a] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-2xl text-fg">Based in Kuala Lumpur</p>
                  <p className="text-muted text-sm">Serving families across Malaysia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1814]/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 reveal">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4 mb-6 text-fg">
              What Families Say
            </h2>
            <div className="decorative-line mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`testimonial-card reveal reveal-delay-${index}`}>
                <p className="text-fg text-sm leading-relaxed mb-6 relative z-10">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-fg text-sm font-medium">{testimonial.name}</p>
                    <p className="text-muted text-xs">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: testimonial.rating }, (_, starIdx) => (
                    <StarIcon key={starIdx} className="text-accent" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="reveal">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Ready to Book?
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4 mb-6 text-fg">
              Let's Capture Your Precious Moments
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
              Contact us today to book your Aqiqah photography session. We're here to help you preserve
              these beautiful memories.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={openWhatsApp} className="btn-primary inline-flex items-center gap-2">
                <WhatsAppIcon size={20} />
                <span>WhatsApp Us</span>
              </button>
              <a
                href="https://ainanstudio.setmore.com"
                target="_blank"
                rel="noopener"
                className="btn-outline inline-flex items-center gap-2"
              >
                <CalendarIcon />
                <span>Schedule Online</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="text-white" />
      </button>

      {/* Gallery Modal */}
      {galleryOpen && selectedFolder && (
        <div className="gallery-modal active">
          <div className="gallery-content">
            <div className="gallery-image-wrapper">
              <button
                className="gallery-nav-button gallery-nav-prev"
                onClick={() => navigateImage('prev')}
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="text-accent" />
              </button>
              <button
                className="gallery-nav-button gallery-nav-next"
                onClick={() => navigateImage('next')}
                aria-label="Next image"
              >
                <ChevronRightIcon className="text-accent" />
              </button>
              <Image
                key={selectedFolder.images[currentImageIndex]}
                src={selectedFolder.images[currentImageIndex]}
                alt={`${selectedFolder.displayName} - Image ${currentImageIndex + 1}`}
                fill
                className="gallery-image"
                unoptimized
                loading="eager"
              />
            </div>
            <div className="gallery-info">
              <span className="gallery-counter">
                {currentImageIndex + 1}/{selectedFolder.images.length}
              </span>
              <span className="gallery-folder-name">{selectedFolder.displayName}</span>
            </div>
          </div>
          <button
            className="gallery-close"
            onClick={closeGallery}
            aria-label="Close gallery"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast active">
          <p className="text-fg text-sm">{toastMessage}</p>
        </div>
      )}
    </main>
  );
}