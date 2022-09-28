// Soft UI Dashboard React examples
import ExpertDashboardLayout from "examples/LayoutContainers/ExpertDashboardLayout";
import ExpertDashboardNavbar from "examples/Navbars/ExpertDashboardNavbar";
import Footer from "examples/Footer";


import { StateProvider } from "Contex/StateProvider";
import MessageShow from "../../../MessageShow.js";
import reducer, { initialState } from "Contex/reducer";

function ExpertMessagerie() {

  return (
    <ExpertDashboardLayout>
      <ExpertDashboardNavbar />
      {/*body*/}
      <StateProvider initialState={initialState} reducer={reducer}>
        <MessageShow />
    </StateProvider>
      <Footer />
   
    </ExpertDashboardLayout>
  );
}

export default ExpertMessagerie;
