import Skyline, { type SKYLINE_VARIANTS } from './Skyline';

interface CityBackdropProps {
  className?: string;
  variant?: (typeof SKYLINE_VARIANTS)[number];
}

export default function CityBackdrop({ className = '', variant = 'day' }: CityBackdropProps) {
  return <Skyline className={className} variant={variant} />;
}
