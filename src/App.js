import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            const headerAbsolute = route.headerAbsolute || false;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout headerAbsolute={headerAbsolute}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          ;
        </Routes>
      </div>
    </Router>
  );
}
export default App;
