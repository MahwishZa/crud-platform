import { FaDev, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 pb-10">
            <div className="container mx-auto px-6">

                {/* Main Grid Section */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Left Section */}
                    <div className="flex flex-col space-y-6">
                        <h2 className="text-xl text-white font-bold">DevLog</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            DevLog is a space where developers, engineers, and tech enthusiasts share technical insights, tutorials, and deep dives into real-world problems and solutions across the full stack.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: FaDev, link: "#" },
                                { Icon: FaGithub, link: "#" },
                                { Icon: FaLinkedin, link: "#" },
                                { Icon: FaTwitter, link: "#" },
                            ].map(({ Icon, link }, idx) => (
                                <a key={idx} href={link} className="text-gray-400 hover:text-white transition-transform transform hover:scale-110">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Middle Section */}
                    <div>
                        <h3 className="text-xl text-white font-semibold mb-4">Categories</h3>
                        <ul className="space-y-3">
                            {["JavaScript & Node.js", "Frontend & React", "DevOps & Deployment", "Career & Industry Tips", "Backend & APIs"].map((category, idx) => (
                                <li key={idx}>
                                    <p className="text-gray-400 text-sm hover:text-white hover:underline transition-colors">
                                        {category}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div>
                        <h3 className="text-xl text-white font-semibold mb-4">Subscribe to Our Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Stay updated with technical deep dives, industry trends, and coding tutorials directly in your inbox.
                        </p>
                        <form className="flex items-center space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold btn-primary"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 DevLog. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
