import MonotonicCard from '@/components/common/cards/MonotonicCard';
import DetailCard from '@/components/common/cards/DetailCard';
import DescriptionCard from '@/components/common/cards/DescriptionCard';

function Swiper({
  comicList,
  numberOfSlides = 1,
  gap = 30,
  cardType = 'detail',
}) {
  let CardComponent;

  switch (cardType) {
    case 'detail':
      CardComponent = DetailCard;
      break;
    case 'description':
      CardComponent = DescriptionCard;
      break;
    case 'monotonic':
      CardComponent = MonotonicCard;
      break;
    default:
      CardComponent = MonotonicCard;
  }

  return (
    /* Swiper */
    <swiper-container
      id="swiper"
      loop={true}
      speed={500}
      space-between={gap}
      slides-per-view={numberOfSlides}
      autoplay-delay="2500"
      autoplay-disable-on-interaction={true}>
      {comicList.map((comic, index) => {
        return (
          <swiper-slide key={index}>
            <div className="pb-12">
              <CardComponent comic={comic} />
            </div>
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
}

export default Swiper;
