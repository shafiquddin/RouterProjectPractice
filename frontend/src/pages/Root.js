
import { Outlet } from 'react-router-dom';
import MainNaviagation from '../components/MainNavigation.js'

const Root = () => {
    return <>
    
    <MainNaviagation/>
    <main>
        <Outlet/>
    </main>
    </>
}

export default Root;