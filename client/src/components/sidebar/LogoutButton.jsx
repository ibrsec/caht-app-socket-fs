import { TbLogout2 } from "react-icons/tb";

import { useSelector } from 'react-redux'
import useApiRequests from "../../services/useApiRequests";


const LogoutButton = () => {

  const {logoutApi} = useApiRequests();
  const loading = useSelector(state=> state.auth.loading)
  return (
    <div>
      {
        !loading ? 
        <TbLogout2 className="w-6 h-6 text-white cursor-pointer hover:text-green-500 active:text-green-600 transition-all" onClick={logoutApi} />
        :
        <span className="loading loading-spinner"></span>
      }
    </div>
  )
}

export default LogoutButton