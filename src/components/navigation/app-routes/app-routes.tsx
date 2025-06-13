import AboutUs from "components/about-us/about-us";
import AccessibleDemo from "components/accessible-demo/accessible-demo";
import Criteria from "components/criteria/criteria";
import Home from "components/home/home";
import InaccessibleDemo from "components/inaccessible-demo/inaccessible-demo";
import MyCriteria from "components/my-criteria/my-criteria";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { DocumentationCategory } from "shared/types/shared-types";
import NotFound from "../not-found/not-found";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/basic-inaccessible-webpage" element={<InaccessibleDemo />} />
    <Route path="/basic-accessible-webpage" element={<AccessibleDemo />} />
    <Route
      path="/web-criteria/*"
      element={<Criteria documentation={DocumentationCategory.WEB} />}
    />
    <Route
      path="/native-criteria/*"
      element={<Criteria documentation={DocumentationCategory.NATIVE} />}
    />
    <Route path="/my-criteria" element={<MyCriteria />} />
    <Route
      path="/how-to-test-criteria/*"
      element={<Criteria documentation={DocumentationCategory.HOW_TO_TEST} />}
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
