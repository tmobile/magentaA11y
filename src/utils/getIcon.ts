import * as Icons from "shared/icons-svg-exports";
import { Icon } from "shared/Icons";

export const getIcon = (
  iconName: Icon
): React.FC<React.SVGProps<SVGSVGElement>> | null => {
  if (iconName in Icons) {
    return Icons[iconName as keyof typeof Icons];
  }
  return null;
};
