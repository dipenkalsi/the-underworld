import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {RiMoneyDollarCircleFill} from "react-icons/ri"
import {RiAuctionFill} from "react-icons/ri"
import { useActiveListings , useContract ,  MediaRenderer } from '@thirdweb-dev/react'
import Header from '../components/Header'
import { ListingType } from '@thirdweb-dev/sdk'

export default function Home() {
  const {contract} = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT , "marketplace")
  const {data:listings , isLoading:loadingListings } = useActiveListings(contract);
  console.log(listings)
  return (
    <div className='bg-[#1a1a1a] w-full h-full min-h-screen'>
    <Head>
      <title>Home - The underworld</title>
    </Head>
      <Header/>
      <div className='text-purple-300 bg-gray-900 text-3xl font-thin  mt-5 text-center'>Recent Listings</div>
      <main className='py-5 px-5'>
        {loadingListings?(
          <div>
           <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-purple-400 border-2 h-16 w-16"></div>
          </div>
          </div>
        ):(
          <div className='text-white text-center text-3xl'>
            
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto'>
            {listings?.map(listing =>(
              <Link href={`/Listing/${listing.id}`} key={listing.id}> 
              <div  className="flex rounded-md flex-col card transition-all duration-100 ease-in">
                
                <div className='flex justify-center items-center flex-col hover:bg-[#1a0033] py-3 md:py-0 md:pb-3 px-3'>
                  <MediaRenderer src={listing.asset.image} className="rounded-lg"/>
                  <div className=' md:px-0'>
                    <div className='w-full flex  items-center justify-center mt-3 lg:mt-0'>
                      <h2 className='text-purple-300 text-2xl'>{listing.asset.name}</h2>
                      
                    </div>
                    <div className='text-gray-500 text-sm text-center mt-1'>
                      {listing.asset.description.slice(0,150)}...
                    </div>
                    <div className='flex px-2 w-full items-center justify-between'>
                      <h2 className='text-purple-300 text-xl mt-4'>{listing.buyoutCurrencyValuePerToken.displayValue} <span>{listing.buyoutCurrencyValuePerToken.symbol}</span>
                      </h2>

                      <div className='bg-purple-300 text-[#1a1a1a] px-3 py-1 rounded-sm hover:bg-purple-400 transition-all duration-100 ease-in mt-4 flex items-center justify-center space-x-2 text-base cursor-pointer'>
                        <div>{listing.type===ListingType.Direct?<RiMoneyDollarCircleFill/>:<RiAuctionFill/>}</div>
                        <p className='text-base'>{listing.type === ListingType.Direct ? "Buy Now":"Bid Now"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div> 
          </div>
        )}
      </main>
    </div>
  )
}
