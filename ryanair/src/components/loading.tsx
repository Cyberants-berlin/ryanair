import React from 'react'
import SkeletonCard from './SkeletonCard'

export default function loading() {
    return (
      <main>
        <div className="grid grid-cols-3 gap-8">
          {abefecsfh.split("").map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    );
}
