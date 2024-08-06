import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { CgAddR } from 'react-icons/cg';
import { useMemo } from 'react';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';



const Sidebar = () => {
    const location = useLocation();

    const getLinkClass = (path) => {
        return useMemo(() => {
            const baseClass = 'flex items-center gap-2 bg-green-500 py-2 rounded-xl px-3 hover:rounded-2xl duration-300 hover:bg-green-800 shadow shadow-black';
            return location.pathname === path ? `${baseClass} active` : baseClass;
        }, [location.pathname, path]);
    };

    return (
      <div className="w-2/12 bg-base-200 p-4">
        <ul className="menu min-h-full gap-2 text-white font-semibold">
          <Link to={'/'} className={`${getLinkClass('/')} py-3`}>
              <AiOutlineHome className='text-xl'/> Публикации
          </Link>
          <Link to={'/create/report'} className={`${getLinkClass('/')} py-3`}>
              <MdOutlineReportGmailerrorred className='text-xl'/> Отправить жалобу
          </Link>
          <Link to="/create/blog" className={`${getLinkClass('/')} py-3`}>
            <CgAddR className='text-xl'/>Суздать пост
          </Link>
          <Link to={'/profile'} className={`${getLinkClass('/')} py-3`}>
              <IoPersonCircleOutline className='text-xl'/> Profile
          </Link>
        </ul>
      </div>
    );
};

export default Sidebar;
