interface CityBackdropProps {
  className?: string;
}

export default function CityBackdrop({ className = '' }: CityBackdropProps) {
  return (
    <img
      src="/six-counties/images/city-skyline.webp"
      alt="臺灣城市與水岸插圖"
      className={`block h-auto w-full ${className}`.trim()}
    />
  );
}
