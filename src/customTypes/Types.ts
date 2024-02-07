export interface NavLink {
  name: string;
  path: string;
  icon?: boolean;
  dropdown?: NavLink[];
}
