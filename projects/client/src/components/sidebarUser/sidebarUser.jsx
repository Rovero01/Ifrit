import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { userData } from '../../data/userData'
import { toast, Toaster } from "react-hot-toast";
import { Accordion } from 'flowbite-react'

export default function Sidebar(props) {

    let navigate = useNavigate()
    const { user, setUser } = useContext(userData)

    const [showContent, setShowContent] = useState(0)

    let showAccordion = (id) => {
        // console.log(id)
        if(showContent !=id)  {
            setShowContent(id)
        } else if (showContent==0) {
            setShowContent(id)
        } else if (showContent) {
            setShowContent(0)
        }
    }

    let logout = () => {
        toast('Logout..', {
            style: {
                backgroundColor: 'black',
                color: 'white'
            }
        })
        setTimeout(() => {
            localStorage.removeItem('token')
            window.location.reload(false)
        }, 2000)
        navigate('/')
    }

    return (
        <>
            <div className='mx-3 min-h-max'>

                {
                    props.data.category.map((value, index) => {
                        return (
                            <>
                                <div>
                                    <button onClick={() => showAccordion(value.id)} className="flex w-full items-center justify-between px-4 py-2 text-left text-xl font-medium text-white">
                                        <p>{value.name}</p>
                                        <MdOutlineKeyboardArrowDown className={!showContent ? 'rotate-180 transform' : ''} />
                                    </button>
                                    {
                                        showContent == value.id ?
                                            value.products.map((val) => {
                                                return (
                                                    <button
                                                        onClick={() => {
                                                            props.func.getProductDetail(val.id)
                                                            navigate(`/product/productdetail/${val.id}`)
                                                        }}
                                                        className="w-full flex justify-start px-4 py-2 text-lg text-white font-light ">
                                                        {val.name}
                                                    </button>
                                                )
                                            })
                                            :
                                            null
                                    }
                                    {/* <button
                                        onClick={() => {
                                            navigate(`/product/${value.id}`)
                                        }}
                                        className="w-full flex justify-start px-4 py-2 text-lg text-white font-light ">>
                                        View All
                                    </button> */}
                                </div>
                            </>
                        )
                    })
                }

                <div className='border-y-2 mt-5'>
                    {
                        localStorage.getItem('token') ?
                            <div className='py-2'>
                                <p className='text-xl px-3 font-normal'>Profile</p>
                                <button onClick={() => navigate('/my-account')}>
                                    <p className='text-xl font-medium px-3 pt-1'>{user.username}</p>
                                </button>
                            </div>
                            :
                            <div className='py-2'>
                                {/* <p className='text-xl px-3 font-normal'>Profile</p> */}
                                <button onClick={() => navigate('/login')}>
                                    <p className='text-xl font-medium px-3 py-2'>Login or Register</p>
                                </button>
                            </div>
                    }
                </div>

                {
                    !localStorage.getItem('token') ?
                        null :
                        <div className='border-b-2 py-2'>
                            <button onClick={() => logout()} className='text-xl px-3'>
                                Logout
                            </button>
                        </div>
                }

            </div>
        </>
    )
}