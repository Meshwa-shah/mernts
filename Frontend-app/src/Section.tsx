import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react';
import { Star } from 'lucide-react';
import profile from './assets/profile_img_1.png'
import { MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
const Section: React.FC = () => {
  const naviage: NavigateFunction = useNavigate();
  // function nav(e: MouseEvent<HTMLElement>){
  //      const elem: HTMLElement = e.target as HTMLElement;
  //      const id: string | null = elem.getAttribute('data-id');
  //      console.log(id);
  // }
  return (
    <div className='w-full '>
        <h1 className='text-center text-6xl text-gray-700 font-bold max-sm:text-4xl mt-5'>Powerful AI Tools</h1>
        <p className='text-center text-[20px] text-gray-500 font-bold mt-5 max-md:text-[16px] max-sm:text-[12px]'>Everything you need to create, enhance, and optimize your content with <br/>cutting-edge AI technology.</p>
        <div className='w-full flex justify-center items-center mt-[5%] gap-16 flex-wrap cursor-pointer' >
           <div  onClick={() => naviage('/Write')} className='bg-white  h-80 w-96 shadow-2xl rounded-2xl p-10 min-w-80 max-sm:w-80 hover:-translate-y-1 transition'>
           <div className='bg-blue-500 inline-block p-4 rounded-2xl '><SquarePen color='white'/></div>
           <p className='text-2xl font-bold mt-7'>AI Article Writer</p>
           <p className='font-bold mt-6 text-gray-400'>Generate high-quality, 
            engaging articles on any topic with our AI writing technology.</p>
           </div>
           <div  onClick={() => naviage('/Titles')} className='bg-white  h-80 w-96 shadow-2xl rounded-2xl p-10 min-w-80 max-sm:w-80 hover:-translate-y-1 transition'>
            <div className='bg-fuchsia-600 inline-block p-4 rounded-2xl'><Hash color='white'/></div>
           <p className='text-2xl font-bold mt-7'>Blog Title Generator</p>
           <p className='font-bold mt-6 text-gray-400'>Find the perfect, catchy title for your blog posts with our AI-powered generator.
           </p>
           </div>
           <div onClick={() => naviage('/Images')} className='bg-white h-80 w-96 shadow-2xl rounded-2xl p-10 min-w-80 max-sm:w-80 hover:-translate-y-1 transition'>
           <div className='bg-emerald-500 inline-block p-4 rounded-2xl'><Image color='white'/></div>
           <p className='text-2xl font-bold mt-7'>AI Image Generation</p>
           <p className='font-bold mt-6 text-gray-400'>Create stunning visuals
             with our AI image generation tool, Experience the power of AI</p>
           </div>
        </div>
        <div className='w-full flex justify-center items-center mt-[4%] gap-16 flex-wrap max-lg:mt-[10%] cursor-pointer'>
           <div  onClick={() => naviage('/Background')} className='bg-white  h-80  w-96 shadow-2xl rounded-2xl p-10 min-w-80 max-sm:w-80 hover:-translate-y-1 transition'>
           <div className='bg-orange-400 inline-block p-4 rounded-2xl '><Eraser color='white'/></div>
           <p className='text-2xl font-bold mt-7'>Background Removal</p>
           <p className='font-bold mt-6 text-gray-400'>Effortlessly remove backgrounds from your images with our AI-driven tool..</p>
           </div>
           <div   onClick={() => naviage('/Object')} className='bg-white  h-80  w-96 shadow-2xl rounded-2xl p-10 min-w-80 max-sm:w-80 hover:-translate-y-1 transition'>
            <div className='bg-blue-400 inline-block p-4 rounded-2xl'><Scissors color='white'/></div>
           <p className='text-2xl font-bold mt-7'>Object Removal</p>
           <p className='font-bold mt-6 text-gray-400'>Remove unwanted objects from your images seamlessly with our AI object removal tool.
           </p>
           </div>
           <div  onClick={() => naviage('/Resume')} className='bg-white  h-80 w-96 shadow-2xl rounded-2xl p-10 min-w-80 max-sm:w-80 hover:-translate-y-1 transition'>
           <div className='bg-emerald-300 inline-block p-4 rounded-2xl'><FileText color='white'/></div>
           <p className='text-2xl font-bold mt-7'>Resume Reviewer</p>
           <p className='font-bold mt-6 text-gray-400'>Get your resume reviewed by AI to improve your chances of landing your dream job.</p>
           </div>

           <div className='w-full mt-28 max-md:mt-10'>
                 <h2 className='text-center text-gray-600 text-6xl font-bold max-md:text-4xl'>Loved by Creators</h2>
                 <p className='text-center text-gray-500 text-[22px] font-bold mt-5 max-sm:text-[15px]'>Don't just take our word for it. Here's what our users are saying.</p>
             </div>
          <div className='w-full mt-14 flex justify-center items-center flex-wrap gap-10'>
          <div className='w-96 h-80 rounded-2xl shadow-2xl max-sm:w-80 hover:-translate-y-1 transition  p-[2.5%] max-sm:h-auto max-sm:p-[3%]'>
            <div className='flex justify-start items-center gap-1.5 max-sm:mt-4' style={{color: '#303F9F'}}>
              <Star fill=''size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} opacity={0.3}/>
            </div>
           
            <p className='mt-6 text-gray-500 font-bold'>
              "ContentAI has revolutionized our content workflow. 
              The quality of the articles is outstanding, and it saves us hours of work every week."
            </p>
             <hr className='w-full h-[0.1px] bg-gray-700 mt-8'/>
             <div className='w-full mt-6 gap-5 flex'>
                 <div className='size-15 rounded-full bg-cover' style={{backgroundImage: `url(${profile})`}}></div>
                 <div className='pt-1'>
                  <p className='font-bold text-[17px]'>John Doe</p>
                  <p className='text-gray-400 font-bold'>Marketing Director, TechCorp</p>
                 </div>
             </div>
          </div>
          <div className='w-96 h-80 rounded-2xl shadow-2xl max-sm:w-80 hover:-translate-y-1 transition  p-[2.5%] max-sm:h-auto max-sm:p-[3%]'>
                  <div className='flex justify-start items-center gap-1.5 max-sm:mt-4' style={{color: '#303F9F'}}>
              <Star fill=''size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18}/>
            </div>
           
            <p className='mt-6 text-gray-500 font-bold'>
              "ContentAI has made our content creation process effortless.
               The AI tools have helped us produce high-quality content faster than ever before"
            </p>
             <hr className='w-full h-[0.1px] bg-gray-700 mt-8'/>
             <div className='w-full mt-6 gap-5 flex'>
                 <div className='size-15 rounded-full bg-cover' style={{backgroundImage: `url(${profile})`}}></div>
                 <div className='pt-1'>
                  <p className='font-bold text-[17px]'>Jane Smith</p>
                  <p className='text-gray-400 font-bold'>Content Creator, TechCorp</p>
                 </div>
             </div>

          </div>
          <div className='w-96 h-80 rounded-2xl shadow-2xl max-sm:w-80 hover:-translate-y-1 transition  p-[2.5%] max-sm:h-auto max-sm:p-[3%]'>
            <div className='flex justify-start items-center gap-1.5 max-sm:mt-4' style={{color: '#303F9F'}}>
              <Star fill=''size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} />
              <Star fill='' size={18} opacity={0.3}/>
            </div>
           
            <p className='mt-6 text-gray-500 font-bold'>
              "ContentAI has transformed our content creation process. 
              The AI tools have helped us produce high-quality content faster than ever before."


            </p>
             <hr className='w-full h-[0.1px] bg-gray-700 mt-8'/>
             <div className='w-full mt-6 gap-5 flex'>
                 <div className='size-15 rounded-full bg-cover' style={{backgroundImage: `url(${profile})`}}></div>
                 <div className='pt-1'>
                  <p className='font-bold text-[17px]'>David Lee</p>
                  <p className='text-gray-400 font-bold'>Content Writer, TechCorp</p>
                 </div>
             </div>
          </div>
          </div>
    </div>
</div>
  )}

export default Section