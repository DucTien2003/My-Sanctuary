import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from '@/components/specific/ScrollToTop';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

function App() {
  return (
    <Router>
      <ScrollToTop />
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
