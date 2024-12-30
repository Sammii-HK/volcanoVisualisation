import './App.css'
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Map from './components/Map.tsx';

function App() {

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Map />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
