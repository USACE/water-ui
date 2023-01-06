// import { InboxIcon } from '@heroicons/react/24/outline';
// import { getByPlaceholderText } from '@testing-library/react';
import Card from '../app-components/card';
import HomeDam1 from '../images/home/lrh-sutton-dam.jpg';
import HomeDam2 from '../images/home/nww-lucky-peak-dam.jpg';
import HomeDam3 from '../images/home/nww-ice-harbor-lock-dam.jpg';

const HomeBgImgArray = [
  { src: HomeDam1 },
  { src: HomeDam2 },
  { src: HomeDam3 },
];
const HomeBgImg =
  HomeBgImgArray[Math.floor(Math.random() * HomeBgImgArray.length)];

// const features = [
//   {
//     name: 'Unlimited Inboxes',
//     description:
//       'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
//     icon: InboxIcon,
//   },
// ];

export default function Home() {
  const Card1ImgSrc =
    'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60';
  const Card2ImgSrc =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80';
  const Card3ImgSrc =
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGRhdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60';
  return (
    <>
      {/* Hero section */}
      {/* <div className="relative mt-5">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Alternating Feature Sections */}
      <div className="pt-0">
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
        /> */}

        <div
          className="h-72 max-h-full bg-gray-500 bg-cover bg-center bg-no-repeat px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:h-128 lg:px-8 lg:pt-8"
          style={{ backgroundImage: `url(${HomeBgImg.src})` }}
        >
          {/* <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0"></div> */}
          {/* <div className="container mx-auto max-w-7xl rounded-md border-4 border-slate-300 bg-white py-2 text-center text-4xl font-bold tracking-tight opacity-50">
            U.S. Army Corps of Engineers - Water Resources Data
          </div> */}
        </div>
      </div>

      {/* <div className="bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
          cards
        </div>
      </div> */}

      <div className="-mt-10 bg-blue-900 py-0 text-center text-gray-300 opacity-90">
        {/* <span className="text-gray-500">
          U.S. Army Corps of Engineers - Water Resources Data
        </span> */}
        <div className="mx-auto max-w-2xl px-4 py-16 pb-16 sm:px-6 sm:pt-20 sm:text-center lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-medium tracking-tight text-white md:text-3xl">
            U.S. Army Corps of Engineers - Water Management
          </h2>
          <p className="mt-2 font-normal text-gray-400 md:text-lg">
            The United States Army Corps of Engineers (USACE) is responsible for
            operating and maintaining more than 700 lock and dam projects
            nationwide. The Access to Water Resources Data - Corps Water
            Management System (CWMS) Data Dissemination tool supports the USACE
            water control management mission by utilizing visualizations and
            reports to provide continuous assessment, awareness, and effective
            decision support of lock and dam projects, which in turn reduces
            risks to people, property, and the environment.
          </p>
        </div>
      </div>

      <div className="py-8 opacity-90 ">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:flex md:gap-8 lg:px-8">
          <a href="/">
            <Card title="Locations" imgSrc={Card1ImgSrc}></Card>
          </a>
          <a href="/">
            <Card title="Data Resources" imgSrc={Card2ImgSrc}></Card>
          </a>
          <a href="/">
            <Card title="Reports" imgSrc={Card3ImgSrc}></Card>
          </a>
        </div>
      </div>

      {/* Testing */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 sm:text-center lg:max-w-7xl lg:px-8 lg:pt-24">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Find Water Resources Data across the U.S
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Access water resources data such as elevation, precipitation,
            storage and flow status of more than 700 USACE reservior and lock &
            dam projects.
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3">
          <li className="rounded-2xl border border-gray-200 p-8">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                fill="#737373"
              ></path>
              <path
                d="M12 25l8-8m0 0h-6m6 0v6"
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#A3A3A3"
                fillOpacity="0.2"
              ></circle>
            </svg>
            <h3 className="mt-6 font-semibold text-gray-900">
              Invest any amount
            </h3>
            <p className="mt-2 text-gray-700">
              Whether it’s $1 or $1,000,000, we can put your money to work for
              you.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-8">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                fill="#737373"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 13a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm1 5a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H10z"
                fill="url(#:rf:-gradient)"
              ></path>
              <rect
                x="9"
                y="6"
                width="14"
                height="4"
                rx="1"
                fill="#171717"
              ></rect>
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#A3A3A3"
                fillOpacity="0.2"
              ></circle>
              <defs>
                <linearGradient
                  id=":rf:-gradient"
                  x1="16"
                  y1="12"
                  x2="16"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#737373"></stop>
                  <stop offset="1" stopColor="#737373" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h3 className="mt-6 font-semibold text-gray-900">
              Build a balanced portfolio
            </h3>
            <p className="mt-2 text-gray-700">
              Invest in different industries to find the most opportunities to
              win huge.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-8">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#A3A3A3"
                fillOpacity="0.2"
              ></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
                fill="#737373"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 32a8 8 0 100-16 8 8 0 000 16zm1-8.414V19h-2v5.414l4 4L28.414 27 25 23.586z"
                fill="#171717"
              ></path>
            </svg>
            <h3 className="mt-6 font-semibold text-gray-900">
              Trade in real-time
            </h3>
            <p className="mt-2 text-gray-700">
              Get insider tips on big stock moves and act on them within
              seconds.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-8">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                fill="#737373"
              ></path>
              <circle cx="11" cy="14" r="2" fill="#171717"></circle>
              <circle cx="11" cy="20" r="2" fill="#171717"></circle>
              <circle cx="11" cy="26" r="2" fill="#171717"></circle>
              <path
                d="M16 14h6M16 20h6M16 26h6"
                stroke="#737373"
                strokeWidth="2"
                strokeLinecap="square"
              ></path>
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#A3A3A3"
                fillOpacity="0.2"
              ></circle>
            </svg>
            <h3 className="mt-6 font-semibold text-gray-900">
              Profit from your network
            </h3>
            <p className="mt-2 text-gray-700">
              Invite new insiders to get tips faster and beat even other Pocket
              users.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-8">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#A3A3A3"
                fillOpacity="0.2"
              ></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
                fill="#737373"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 19.5a3.5 3.5 0 117 0V22a2 2 0 012 2v6a2 2 0 01-2 2h-7a2 2 0 01-2-2v-6a2 2 0 012-2v-2.5zm2 2.5h3v-2.5a1.5 1.5 0 00-3 0V22z"
                fill="#171717"
              ></path>
            </svg>
            <h3 className="mt-6 font-semibold text-gray-900">
              Encrypted and anonymized
            </h3>
            <p className="mt-2 text-gray-700">
              Cutting-edge security technology that even the NSA doesn’t know
              about keeps you hidden.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-8">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                fill="#737373"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 13.838V26a2 2 0 01-2 2H11a2 2 0 01-2-2V15.65l2.57 3.212a1 1 0 001.38.175L15.4 17.2a1 1 0 011.494.353l1.841 3.681c.399.797 1.562.714 1.843-.13L23 13.837z"
                fill="#171717"
              ></path>
              <path
                d="M10 12h12"
                stroke="#737373"
                strokeWidth="2"
                strokeLinecap="square"
              ></path>
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#A3A3A3"
                fillOpacity="0.2"
              ></circle>
            </svg>
            <h3 className="mt-6 font-semibold text-gray-900">
              Portfolio tracking
            </h3>
            <p className="mt-2 text-gray-700">
              Watch your investments grow exponentially, leaving other investors
              in the dust.
            </p>
          </li>
        </ul>
      </div>
      {/* Gradient Feature Section */}
      {/* <div className="bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Water Resources Data across the U.S.
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-purple-200">
            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
            magna sit morbi lobortis. Blandit aliquam sit nisl euismod mattis
            in.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            test
          </div>
        </div>
      </div> */}

      {/* Stats section */}
      {/* <div className="relative bg-gray-900">
        <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
          <div className="h-full w-full xl:grid xl:grid-cols-2">
            <div className="h-full xl:relative xl:col-start-2">
              <img
                className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                src="https://water-api.corps.cloud/charts/bluestone-dam?format=svg"
                alt="People working on laptops"
              />

              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
          <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
            <h2 className="text-base font-semibold">
              <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Valuable Metrics
              </span>
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-white">
              Get actionable data that will help grow your business
            </p>
            <p className="mt-5 text-lg text-gray-300">
              Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing
              quis in viverra tristique sem. Ornare feugiat viverra eleifend
              fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus
              laoreet amet lacus nibh integer quis. Eu vulputate diam sit tellus
              quis at.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
              test metrics
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
