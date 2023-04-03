// import { InboxIcon } from '@heroicons/react/24/outline';
// import { getByPlaceholderText } from '@testing-library/react';
import { useState } from 'react';
import PageTitle from '../app-components/page-title';
import ImageCard from '../app-components/image-card';
import HomeDam1 from '../images/home/lrh-sutton-dam.jpg';
import HomeDam2 from '../images/home/nww-lucky-peak-dam.jpg';
import HomeDam3 from '../images/home/nww-ice-harbor-lock-dam.jpg';
import LocationCombobox from '../app-components/inputs/location-search-input';

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
  const [location, setLocation] = useState(null);

  // Invalid Checks for Form Fields (used to set aria-invalid property on form values)
  // TODO; More strict validation checking. Currently, if a string value is set, it is considered valid.
  //       In the future, may want to consider checking if string value represents a valid timeseries
  const [locationIsValid, setLocationIsValid] = useState(
    location ? true : false
  );

  const Card1ImgSrc =
    'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60';
  const Card2ImgSrc =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80';
  const Card3ImgSrc =
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGRhdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60';
  return (
    <>
      <PageTitle useDefault={true} />
      {/* Alternating Feature Sections */}

      <div className="pt-0">
        <div
          className="flex h-72 max-h-full bg-gray-500 bg-cover bg-center bg-no-repeat px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:h-128 lg:px-8 lg:pt-8"
          style={{ backgroundImage: `url(${HomeBgImg.src})` }}
        >
          {/* NOTE: relative and z index styles below are needed to keep the 
          search results above other content which contains opacity adjustments */}
          <div className="relative z-10 m-auto w-full rounded-md border-2 border-gray-400 bg-gray-300 p-4 sm:w-4/5 md:w-3/5 lg:w-2/5">
            <div className="relative shadow-lg">
              <LocationCombobox
                label=""
                value={location}
                setValue={setLocation}
                isValid={!location || locationIsValid}
                setIsValid={setLocationIsValid}
                isRequired={false}
                placeholder="Search"
                className="border-2 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-10 bg-blue-900 py-0 text-center text-gray-300 opacity-90">
        <div className="mx-auto max-w-2xl px-4 py-16 pb-16 sm:px-6 sm:pt-20 sm:text-center lg:max-w-screen-2xl lg:px-8">
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

      <div className="py-8 opacity-90">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:flex md:gap-8 lg:px-8">
          <a href="/overview">
            <ImageCard title="Locations" imgSrc={Card1ImgSrc}></ImageCard>
          </a>
          <a href="/">
            <ImageCard title="Data Resources" imgSrc={Card2ImgSrc}></ImageCard>
          </a>
          <a href="/">
            <ImageCard title="Reports" imgSrc={Card3ImgSrc}></ImageCard>
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
        {/* <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3">
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
        </ul> */}
      </div>
    </>
  );
}
