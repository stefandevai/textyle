import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displaySidebar } from "redux/actions";
import TabSelector from "ui/sidebar/TabSelector";
import Edit from "ui/sidebar/tileset/Edit";
import ImportSettings from "ui/sidebar/import/ImportSettings";
import ExportSettings from "ui/sidebar/export/ExportSettings";
import ProjectSettings from "ui/sidebar/project/ProjectSettings";
import Help from "ui/sidebar/Help";
import WelcomeModal from "ui/WelcomeModal";
import { HashRouter, Switch, Route } from "react-router-dom";
import { dividerBorderColor } from "resources/styles";
import * as tabs from "resources/tabs";
import * as testIds from "resources/testIds";

const Sidebar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.canvas.showSidebar);

  useEffect(() => {
    const windowHash = window.location.hash;

    if (windowHash && windowHash !== "" && windowHash !== "#/") {
      dispatch(displaySidebar(true));
    } // eslint-disable-next-line
  }, []);

  const sidebarStyle = showSidebar
    ? { width: "23vw", gridTemplateColumns: "40px 1fr" }
    : { width: "40px", gridTemplateColumns: "40px 0px" };
  const sidebarInnerStyle = showSidebar ? { width: "100%", borderRight: "1px solid rgb(75, 85, 99)" } : { width: "0" };

  return (
    <div className="col-start-1 col-end-2 row-start-1 row-end-3 z-20 flex">
      <HashRouter className="flex-1">
        <aside
          style={{
            transition: "all 150ms ease-in-out",
            display: "grid",
            ...sidebarStyle,
          }}
        >
          <TabSelector />

          <div
            className={`bg-gray-900 border-b ${dividerBorderColor}`}
            style={sidebarInnerStyle}
            data-testid={showSidebar ? testIds.SIDEBAR_ELEMENT : ""}
          >
            {showSidebar && (
              <Switch>
                <Route path={`/${tabs.TAB_TILES}`}>
                  <Edit />
                </Route>

                <Route path={`/${tabs.TAB_IMPORT}`}>
                  <ImportSettings />
                </Route>

                <Route path={`/${tabs.TAB_EXPORT}`}>
                  <ExportSettings />
                </Route>

                <Route path={`/${tabs.TAB_SETTINGS}`}>
                  <ProjectSettings />
                </Route>

                <Route path={`/${tabs.TAB_HELP}`}>
                  <Help />
                </Route>
              </Switch>
            )}
          </div>
        </aside>

        <WelcomeModal />
      </HashRouter>
    </div>
  );
};

export default Sidebar;
