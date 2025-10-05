import dynamic from 'next/dynamic';

const SinWave2 = dynamic(() => import('../components/SinWave2'), { ssr: false });


const page = () => {
  return (
    <div className='w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden'>
        <SinWave2 />
        
    </div>
  )
}

export default page