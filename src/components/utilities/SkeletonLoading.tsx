import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonModel {
   amount: number;
}

const SkeletonLoading = ({ amount }: SkeletonModel) => {
   const numCards = Array(amount).fill(1);
   return (
      <>
         {numCards.map((_card, i) => (
            <div
               key={i}
               className="bg-[#29292b] h-44 flex flex-col items-center gap-y-4 rounded-lg p-4 text-center  "
            >
               <header>
                  <Skeleton
                     circle
                     width={60}
                     height={60}
                     baseColor="#313131"
                     highlightColor="#525252"
                  />
               </header>
               <section className="flex justify-center gap-x-4 w-full mt-auto">
                  <div className="w-2/4 ">
                     <Skeleton
                        baseColor="#313131"
                        highlightColor="#525252"
                     />
                  </div>
                  <div className="inline-flex gap-x-2">
                     <Skeleton
                        circle
                        width={20}
                        height={20}
                        baseColor="#313131"
                        highlightColor="#525252"
                     />
                     <Skeleton
                        circle
                        width={20}
                        height={20}
                        baseColor="#313131"
                        highlightColor="#525252"
                     />
                  </div>
               </section>
            </div>
         ))}
      </>
   );
};

export default SkeletonLoading;
