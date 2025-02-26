"use client"

import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("./scene3d"), { ssr: false })

export default function Scene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} className="bg-background">
      <Scene3D />
    </div>
  )
}

