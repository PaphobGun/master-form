import TitleEnum from 'enums/title.enum';
import NationEnum from 'enums/nation.enum';
import GenderEnum from 'enums/gender.enum';
import MobileZoneEnum from 'enums/mobile.zone.enum';

export default interface CandidateForm {
  title?: TitleEnum;
  firstName?: string;
  lastName?: string;
  birthDate?: number;
  nation?: NationEnum;
  citizenId?: string;
  gender?: GenderEnum;
  mobileZone?: MobileZoneEnum;
  phoneNumber?: string;
  passport?: string;
  salary?: string;
}
