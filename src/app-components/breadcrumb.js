import { useConnect } from 'redux-bundler-hook';
// import { MdHome } from 'react-icons/md';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

// https://www.designcise.com/web/tutorial/how-to-remove-a-trailing-slash-from-a-string-in-javascript
const pathParts = (path) => {
  if (!path) {
    return [];
  }
  let _p = path;
  // strip trailing slash
  if (_p.endsWith('/')) {
    _p = _p.slice(0, -1);
  }
  return _p.split('/');
};

// const partNames = {
//   '': MdHome,
//   mytestproject: 'my-test-project',
// };

export default function Breadcrumb() {
  const { pathname } = useConnect('selectPathname');

  var parts = pathParts(pathname);
  // remove the first element as it is empty
  parts = pathParts(pathname).slice(1, parts.length);

  const pages = parts.map((page, idx) => {
    return {
      name: page,
      href: '/' + parts.slice(0, idx + 1).join('/'),
      current: idx === parts.length - 1 ? true : false,
    };
  });

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={page.href}
                className="ml-2 text-sm font-medium text-gray-400 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
