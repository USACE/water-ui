import { useConnect } from 'redux-bundler-hook';
import TermsOfServiceModal from '../../app-pages/terms-service-modal';

export default function FooterNavigation() {
  const { doModalOpen } = useConnect('doModalOpen');

  const handleTosClick = () => {
    // e.preventDefault();
    const userInitiatedTosModal = () => <TermsOfServiceModal show={true} />;
    doModalOpen(userInitiatedTosModal);
  };

  const navigation = {
    features: [
      { name: 'Location Search', href: '#' },
      { name: 'Data Resources', href: '#' },
      { name: 'Interactive Map', href: '/map' },
      // { name: 'Water Quality', href: '#' },
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      {
        name: 'API Docs',
        href: 'https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html',
      },
      { name: 'Contact', href: 'mailto:water@usace.army.mil' },
    ],
    related: [{ name: 'USACE HQ', href: 'https://www.usace.army.mil' }],
    legal: [
      {
        name: 'Disclaimer',
        href: '/help#disclaimer',
      },
      {
        name: 'Privacy Policy',
        href: 'https://www.usace.army.mil/PrivacyandSecurity.aspx',
      },
      { name: 'Terms of Service', href: '#', onClickHandler: handleTosClick },
    ],
  };

  return (
    <div className='mt-8 grid grid-cols-2 gap-8 xl:col-span-2'>
      {/* Grid column 1 */}
      <div className='md:grid md:grid-cols-2 md:gap-8'>
        {/* Link column container */}
        <div>
          <h3 className='text-base font-medium text-white'>Site Features</h3>
          <ul className='mt-4 space-y-4'>
            {navigation.features.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className='text-base text-gray-300 hover:text-white'
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-12 md:mt-0'>
          <h3 className='text-base font-medium text-white'>Support</h3>
          <ul className='mt-4 space-y-4'>
            {navigation.support.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className='text-base text-gray-300 hover:text-white'
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Grid column 2 */}
      <div className='md:grid md:grid-cols-2 md:gap-8'>
        {/* Link column container */}
        <div>
          <h3 className='text-base font-medium text-white'>Related</h3>
          <ul className='mt-4 space-y-4'>
            {navigation.related.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className='text-base text-gray-300 hover:text-white'
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-12 md:mt-0'>
          <div>
            <h3 className='text-base font-medium text-white'>Legal</h3>
            <ul className='mt-4 space-y-4'>
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    onClick={item.onClickHandler || undefined}
                    href={item.href}
                    className='text-base text-gray-300 hover:text-white'
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
