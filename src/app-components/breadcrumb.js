import { useConnect } from 'redux-bundler-hook';
import { MdHome } from 'react-icons/md';

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

const partNames = {
  '': MdHome,
  charts: 'charts',
};

export default function Breadcrumb() {
  const { pathname } = useConnect('selectPathname');

  const parts = pathParts(pathname);

  return (
    <nav aria-label="breadcrumb">
      {
        <ul>
          {parts.map((p, idx) => (
            <li>
              {/* Right-most item in breadcrumb represents current page and should not be clickable */}
              {idx === parts.length - 1 ? (
                p === '' ? (
                  <MdHome size={24} />
                ) : (
                  partNames[p] || p
                )
              ) : (
                // All items in breadcrumb are clickable, except for right-most item.
                // Build pathname for href by joining pathname parts with /
                <a href={p === '' ? '/' : parts.slice(0, idx + 1).join('/')}>
                  {p === '' ? <MdHome size={24} /> : partNames[p] || p}
                </a>
              )}
            </li>
          ))}
        </ul>
      }
    </nav>
  );
}
