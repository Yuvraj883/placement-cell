import JobPostings from "../components/JobPostings";
import Navbar from "../components/Navbar";

const Home = ()=>{
  return(
    <>
   <Navbar/>
   <div className="flex flex-col items-center justify-center w-screen">
   <JobPostings/>

   </div>

    </>
  )
}
export default Home;
