export default function FooterNavigation() {
  const navigation = {
    features: [
      { name: 'Location Search', href: '#' },
      { name: 'Data Resources', href: '#' },
      { name: 'Interactive Map', href: '#' },
      { name: 'Water Quality', href: '#' },
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Status', href: '#' },
      { name: 'Contact', href: 'water@usace.army.mil' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Jobs', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' },
    ],
    legal: [
      {
        name: 'Link Disclaimer',
        href: 'https://www.usace.army.mil/LinkDisclaimer.aspx',
      },
      {
        name: 'Privacy Policy',
        href: 'https://www.usace.army.mil/PrivacyandSecurity.aspx',
      },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <div className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2">
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div>
          <h3 className="text-base font-medium text-white">Site Features</h3>
          <ul className="mt-4 space-y-4">
            {navigation.features.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 md:mt-0">
          <h3 className="text-base font-medium text-white">Support</h3>
          <ul className="mt-4 space-y-4">
            {navigation.support.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {/* <div>
          <h3 className="text-base font-medium text-white">Company</h3>
          <ul className="mt-4 space-y-4">
            {navigation.company.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="mt-12 md:mt-0">
          <h3 className="text-base font-medium text-white">Legal</h3>
          <ul className="mt-4 space-y-4">
            {navigation.legal.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
