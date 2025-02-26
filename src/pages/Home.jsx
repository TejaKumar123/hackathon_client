// Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stats = [
        { number: "10,000+", label: "Students" },
        { number: "500+", label: "Faculty" },
        { number: "100+", label: "Clubs" },
        { number: "5,000+", label: "Alumni" }
    ];

    const features = [
        {
            title: "Academic Discussions",
            description: "Engage in meaningful academic discussions with peers and faculty members",
            icon: "🎓"
        },
        {
            title: "Club Activities",
            description: "Join and participate in various university clubs and organizations",
            icon: "👥"
        },
        {
            title: "Event Management",
            description: "Stay updated with university events and manage registrations",
            icon: "📅"
        },
        {
            title: "Resource Sharing",
            description: "Access and share academic resources and study materials",
            icon: "📚"
        }
    ];

    const recentActivities = [
        {
            title: "Technical Workshop",
            date: "15th March 2024",
            description: "Advanced Python Programming Workshop by CSE Department",
            image: "/images/features/feature1.jpeg"
        },
        {
            title: "Cultural Fest",
            date: "20th March 2024",
            description: "Annual Cultural Festival - Celebrations and Performances",
            image: "/images/features/feature2.jpeg"
        },
        {
            title: "Research Symposium",
            date: "25th March 2024",
            description: "International Research Symposium on Emerging Technologies",
            image: "/images/features/feature3.jpeg"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="RGUKT Logo"
                                className="h-12 w-auto"
                            />
                            <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-[black]' : 'text-[white]'}`}>
                                RGUKT RKV Connect
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4 text-[white]">
                            {/*  <NavLink href="/discussions">Discussions</NavLink>
                            <NavLink href="/clubs">Clubs</NavLink>
                            <NavLink href="/events">Events</NavLink>
                            <NavLink href="/resources">Resources</NavLink> */}
                            <button
                                onClick={() => navigate('/signup')}
                                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                <span className="sr-only">Open menu</span>
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* <MobileNavLink href="/discussions">Discussions</MobileNavLink>
                            <MobileNavLink href="/clubs">Clubs</MobileNavLink>
                            <MobileNavLink href="/events">Events</MobileNavLink>
                            <MobileNavLink href="/resources">Resources</MobileNavLink> */}
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative pt-16">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="/images/img1.png"
                        alt="Campus"
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Welcome to RGUKT RKV Connect
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Your comprehensive platform for academic discussions, club activities,
                        and university collaboration. Connect with peers, faculty, and alumni
                        to enhance your academic journey.
                    </p>
                    <div className="mt-10">
                        <button
                            onClick={() => navigate('/register')}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                                <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Platform Features
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Everything you need to enhance your academic experience
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
                        Recent Activities
                    </h2>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {activity.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {activity.date}
                                    </p>
                                    <p className="mt-2 text-gray-600">
                                        {activity.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white">
                            Ready to get started?
                        </h2>
                        <p className="mt-4 text-lg text-blue-100">
                            Join our platform today and enhance your university experience
                        </p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <img
                                src="/images/logo.png"
                                alt="RGUKT Logo"
                                className="h-12 w-auto mb-4"
                            />
                            <p className="text-gray-400">
                                RGUKT Connect - Empowering university collaboration and
                                academic excellence through digital innovation.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/about" className="text-gray-400 hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="text-gray-400 hover:text-white">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="/faq" className="text-gray-400 hover:text-white">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-4">Connect</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} RGUKT Connect. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Helper Components
const NavLink = ({ href, children }) => (
    <a
        href={href}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    >
        {children}
    </a>
);

const MobileNavLink = ({ href, children }) => (
    <a
        href={href}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    >
        {children}
    </a>
);

export default Home;