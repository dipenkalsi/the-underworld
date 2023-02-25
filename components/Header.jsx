import React from 'react'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import {MdOutlineInventory2} from 'react-icons/md'
import {AiOutlineBell} from 'react-icons/ai'
import { useAddress , useDisconnect , useMetamask } from '@thirdweb-dev/react'
const Header = () => {
    const connectWithMetamask = useMetamask();
    const disconnect = useDisconnect();
    const address = useAddress();
  return (
    <div>
      <nav className='px-3 py-3 flex items-center justify-between border-b border-gray-700'>
        <div className='text-purple-400 md:hidden text-3xl font-bold'>
            TU💜
        </div>
        <div className='hidden md:flex items-center justify-start'>
        <div className='text-purple-300  text-2xl font-bold'>
            The underworld💜
        </div>
        </div>
        <div className='border border-gray-600 hidden lg:flex w-[55%]'>
            <input type="text" placeholder='Search for assets, artists, listings etc.'  className='w-full bg-transparent py-2 px-2 focus:outline-none focus:placeholder:text-transparent text-purple-300 placeholder:text-gray-500'/>
            <button className='px-5 bg-purple-800 border border-purple-800 hover:bg-purple-900 transition-all ease-in duration-100'>
                <div className='text-white text-2xl'>
            <AiOutlineSearch/>
            </div>
            </button>
        </div>
        <div className='flex space-x-3 items-center justify-center text-purple-300  text-2xl'>
            <Link href="/addItem">
            <MdOutlineInventory2 className='hover:text-green-500 transition-all ease-in duraiotn-100'/>
            </Link>
            <AiOutlineBell className='hover:text-green-500 transition-all ease-in duraiotn-100 cursor-pointer'/>
            <AiOutlineShoppingCart className='hover:text-green-500 transition-all ease-in duraiotn-100 cursor-pointer'/>
        <div>
            {address?
            <button className='bg-purple-800 text-sm text-white px-5 py-2 rounded-sm font-semibold hover:bg-purple-900 transition-all ease-in duration-100' onClick={disconnect}>
                {address.slice(0,6)}...{address.slice(36)}
            </button>:
            <button className='bg-purple-800 text-sm text-white px-5 py-2 rounded-sm font-semibold hover:bg-purple-900 transition-all ease-in duration-100' onClick={connectWithMetamask}>
                Connect wallet
            </button>
            }
        </div>
        </div>
      </nav>
      <section className='flex items-center justify-between text-gray-500 px-3 py-1 text-sm border-b border-gray-700 '>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 '>Categories</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 '>Latest releases</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Best deals</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Artist&apos;s Pick</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Chains</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Economic</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Popular</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Top-10 weekly</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Top-10 monthly</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Artists</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 '>News</p>
        <p className='cursor-pointer hover:text-gray-400 transition-all ease-in duration-100 hover:underline underline-offset-2 hidden lg:block'>Region-wise</p>
        <Link href='/create'>
        <button className='text-purple-300 border rounded-sm border-purple-300 text-base hover:bg-purple-300 hover:text-[#1a1a1a] font-semibold transition-all ease-in duration-100 px-8 py-1'>
            List Item
        </button>
        </Link>
      </section>
    </div>
  )
}

export default Header
