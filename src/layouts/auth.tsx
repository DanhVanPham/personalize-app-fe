import routes from "@/routes";
import { Routes, Route } from "react-router-dom";

export function Auth() {
  return (
    <div className="relative h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route path={path} element={element} />
            )),
        )}
      </Routes>
    </div>
  );
}
