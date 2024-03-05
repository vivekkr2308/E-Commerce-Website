import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Login from "./components/Login";
import  SignUp  from "./components/SignUp";
import { ProductContext } from "./productContext";
import MyOrder from "./components/MyOrder";
import Error from "./components/Error";
import NavBar from "./components/Navbar/Navbar"
import Home from "./components/Home"
import Cart from "./components/Cart"
import { AuthContext } from "./authContext";
//App componenet ko hum parent rakhenge bakki sb componenet ko hum child rakhenge
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      errorElement:<Error/>,
      children: [
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/SignUp",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/myorder",
          element: <MyOrder />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  return (
    <>
      <AuthContext>
        <ProductContext>
          <RouterProvider router={router} />
        </ProductContext>
      </AuthContext>
    </>
  );
}

export default App;
