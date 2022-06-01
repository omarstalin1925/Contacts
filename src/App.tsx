import * as React from 'react';
import { Link} from 'react-router-dom';
import Main from './MainT';
export default function App() {
  return (
    <>  
      <div>
        <ul>
          <li><Link to='/'>Lista de Contactos</Link></li>
          <li><Link to='/CreateContacts'>Agregar Contacto</Link></li>
          <li><Link to='/EditContacts'>Editar Contacto</Link></li>
          <li><Link to='/DeleteContacts'>Eliminar Contacto</Link></li>
        </ul>
        <hr />
        <Main />       
      </div>   
    </>
  )
}


// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import type { RouteObject } from "react-router-dom";
// import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
// import  compCreateContacts from "./components/compCreateContacts";
// // import compDeleteContacts from "./components/compDeleteContacts";
// // import compReadContacts from "./components/compReadContacts";
// // import compUpdateContacts from "./components/compUpdateContacts";
// function App() {

//   let routes: RouteObject[] = [
    
//     {
      
//       path: "/",
//       element: <Layout />,
//       children: [
//         { index: true, element: <Home /> },
        
//         {
//           path: "/courses",
//           element: <Courses />,
//           // children: [
//           //   { index: true, element: <CoursesIndex /> },
//           //   { path: "/courses/:id", element: <Course /> },
//           // ],
//         },
//         // { path: "*", element: <NoMatch /> },
//       ],
//     },
//   ];

//   function Layout() {
//     return (
//       <div>
//         <nav>
//           <ul>
//             {/* <li>
//               <Link to="/">Home</Link>
//             </li> */}
//             <li>
//               <Link to="/courses">Create Contacts</Link>
//             </li>
//             <li>
//               <Link to="/courses">Courses</Link>
//             </li>
//             <li>
//               <Link to="/courses">Courses</Link>
//             </li>
//             <li>
//               <Link to="/courses">Courses</Link>
//             </li>
//             {/* <li>
//               <Link to="/nothing-here">Nothing Here</Link>
//             </li> */}
//           </ul>
//         </nav>
  
//         <hr />
  
//         <Outlet />
//       </div>
//     );
//   }
  
//   function Home() {
//     // {compCreateContacts}
//     return (
//       <div>
//         <h2>hola</h2>
//       </div>
//     );
//   }
  
//   function Courses() {
//     return (
//       <div>
//         <h2>Courses</h2>
//         <Outlet />
//       </div>
//     );
//   }
  
//   function CoursesIndex() {
//     return (
//       <div>
//         <p>Please choose a course:</p>
  
//         <nav>
//           <ul>
//             <li>
//               <Link to="react-fundamentals">React Fundamentals</Link>
//             </li>
//             <li>
//               <Link to="advanced-react">Advanced React</Link>
//             </li>
//             <li>
//               <Link to="react-router">React Router</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     );
//   }
  
//   function Course() {
//     let { id } = useParams<"id">();
  
//     return (
//       <div>
//         <h2>
//           {/* Welcome to the {id!.split("-").map(capitalizeString).join(" ")} course! */}
//         </h2>
  
//         <p>This is a great course. You're gonna love it!</p>
  
//         <Link to="/courses">See all courses</Link>
//       </div>
//     );
//   }
  
//   let element = useRoutes(routes);
//   return (
//     <div>
//       <h1>Contacts</h1>

//       {element}
//     </div>
//   );
// }

// export default App;
