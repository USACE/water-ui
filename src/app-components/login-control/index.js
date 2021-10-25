/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LoginIcon } from '@heroicons/react/outline';
import { connect } from 'redux-bundler-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const LoginControl = connect(
  'selectAuthIsLoggedIn',
  ({ authIsLoggedIn: isLoggedIn }) => {
    return isLoggedIn ? <LoggedInMenu /> : <LoginButton />;
  }
);

const LoginButton = connect('doAuthLogin', ({ doAuthLogin }) => {
  return (
    <div>
      <button
        onClick={() => {
          doAuthLogin();
        }}
        className="h-11 inline-flex justify-center items-center rounded-lg border border-gray-300 bg-purple-500 px-4 bg-white text-sm font-medium text-gray-200 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Login
        <LoginIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
});

const LoggedInMenu = connect(
  'doAuthLogout',
  'selectAuthUserInitials',
  ({ doAuthLogout, authUserInitials: userInitials }) => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-11 h-11 justify-center items-center rounded-full border border-purple-300 shadow-sm p-2 bg-purple-100 text-sm font-medium text-gray-700 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-indigo-500">
            {userInitials}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Support
                  </a>
                )}
              </Menu.Item> */}
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    License
                  </a>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      doAuthLogout();
                    }}
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);

export { LoginControl, LoginControl as default };
