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

export default function Home() {
  const [location, setLocation] = useState(null);

  // Invalid Checks for Form Fields (used to set aria-invalid property on form values)
  const [locationIsValid, setLocationIsValid] = useState(
    location ? true : false
  );

  const Card1ImgSrc =
    'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60';
  const Card2ImgSrc =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80';
  const Card3ImgSrc =
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGRhdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60';
  return (
    <>
      <PageTitle useDefault={true} />

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
      </div>
    </>
  );
}
