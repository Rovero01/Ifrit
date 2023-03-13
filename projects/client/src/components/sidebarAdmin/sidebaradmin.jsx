import { TbBuildingWarehouse } from 'react-icons/tb'
import { MdOutlineSpaceDashboard, MdAssignment } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { userData } from "../../data/userData";

//import components
import ManageAccount from '../manageAccount/manageaccount'
import Transaction from '../transaction/transaction';

export default function SidebarAdmin() {
    let [visible,setVisible] = useState({
        sidebar:false
    })

    let location = useLocation()
    console.log(location.pathname.split('/'))
    let { user, setUser } = useContext(userData)

    let navigate = useNavigate()
    return (
        <div className="fixed px-5 py-5 w-60 h-screen text-black z-0">
            <div className='flex flex-col h-full'>
                <button onClick={()=> navigate('/')} className='mb-10 text-center text-3xl font-semibold'>
                    iFrit
                </button>

                <div className='flex flex-col gap-8'>
                    <button onClick={() => navigate('/admin')} className={`flex items-center gap-3 ${location.pathname.split('/')[2]==undefined || location.pathname.split('/')[2]=='' ?'':'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'}`}>
                        <MdOutlineSpaceDashboard size={'20px'} />
                        Dashboard
                    </button>
                    {
                        user.role == 1 ?
                            <div className='flex flex-col gap-8'>
                                <ManageAccount />
                                <button onClick={(() => navigate('warehouse'))} className={`flex items-center gap-3 ${location.pathname.split('/')[2]=='warehouse'?'':'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'}`}>
                                    <TbBuildingWarehouse size={'20px'} />
                                    Warehouse
                                </button>

                            </div>
                            : null
                    }
                    <Transaction />

                    <button onClick={()=> navigate('sales-report')} className='flex items-center opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100 gap-3 '>
                        <MdAssignment size={'20px'} />
                        Sales Reports
                    </button>
                </div>

                <div className='flex flex-col items-center justify-end h-full'>
                        <div>
                            Copyrights tito sambo
                        </div>
                </div>
                {/* sidebar */}
            </div>
        </div>
    )
}