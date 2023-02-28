import {React  , useState} from 'react'
import Head from 'next/head'
import { Toaster ,toast } from 'react-hot-toast'
import Header from '../components/Header'
import { BsCameraFill } from "react-icons/bs"
import { useAddress, useContract } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
const AddItem = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_COLLECTION_CONTRACT , "nft-collection")
  const address = useAddress();
  const[isUploading, setIsuploading] = useState(false)
  const [preview , setPreview] = useState()
  const router = useRouter()
  const [image , setImage] = useState()
  const mintNft = async(e)=>{
    e.preventDefault();
    if(!contract || !address){
      toast('Please Connect your wallet first.',
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

    if(!image){
      toast('Please upload an image file.',
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

    const target = e.target;

    const metadata = {
      name:target.name.value,
      description:target.description.value,
      image:image
    }

    try{
      setIsuploading(true)
      const tx = await contract.mintTo(address , metadata)

      const receipt = tx.receipt;
      const tokenID = tx.id;
      const nft = await tx.data()

      setIsuploading(false)
      toast('Item minted successfully!',
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


      console.log(receipt , tokenID , nft)

      router.push("/")
    } catch(e){
      console.log(e.message);
      setIsuploading(false)
    }
  }
  return (
    <div className = "bg-[#1a1a1a] h-full w-full min-h-screen">
      <Head>
        <title>Add item - The underworld</title>
      </Head>
      <Header/>
      <main className='py-5 px-5  w-full'>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
        <h1 className='text-purple-300 text-3xl font-thin bg-gray-900 text-center w-full'>Add an item to the Marketplace</h1>
        <p className='text-gray-500 mt-3 text-center '>By adding an item to the marketplace , you&apos;re essentially minting an NFT of the item into your wallet which can then be listed for sale.</p>
        <div className='my-5 flex flex-col md:flex-row md:space-x-10 items-center justify-center'>
          {preview?(
            <img src={preview} className="h-80 w-80 rounded-sm"/>
          ):<div className='h-80 w-80 rounded-sm bg-gray-800 text-5xl flex items-center justify-center text-gray-600'>
            <BsCameraFill/>
          </div>}
          <form onSubmit={mintNft} className='w-full md:w-[50%] my-5 space-y-3 flex flex-col justify-center items-center'>
            <div className='flex flex-col w-full space-y-2 items-center justify-center'>
    
              <input className ="block w-full text-sm text-[#1a1a1a] border  rounded-sm  custom-file-input cursor-pointer  dark:text-gray-600 focus:outline-none dark:border-gray-600 placeholder:text-gray-600" id="file_input" type="file" onChange={(e)=>{
                if(e.target.files?.[0]){
                  setPreview(URL.createObjectURL(e.target.files?.[0]));
                  setImage(e.target.files?.[0]);
                }
              }}/>

            </div>
            <div className='flex flex-col w-full space-y-2 items-start justify-start my-2'>
              <label className='text-purple-300 font-semibold text-lg'>Name of item</label>
              <input type="text" className='w-full placeholder:text-gray-600 rounded-sm bg-transparent border-gray-600 text-purple-300 border bg-gray-800 py-2 px-3 focus:outline-none' placeholder='Enter name' id="name" name="name"/>
            </div>
            <div className='flex flex-col w-full space-y-2 items-start justify-start my-2'>
              <label className='text-purple-300 font-semibold text-lg'>Description</label>
              <textarea className='w-full placeholder:text-gray-600 rounded-sm bg-transparent border-gray-600 border text-purple-300 bg-gray-800 py-2 px-3 focus:outline-none' placeholder='Describe your asset in a few words' rows={5} id="description" name="description"/>
            </div>

            <button type='submit' className='bg-purple-300 hover:bg-purple-400 transition-all ease-in duration-100 text-[#1a1a1a] px-5 py-2 font-semibold mt-3 rounded-sm'>{isUploading?"Minting...":"Add Item"}</button>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default AddItem
