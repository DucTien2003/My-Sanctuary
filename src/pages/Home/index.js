import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Banner from '@/components/specific/Banner';
import DetailCard from '@/components/common/cards/DetailCard';
import Swiper from '@/components/specific/Swiper';
import { useGetData } from '@/hooks';
import { listComicsApi } from '@/api';
import { comicListUrl } from '@/routes';

function Home() {
  const latestUpdateApiUrl = listComicsApi({ limit: 18, orderBy: 'update_at' });
  const recentlyAddedApiUrl = listComicsApi({
    limit: 18,
    orderBy: 'publish_at',
  });

  const staticApis = useMemo(
    () => [latestUpdateApiUrl, recentlyAddedApiUrl],
    [latestUpdateApiUrl, recentlyAddedApiUrl]
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  if (staticResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        Error: {staticResponse.error}
      </h2>
    );
  }

  const [latestUpdateComics, recentlyAddedComics] =
    staticResponse.initialData || [];

  console.log(staticResponse.initialData);

  return (
    <div>
      {/* Banner */}
      <div className="pb-8">
        <Banner />
      </div>

      {/* Latest updates */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Latest Updates</h2>
          <Link
            to={comicListUrl()}
            className="theme-primary-border hover-theme-primary-text rounded-lg border px-4 py-2 font-semibold">
            Read more
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-5 pb-12">
          {latestUpdateComics.map((comic, index) => {
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
          <h2 className="font-semibold">Staff Picks</h2>
          <Link
            to={comicListUrl()}
            className="theme-primary-border hover-theme-primary-text rounded-lg border px-4 py-2 font-semibold">
            Read more
          </Link>
        </div>

        <div className="mt-5">
          <Swiper
            comicList={recentlyAddedComics}
            numberOfSlides={5}
            cardType="description"
          />
        </div>
      </div>

      {/* Recently Added */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recently Added</h2>
          <Link
            to={comicListUrl()}
            className="theme-primary-border hover-theme-primary-text rounded-lg border px-4 py-2 font-semibold">
            Read more
          </Link>
        </div>

        <div className="mt-5">
          <Swiper
            comicList={recentlyAddedComics}
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
