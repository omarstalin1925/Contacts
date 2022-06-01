import { Routes, Route } from 'react-router-dom';
import CreateContacts from './components/compCreateContacts';
import ListContacts from './components/compListContacts';
import EditContacts from './components/compEditContacts';
import DeleteContacts from './components/compDeleteContacts';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<ListContacts/>} />
    <Route path='/CreateContacts' element={<CreateContacts/>} />
    <Route path='/EditContacts' element={<EditContacts/>} />
    <Route path='/DeleteContacts' element={<DeleteContacts/>} />
  </Routes>
);
}
export default Main;