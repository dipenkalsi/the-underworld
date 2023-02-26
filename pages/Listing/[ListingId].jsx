import {React, useEffect, useState} from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'
import { FaEthereum } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsFillShareFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import {RiMoneyDollarCircleFill} from "react-icons/ri"
import {RiAuctionFill} from "react-icons/ri"
import Header from '../../components/Header'
import { MediaRenderer ,useContract, useListing } from '@thirdweb-dev/react';
import { ListingType } from '@thirdweb-dev/sdk';
import Countdown from 'react-countdown';
const ListingPage = () => {
const router = useRouter();
const [liked, setLiked] = useState(false)
const [minimumNextBid, setMinimumNextBid] = useState();
let likes = 0;
const { ListingId } = router.query;
console.log(ListingId)
const {contract} = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT , "marketplace")
const { data:listing , isLoading, error} = useListing(contract, ListingId);
console.log(listing)
const createBidOrOffer = async () =>{
    
}
useEffect(()=>{
    if(!ListingId || !contract){
        return;
    }
    if(listing?.type === 1){
        fetchMinNextBid()
    }
},[ListingId , listing, contract])

const fetchMinNextBid=async()=>{
    if(!ListingId || !contract) return;

    const minBidResponse = await contract.auction.getMinimumNextBid(ListingId);

    setMinimumNextBid({
        displayValue:minBidResponse.displayValue,
        symbol:minBidResponse.symbol
    })
}
const handleLikeClick=()=>{
    setLiked(true);
    likes++;
}
  if(!listing && !isLoading){
    return (
    <div className='w-full h-full min-h-screen bg-[#1a1a1a] '>
      <Head>
        <title>Listing not found - The Underworld</title>
        </Head> 

      <Header/>

      <main>
        <div className='flex items-center justify-center w-full h-full px-5 py-5'>
            <p className='text-purple-300 font-thin text-4xl'>
                404 Listing not found :(
            </p>
        </div>
      </main>
    </div>
    )
  }
  return (
    <div className='w-full h-full min-h-screen bg-[#1a1a1a] '>
      <Header/>
      <main>
        {isLoading ? (
            <div>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-purple-400 border-2 h-16 w-16"></div>
          </div>
            </div>
        ):(
        <div className='px-5 py-5'>
            <div className='flex flex-col items-center justify-center space-y-5  lg:space-y-10'>
                <div className='text-purple-300 text-4xl text-center font-normal lg:hidden'>
                    {listing.asset.name}
                </div> 
                <div className='flex flex-col space-y-4 lg:space-y-0 lg:space-x-10 lg:flex-row w-full items-center lg:items-start justify-center lg:justify-around'>
                    <div className='flex flex-col items-center justify-center space-y-2'>
                        
                        <MediaRenderer src={listing?.asset.image} height={400} width={400} className="rounded-md"/>

                        <div className='w-full flex items-center justify-between text-2xl'>
                            <div className='text-purple-300 '>
                                <FaEthereum className="cursor-pointer"/>
                            </div>
                            <div className='text-purple-300 flex items-center justify-center space-x-3'>
                                <CiShare1 className="cursor-pointer"/>
                                <div className='flex items-center justify-center space-x-2'>
                                <div className='text-purple-300 text-lg'>{likes}</div>
                                <div>
                                {!liked ? <BsSuitHeart onClick={()=>{handleLikeClick}} className="cursor-pointer"/>:<BsSuitHeartFill />}
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className='text-center lg:mt-3 lg:flex  items-center justify-center lg:space-x-3'>
                            <p className='text-purple-300 text-2xl font-thin'>Buy Now Price </p>
                            <p className='text-purple-500 text-2xl'>{listing.buyoutCurrencyValuePerToken.displayValue} {listing.buyoutCurrencyValuePerToken.symbol}</p>
                        </div>
                        
                        <div className='lg:pb-5 pb-3'>
                            <button className='bg-purple-300 hover:bg-purple-400 transition-all duration-100 ease-in flex items-center justify-center space-x-2 px-5 py-2 rounded-sm  text-[#1a1a1a] font-semibold'>
                                <RiMoneyDollarCircleFill/>
                                <p>Buy Now</p>
                            </button>
                        </div>

                        
                        <div className='text-purple-300 text-2xl w-full font-thin flex flex-col space-y-3 l justify-center items-center'>
                            <p>{listing.type===0 ? "Make an offer":"Place a bid"}</p>
                            <input type="number" step={0.0001} placeholder="Enter amount in ETH" className='bg-transparent text-base px-2 py-2 border border-gray-600 w-full focus:outline-none max-w-[200px]'/>
                            {listing.type === ListingType.Auction &&
                            <p className='text-purple-500 text-base text-center'>
                                NOTE: The bid price must be higher than the last bid.
                            </p>
                            }
                        </div>
                        <div>
                            <button className='bg-purple-300  hover:bg-purple-400 transition-all duration-100 ease-in flex items-center justify-center space-x-2 px-5 py-2 rounded-sm  text-[#1a1a1a] font-semibold text-base' onClick={createBidOrOffer}>
                                {listing.type===0?<RiMoneyDollarCircleFill/>:<RiAuctionFill/>}
                                <p>{listing.type===0?"Make an offer":"Place a bid"}</p>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-12'>
                        <div>
                        <div className='lg:flex lg:items-center lg:justify-between'>
                            <div className='text-purple-300 text-4xl text-center font-normal lg:text-start mb-8 lg:block hidden '>
                                {listing.asset.name}
                            </div> 
                            <div className='text-purple-300 mb-8 hidden lg:flex items-center justify-center text-3xl space-x-3'>
                                <div className='cursor-pointer hover:bg-white/[0.1] p-3 rounded-full transition-all duration-100 ease-in'>
                                    <BsFillShareFill/>
                                </div>
                                <div className='cursor-pointer hover:bg-white/[0.1] p-3 rounded-full transition-all duration-100 ease-in'>
                                    <BsFillBookmarkFill/>
                                </div>
                                <div className='cursor-pointer hover:bg-white/[0.1] p-3 rounded-full transition-all duration-100 ease-in'>
                                    <BsTwitter/>
                                </div>
                                <div className='cursor-pointer hover:bg-white/[0.1] p-3 rounded-full transition-all duration-100 ease-in'>
                                    <FaEthereum/>
                                </div>
                            </div>
                        </div>
                        <div className='text-purple-300 font-thin text-3xl text-center lg:text-start  mb-5'>
                            Attributes
                        </div>
                        <div>
                            {!listing?.asset?.attributes && 
                            <div className='text-2xl text-center text-gray-500 font-thin lg:text-start'>
                                There are no attributes for this asset
                            </div>
                            }
                        </div>
                        <div className=' grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 items-center justify-center'>
                            {listing?.asset?.attributes?.length>0 && listing?.asset?.attributes?.map(attribute=>(
                                <div className='flex flex-col items-center justify-center space-y-0 text-center px-5 rounded-sm py-2 border border-purple-300' >
                                    <p className='text-purple-500 font-semibold'>{attribute.trait_type}</p>
                                    <p className='text-purple-300 font-thin text-2xl'>{attribute.value}</p>
                                    <p className='text-purple-700'>{Math.floor(Math.random() * 90)+1}% have this trait.</p>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className='flex flex-col items-center justify-center lg:items-start'>
                            <div className='text-purple-300 font-thin text-3xl text-center lg:text-start mb-3'>
                                Description
                            </div>
                            <p className='text-purple-400 text-center lg:text-start leading-7 max-w-2xl 2xl:max-w-4xl'>
                                {listing.asset.description}
                            </p>
                        </div>
                    <div className='flex items-center justify-between flex-col lg:flex-row space-y-8 lg:space-y-0'>
                    <div className='flex items-center justify-center lg:items-start w-full flex-col space-y-3 '>
                        <div className='text-purple-300 text-3xl font-thin'>
                                Listing Type
                            </div>
                            <div className='text-purple-500 text-xl'>
                                {listing.type===0?"Direct Listing":"Auction"}
                            </div>
                        </div>
                        {listing?.type===1 &&
                        <>
                        <div className='text-center flex flex-col w-full items-center lg:items-start justify-center space-y-3'>
                            <p className='text-purple-300 text-3xl font-thin '>Last Bid</p>
                            <p className='text-purple-500 text-xl'>{minimumNextBid?.displayValue} {listing.buyoutCurrencyValuePerToken.symbol}</p>
                        </div>
                        
                        </>
                        }
                    </div>
                    <div className='flex items-center justify-between flex-col lg:flex-row space-y-8 lg:space-y-0'>
                        <div className='flex items-center justify-center w-full flex-col  space-y-3 lg:items-start'>
                            <div className='text-purple-300 text-3xl font-thin'>
                                Owner
                            </div>
                            <div className='text-purple-500 text-xl'>
                                {listing.sellerAddress.slice(0,10)}...{listing.sellerAddress.slice(33)}
                            </div>
                        </div>
                        {listing?.type===1 &&
                        <>
                        <div className='text-center flex flex-col w-full items-center lg:items-start justify-center space-y-3'>
                            <p className='text-purple-300 text-3xl font-thin '>Time Remaining</p>
                            <p className='text-purple-500 text-xl'>
                                <Countdown date={Number(listing.endTimeInEpochSeconds.toString())*1000}/>
                            </p>
                        </div>
                        
                        </>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
        )}
      </main>
    </div>
  )
}

export default ListingPage
