import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHotel,
  faLocationDot,
  faMap,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type IconProps = {
  className?: string;
};

export function PhoneIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faPhone} aria-hidden="true" className={className} />;
}

export function MailIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className={className} />;
}

export function WhatsAppIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" className={className} />;
}

export function MapIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faMap} aria-hidden="true" className={className} />;
}

export function HotelIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faHotel} aria-hidden="true" className={className} />;
}

export function LocationPinIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" className={className} />;
}

export function InstagramIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faInstagram} aria-hidden="true" className={className} />;
}

export function FacebookIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faFacebook} aria-hidden="true" className={className} />;
}
