import { CITY_SKYLINE_URLS } from '../content/site';

interface CityBackdropProps {
  className?: string;
  variant?: keyof typeof CITY_SKYLINE_URLS;
}

export default function CityBackdrop({ className = '', variant = 'day' }: CityBackdropProps) {
  return (
    <img
      src={CITY_SKYLINE_URLS[variant]}
      alt="臺灣城市與水岸插圖"
      className={`block h-auto w-full ${className}`.trim()}
    />
  );
}
