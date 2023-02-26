import {React  , useState} from 'react'
import Head from 'next/head'
import { Toaster ,toast } from 'react-hot-toast'
import Header from '../components/Header'
import { useAddress,
     useContract,
     MediaRenderer,
     useNetwork,
     useNetworkMismatch,
     useOwnedNFTs,
     useCreateAuctionListing,
     useCreateDirectListing,
     ChainId,
     } from '@thirdweb-dev/react'
     import { NATIVE_TOKENS , NATIVE_TOKEN_ADDRESS  } from '@thirdweb-dev/sdk'
import { useRouter } from 'next/router'
const createListing = () => {
    const address = useAddress();
    const router = useRouter()
    const { contract } =useContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT , "marketplace");
    const { contract:collection } =useContract(process.env.NEXT_PUBLIC_COLLECTION_CONTRACT , "nft-collection");
    const  ownedNFTs = useOwnedNFTs(collection , address);
    const [selectedNFT , setSelectedNFT] = useState()
    const networkMismatch = useNetworkMismatch();
    const [ ,switchNetwork ] = useNetwork()
    const { 
        mutate :createDirectListing,
        isLoading,
        error
    } = useCreateDirectListing(contract)
    const { 
        mutate :createAuctionListing,
        isLoading:isLoadingAuction,
        error:errorAuction
    } = useCreateAuctionListing(contract)
    const handleCreateListing = async(e)=>{
        e.preventDefault();
        if(networkMismatch){
            switchNetwork && switchNetwork(ChainId.Goerli)
            return;
        }

        if(!selectedNFT) return;

        const {listingType, price} = e.target;
        if(price.value <= 0){
            toast('Please enter a valid price value.',
                        {
                        icon: '😵',
                        style: {
                            borderRadius: '3px',
                            background: '#ff0000',
                            border:"1px solid #ff0000",
                            color: '#ffffff',
                        },
                        }
            );
            return;
        }
        if(listingType.value === "directListing"){
            createDirectListing({
                assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
                tokenId:selectedNFT.metadata.id,
                currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                quantity: 1,
                listingDurationInSeconds: 60 * 60 * 24 * 365,
                buyoutPricePerToken: price.value,
                startTimestamp: new Date(),
            },{
                onSuccess(data, variables, context){
                    console.log('SUCESS:' , data, variables, context)
                    toast('Item listed Successfully!',
                        {
                        icon: '😄',
                        style: {
                            borderRadius: '3px',
                            background: '#00b359',
                            border:"1px solid #00b359",
                            color: '#ffffff',
                        },
                        }
                    );
                    router.push('/')
                },
                onError(data, variables, context){
                    console.log('failed:' , data, variables, context)
                    toast('OOPS! Could not list item.',
                        {
                        icon: '😵',
                        style: {
                            borderRadius: '3px',
                            background: '#ff0000',
                            border:"1px solid #ff0000",
                            color: '#ffffff',
                        },
                        }
                    );
                }
            })
        }
        if(listingType.value === "auctionListing"){
            createAuctionListing({
                assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
                tokenId:selectedNFT.metadata.id,
                currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                quantity: 1,
                listingDurationInSeconds: 60 * 60 * 24 * 365,
                buyoutPricePerToken: price.value,
                startTimestamp: new Date(),
                reservePricePerToken: 0,
            },{
                onSuccess(data, variables, context){
                    console.log('SUCESS:' , data, variables, context)
                    toast('Item listed Successfully!',
                        {
                        icon: '😄',
                        style: {
                            borderRadius: '3px',
                            background: '#00b359',
                            border:"1px solid #00b359",
                            color: '#ffffff',
                        },
                        }
                    );
                    router.push('/')
                },
                onError(data, variables, context){
                    console.log('failed:' , data, variables, context)
                    toast('OOPS! Could not list item.',
                        {
                        icon: '😵',
                        style: {
                            borderRadius: '3px',
                            background: '#ff0000',
                            border:"1px solid #ff0000",
                            color: '#ffffff',
                        },
                        }
                    );
                }
            })
        }
    }
  return (
    <>
    <Head>
        <title>Create Listing - The underworld</title>
    </Head>
    <div className='bg-[#1a1a1a] h-full w-full min-h-screen'>
      <Header/>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <main className='flex flex-col justify-center items-center py-5 px-5'>
        <h2 className='text-purple-300 font-thin text-3xl bg-gray-900'>List an Item</h2>
        <p className='text-gray-500 text-center mt-3 mb-5'>Below are the NFTs owned by your wallet address. Select an item to list in the marketplace.</p>
        {!ownedNFTs?(
            <div>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
               <div className="border-t-transparent border-solid animate-spin rounded-full border-purple-400 border-2 h-16 w-16"></div>
           </div>
           </div>
        ):<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5'>
            {ownedNFTs?.data?.length == 0 && <div className='text-gray-500 text-xl text-center'>Your wallet does not have any NFTs in the collection. To list an NFT you have to mint it into your wallet first.</div>}

            {ownedNFTs?.data?.length>0 && ownedNFTs?.data?.map(nft =>(
                <div key={nft.metadata.id} className={`${nft.metadata.id===selectedNFT?.metadata?.id ? "border-purple-300 border":""} hover:bg-[#1a0033] transition-all ease-in duration-100 cursor-pointer px-3 pb-2 rounded-sm`} onClick={()=> setSelectedNFT(nft)}>
                    <MediaRenderer hright={700} width={700} src={nft.metadata.image} className="rounded-sm"/>
                    <div className={` text-purple-300 text-center text-2xl mt-2`}>{nft.metadata.name}</div>
                </div>
            ))}
        </div>}
        {selectedNFT && (
                <form className='w-full' onSubmit={handleCreateListing}>
                    <div className='flex flex-col space-y-3 py-5 w-full'>
                        <div className='flex flex-col w-full space-y-3 items-start justify-start '>
                            <label className='text-purple-300 font-semibold mb-2 text-3xl text-center w-full '>Listing type</label>
                            <div className='flex w-full  items-center justify-around '>
                            <div className='flex space-x-3 items-center justify-center'>
                                <label className='text-purple-300 text-xl'>Direct Listing</label>
                                <input type="radio" name="listingType" value="directListing"  className='ml-auto h-6 w-6'/>
                            </div>
                            <div className='flex space-x-3 items-center justify-center'>
                                <label className='text-purple-300 text-xl'>Auction</label>
                                <input type="radio" name="listingType" value="auctionListing" className='ml-auto h-6 w-6' />
                            </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center space-y-3'>
                            <label className='text-purple-300 text-center mt-5 mb-2 text-3xl font-semibold'>Price</label>
                            <input type="number" step={0.0001} className='w-full placeholder:text-gray-600 rounded-sm bg-transparent border-gray-600 text-purple-300 border bg-gray-800 py-2 px-3 focus:outline-none max-w-lg' placeholder='Enter price in ETH' name='price'/>
                            <p className='text-gray-500 max-w-3xl text-center'>NOTE: In case of an <italic className = "italic underline underline-offset-2">Auction Listing</italic>, the price you set will be the price cap for the item. That means, if someone wants to skip the whole auction process and buy the item right away, they can pay this amount to do so. Also the maximum bid in the auction can reach upto this price.</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <button type="submit" className='bg-purple-300 hover:bg-purple-400 transition-all duration-100 ease-in px-5 py-2 rounded-sm font-semibold text-[#1a1a1a]'>
                            {(isLoading || isLoadingAuction)?"Listing Item..." : "Create Listing"}
                        </button>
                    </div>
                </form>
            )}
      </main>
    </div>
    </>
  )
}

export default createListing
