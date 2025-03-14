import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3986d7] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="footer-title mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="/" className="link link-hover">
                  Home
                </a>
              </li>
              <li>
                <a href="/available-camps" className="link link-hover">
                  Available Camps
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="footer-title mb-4">Contact Information</h3>
            <ul>
              <li>
                Email:{" "}
                <a
                  href="mailto:babladey275@gmail.com"
                  className="link link-hover"
                >
                  babladey275@gmail.com
                </a>
              </li>
              <li>Phone: +8801776245052</li>
              <li>Address: Chattogram, Bangladesh</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="footer-title mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/babla.dey.50/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://github.com/babladey275"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/babla-dey/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Medical Camp. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
