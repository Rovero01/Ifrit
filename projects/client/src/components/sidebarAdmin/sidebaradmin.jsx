import { TbBuildingWarehouse } from 'react-icons/tb'
import { MdOutlineSpaceDashboard, MdAssignment } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userData } from "../../data/userData";

//import components
import ManageAccount from '../manageAccount/manageaccount'
import Transaction from '../transaction/transaction';

export default function SidebarAdmin() {
    let { user, setUser } = useContext(userData)

    let navigate = useNavigate()
    return (
        <div className="fixed px-5 py-5 w-60 h-screen bg-zinc-900 text-white z-0">
            <div className='flex flex-col h-full fixed'>
                <div className='mb-10 text-center text-3xl font-semibold'>
                    iFrit
                </div>

                <div className='flex flex-col gap-4'>
                    <button onClick={() => navigate('/admin')} className='flex items-center gap-3 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
                        <MdOutlineSpaceDashboard size={'20px'} />
                        Dashboard
                    </button>
                    {
                        user.role == 1 ?
                            <div className='flex flex-col gap-3'>
                                <ManageAccount />
                                <button onClick={(() => navigate('warehouse'))} className='flex items-center opacity-50 ease-in focus:text-white duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100 gap-3 '>
                                    <TbBuildingWarehouse size={'20px'} />
                                    Warehouse
                                </button>

                            </div>
                            : null
                    }
                    <Transaction />

                    <button className='flex items-center opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100 gap-3 '>
                        <MdAssignment size={'20px'} />
                        Sales Reports
                    </button>
                </div>
                {/* sidebar */}
            </div>
        </div>
    )
}