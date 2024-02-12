//  import  React  from  "react";
import SkeletonCard from "./SkeletonCard";

export default function Loading() {
  const skeletonCount = 8;

  return (
    <main>
      <div className="grid  grid-cols-4  gap-10  px-10">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </main>
  );
}
