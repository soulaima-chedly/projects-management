import { AppBreadcrumb } from "./app-breadcrumb";
import HomeHeaderDropDown from "./home-header-dropdown";

export default function HomeHeader() {
  return (
    <div className="flex justify-between items-center">
      <AppBreadcrumb />
      <HomeHeaderDropDown />
    </div>
  );
}
