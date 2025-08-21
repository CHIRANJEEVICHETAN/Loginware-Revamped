"use client"

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, PerspectiveCamera, SpotLight, useAnimations } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState, useMemo } from "react"
import { useScroll } from "framer-motion"
import * as THREE from "three"
import { gsap } from "gsap"

// WebGL support detection
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

// Fallback component when WebGL is not available
function WebGLFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold mb-2">3D Experience Unavailable</h3>
        <p className="text-muted-foreground">
          Your device or browser doesn't support WebGL, which is required for 3D graphics.
        </p>
      </div>
    </div>
  )
}

interface ModelProps {
  url: string
  position: [number, number, number]
  scale: [number, number, number]
  rotation: [number, number, number]
}

function Model({ url, position, scale, rotation }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [originalPosition] = useState(position)
  const [hasError, setHasError] = useState(false)
  const spotlightRef = useRef<THREE.SpotLight>(null)

  // Load GLTF with error handling
  const { scene, animations } = useGLTF(url, true, true, (error) => {
    console.error('Failed to load GLTF model:', error)
    setHasError(true)
  })

  const { actions } = useAnimations(animations, group)

  const clonedScene = useMemo(() => {
    if (hasError) return null
    return scene.clone()
  }, [scene, hasError])

  useEffect(() => {
    if (actions && !hasError) {
      Object.values(actions).forEach((action) => action?.play())
    }
  }, [actions, hasError])

  // If there's an error loading the model, don't render anything
  if (hasError || !clonedScene) {
    return null
  }

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
  const [modelsLoaded, setModelsLoaded] = useState(false)

  useEffect(() => {
    // Set models as loaded after a short delay to ensure they're ready
    const timer = setTimeout(() => setModelsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    if (groupRef.current && modelsLoaded) {
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
  const [webGLAvailable, setWebGLAvailable] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebGLAvailable(isWebGLAvailable())
    }
  }, [])

  if (!webGLAvailable) {
    return <WebGLFallback />
  }

  if (hasError || contextLost) {
    return <WebGLFallback />
  }

  try {
    return (
      <Canvas 
        className="fixed inset-0"
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
          alpha: false
        }}
        onCreated={(state) => {
          // Add error handling for WebGL context
          if (state.gl && state.gl.domElement) {
            state.gl.domElement.addEventListener('webglcontextlost', (event: Event) => {
              event.preventDefault()
              console.warn('WebGL context lost, showing fallback')
              setContextLost(true)
            })
            
            state.gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored')
              setContextLost(false)
            })
          }
        }}
        onError={(error) => {
          console.error('Canvas error:', error)
          setHasError(true)
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
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
  } catch (error) {
    console.error('Error creating Canvas:', error)
    setHasError(true)
    return <WebGLFallback />
  }
}

// Preload models with error handling
try {
  useGLTF.preload("/Models/Eagle-model.glb")
  useGLTF.preload("/Models/Sparrow-model.glb")
} catch (error) {
  console.warn('Failed to preload GLTF models:', error)
}

