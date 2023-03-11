import axios from "axios"
import { useContext } from "react"
import { userData } from "../../data/userData"

export default function DashboardAccount() {

    const { user, setUser } = useContext(userData)

    return (
        user ? <>
            <div className="w-full h-screen">
                <div className="border border-gray-300 flex px-5 py-2">
                    <div className="text-xl font-semibold mr-2">Welcome,</div>
                    <div className="text-xl font-bold ">{user.username}</div>
                </div>
            </div>
        </>
        :
        <div>Loading</div>
    )
}