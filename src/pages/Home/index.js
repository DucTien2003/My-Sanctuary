import { Link } from 'react-router-dom';

import Banner from '@/components/specific/Banner';
import DetailCard from '@/components/common/cards/DetailCard';
import Swiper from '@/components/specific/Swiper';
// import { homePageApi } from '@/api';
// import { useGetData } from '@/hooks';
import { latestUpdates } from '@/api/home';

function Home() {
  // const apiUrl = homePageApi();
  // const { error, loading, responseData } = useGetData(apiUrl);

  // if (loading) {
  // return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div>
      {/* Banner */}
      <div className="pb-8">
        <Banner />
      </div>

      {/* Latest updates */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2>Latest Updates</h2>
          <Link
            to="comic-list"
            className="md-primary-border hover-md-primary-color rounded-lg px-4 py-2 font-semibold">
            Read more
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-5 pb-12">
          {latestUpdates.map((comic, index) => {
            return (
              <div key={index} className="w-full">
                <DetailCard comic={comic} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff Picks */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2>Staff Picks</h2>
          <Link
            to="/comic-list"
            className="md-primary-border hover-md-primary-color rounded-lg px-4 py-2 font-semibold">
            Read more
          </Link>
        </div>

        <div className="mt-5">
          <Swiper
            comicList={latestUpdates}
            numberOfSlides={5}
            cardType="description"
          />
        </div>
      </div>

      {/* Recently Added */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2>Recently Added</h2>
          <Link
            to="comic-list"
            className="md-primary-border hover-md-primary-color rounded-lg px-4 py-2 font-semibold">
            Read more
          </Link>
        </div>

        <div className="mt-5">
          <Swiper
            comicList={latestUpdates}
            numberOfSlides={6}
            gap={20}
            cardType="monotonic"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
