import React from 'react'
import SkeletonCard from './SkeletonCard'

export default function loading() {
    return (
      <main>
        <div className="grid grid-cols-4 gap-10 px-10">
          {abefecsfh.split("").map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    );
}
