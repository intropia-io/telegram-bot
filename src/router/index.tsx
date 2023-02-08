import { createBrowserRouter, Navigate } from "react-router-dom";

import Step1 from "components/Steps/components/Step1";
import Step2 from "components/Steps/components/Step2";
import Step3 from "components/Steps/components/Step3";
import Step4 from "components/Steps/components/Step4";
import Step5 from "components/Steps/components/Step5";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  {
    path: "/welcome",
    element: <Step1 />,
  },
  {
    path: "/dynasties",
    element: <Step2 />,
  },
  {
    path: "/opportunities",
    element: <Step3 />,
  },
  {
    path: "/events",
    element: <Step4 />,
  },
  {
    path: "/done",
    element: <Step5 />,
  },
]);

export default router;
