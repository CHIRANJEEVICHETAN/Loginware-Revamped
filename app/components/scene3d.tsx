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
  const [radius] = useState(6) // Radius of the circular path
  const [rotationSpeed] = useState(0.4) // Speed of rotation

  useFrame((state) => {
    if (groupRef.current) {
      // Update vertical position based on scroll
      const scrollOffset = scrollYProgress.get() * 5
      
      // Calculate circular motion
      const time = state.clock.getElapsedTime()
      const angle1 = time * rotationSpeed
      const angle2 = time * rotationSpeed + Math.PI // Opposite side of the circle
      
      // Update models' positions
      if (groupRef.current.children[0]) {
        groupRef.current.children[0].position.x = Math.cos(angle1) * radius
        groupRef.current.children[0].position.z = Math.sin(angle1) * radius
        groupRef.current.children[0].rotation.y = angle1 + Math.PI / 2
      }
      
      if (groupRef.current.children[1]) {
        groupRef.current.children[1].position.x = Math.cos(angle2) * radius
        groupRef.current.children[1].position.z = Math.sin(angle2) * radius
        groupRef.current.children[1].rotation.y = angle2 + Math.PI / 2
      }

      // Update group's vertical position
      groupRef.current.position.y = scrollOffset
    }
  })

  return (
    <group ref={groupRef}>
      <Model 
        url="/Models/Eagle-model.glb" 
        position={[radius, 0, 0]} 
        scale={[3, 3, 3]} // Increased size
        rotation={[0, Math.PI / 2, 0]} 
      />
      <Model 
        url="/Models/Sparrow-model.glb" 
        position={[-radius, 0, 0]} 
        scale={[3, 3, 3]} // Increased size
        rotation={[0, -Math.PI / 2, 0]} 
      />
    </group>
  )
}

export default function SceneWrapper() {
  return (
    <Canvas className="fixed inset-0">
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} /> {/* Moved camera back */}
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Scene />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
          enablePan={false}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload("/Models/Eagle-model.glb")
useGLTF.preload("/Models/Sparrow-model.glb")

