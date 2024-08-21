import { TiMessages } from "react-icons/ti";

const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <div className="px-4 text-venter sm:text-lg md:text-xl text-green-200 fonst-semibold flex flex-col items-center gap-2">
            <p>Welcome 🏰 John Doe</p>
            <p>Choose a friend to start messaging!</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
        
    </div>
  )
}

export default NoChatSelected