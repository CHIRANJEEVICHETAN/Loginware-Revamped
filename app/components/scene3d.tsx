"use client"

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, PerspectiveCamera, SpotLight, useAnimations } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState, useMemo } from "react"
import { useScroll } from "framer-motion"
import * as THREE from "three"
import { gsap } from "gsap"

interface ModelProps {
  url: string
  position: [number, number, number]
  scale: [number, number, number]
  rotation: [number, number, number]
}

function Model({ url, position, scale, rotation }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [originalPosition] = useState(position)
  const spotlightRef = useRef<THREE.SpotLight>(null)

  const clonedScene = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action?.play())
    }
  }, [actions])

  useFrame((state) => {
    if (!dragging && group.current) {
      group.current.rotation.y += 0.005
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1
    }

    if (spotlightRef.current && hovered) {
      spotlightRef.current.position.x = state.pointer.x * 5
      spotlightRef.current.position.y = state.pointer.y * 5 + 5
      spotlightRef.current.position.z = -5
    }
  })

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setDragging(true)
    const element = e.nativeEvent.target as HTMLElement
    element.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setDragging(false)
    const element = e.nativeEvent.target as HTMLElement
    element.releasePointerCapture(e.pointerId)

    if (group.current) {
      gsap.to(group.current.position, {
        x: originalPosition[0],
        y: originalPosition[1],
        z: originalPosition[2],
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      })
    }
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (dragging && group.current) {
      const movementSpeed = 0.01
      group.current.position.x += e.movementX * movementSpeed
      group.current.position.y -= e.movementY * movementSpeed
    }
  }

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <primitive object={clonedScene} />
      {hovered && (
        <SpotLight
          ref={spotlightRef}
          distance={20}
          angle={0.15}
          attenuation={5}
          anglePower={5}
          intensity={2}
          color="#3b82f6"
        />
      )}
    </group>
  )
}

function Scene() {
  const { scrollYProgress } = useScroll()
  const groupRef = useRef<THREE.Group>(null)
  const [radius] = useState(6)
  const [rotationSpeed] = useState(0.4)

  // Enhanced grid pattern
  const gridMaterial = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256 // Increased resolution
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 256, 256)
      
      // Create gradient for lines
      const gradient = ctx.createLinearGradient(0, 0, 256, 256)
      gradient.addColorStop(0, '#60a5fa')
      gradient.addColorStop(1, '#3b82f6')
      
      ctx.strokeStyle = gradient
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 0.1
      
      // Draw more detailed grid
      for (let x = 16; x < 256; x += 16) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 256)
        ctx.stroke()
      }
      
      for (let y = 16; y < 256; y += 16) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(256, y)
        ctx.stroke()
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(100, 100)
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.15,
      color: '#60a5fa',
      blending: THREE.AdditiveBlending
    })
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scrollYProgress.get() * 5
      const time = state.clock.getElapsedTime()
      const angle1 = time * rotationSpeed
      const angle2 = time * rotationSpeed + Math.PI

      // Enhanced floating motion
      const floatY = Math.sin(time * 0.5) * 0.8
      const floatX = Math.cos(time * 0.3) * 0.2
      groupRef.current.position.y = scrollOffset + floatY
      groupRef.current.position.x = floatX
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.15

      // Update model positions with smoother motion
      if (groupRef.current.children[0]) {
        const child1 = groupRef.current.children[0]
        child1.position.x = Math.cos(angle1) * radius
        child1.position.z = Math.sin(angle1) * radius
        child1.position.y = Math.sin(time * 0.7) * 0.3
        child1.rotation.y = angle1 + Math.PI / 2
      }
      
      if (groupRef.current.children[1]) {
        const child2 = groupRef.current.children[1]
        child2.position.x = Math.cos(angle2) * radius
        child2.position.z = Math.sin(angle2) * radius
        child2.position.y = Math.sin(time * 0.7 + Math.PI) * 0.3
        child2.rotation.y = angle2 + Math.PI / 2
      }
    }
  })

  return (
    <>
      {/* Enhanced background elements */}
      <mesh position={[0, 0, -15]} scale={[150, 150, 1]}>
        <planeGeometry />
        <primitive object={gridMaterial} attach="material" />
      </mesh>

      {/* Add atmospheric particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 20
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <group ref={groupRef}>
        <Model 
          url="/Models/Eagle-model.glb" 
          position={[radius, 0, 0]} 
          scale={[3, 3, 3]}
          rotation={[0, Math.PI / 2, 0]} 
        />
        <Model 
          url="/Models/Sparrow-model.glb" 
          position={[-radius, 0, 0]} 
          scale={[3, 3, 3]}
          rotation={[0, -Math.PI / 2, 0]} 
        />
      </group>
    </>
  )
}

export default function SceneWrapper() {
  return (
    <div className="relative w-full h-full">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-blue-900/10 to-blue-900/15 pointer-events-none z-10" />
      
      <Canvas className="fixed inset-0 bg-gradient-to-b from-blue-50/20 to-white/20">
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <Suspense fallback={null}>
          <fog attach="fog" args={['#f8fafc', 0, 100]} />
          <Environment preset="warehouse" />
          
          {/* Enhanced lighting setup */}
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.7}
            color="#3b82f6"
          />
          <directionalLight 
            position={[-10, -10, -5]} 
            intensity={0.5}
            color="#60a5fa"
          />
          <ambientLight intensity={0.6} color="#bfdbfe" />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#93c5fd" />
          
          {/* Enhanced volumetric effect */}
          <mesh position={[0, 0, -5]} scale={[80, 80, 1]}>
            <planeGeometry />
            <meshBasicMaterial 
              color="#bfdbfe"
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          <Scene />
          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload("/Models/Eagle-model.glb")
useGLTF.preload("/Models/Sparrow-model.glb")

