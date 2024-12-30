import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
// import { CrystalLocation } from '../../lib/types/location';
import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { animated, useSpring } from "@react-spring/three";
import * as THREE from 'three'

// import EarthNightMap from '../../public/assets/textures/8k_earth_daymap_low_saturation.jpg'
import EarthDayMap from '../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../assets/textures/8k_earth_clouds_xsmall.jpg';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
// import { Marker, placeObjectOnPlanet } from './Marker';
import React from 'react';
import volcanoEruptionsCsvData from '../assets/significant-volcano-eruptions.csv?raw'
import Papa from 'papaparse';
import { Marker } from './Marker';

// import fs from "fs";
// const locationData = fs.readFileSync("./data/significant-volcanic-eruptions.csv", "utf8");
// const locationData = fetch("./data/significant-volcanic-eruptions.csv")
const locationJSONData = Papa.parse<{
  "Volcano Explosivity Index (VEI)": string,
  Latitude: string,
  Longitude: string,
  Year: string,
}>(volcanoEruptionsCsvData, {
  delimiter: ",",
  header: true
})

const locationData = locationJSONData.data;

// console.log("locationData", locationData.data[0]);


const AnimatedOrbitControls = animated(OrbitControls) as any;

// const Map: React.FC<
//     {
//       locationData: CrystalLocation[],
//       hoveredLocationId: number,
//       activeLocationId?: number,
//       onLocationHovered: (locationId: number | false) => void,
//       onLocationClicked?: () => void
//     }
//   > = (props) => {
const Map: React.FC = () => {
		const cloudsRef = useRef<THREE.Mesh>(null);
		const radius = 2;

		const [colorMap, normalMap, specularMap, cloudMap] = useLoader(
			TextureLoader,
			[
				EarthDayMap,
				EarthNormalMap,
				EarthSpecularMap,
				EarthCloudsMap,
			]
		);

		useFrame(({ clock }) => {
      if (!cloudsRef.current) return;
			const elapsedTime = clock.elapsedTime / 50;

			cloudsRef.current.rotation.y = elapsedTime;
		});

		// const flatViewAngleStrength = Math.PI / 3;
		// const moveGlobeAsideStrength = 3;

		// const activeLocation = useMemo(() => {
		// 	const activeLocation = locationData.find(
		// 		(d) => d.id === props.activeLocationId
		// 	);

			// if (activeLocation) {
			// 	const activeLocationOnPlanet = placeObjectOnPlanet(
			// 		parseFloat(activeLocation.lat),
			// 		parseFloat(activeLocation.long),
			// 		1
			// 	);
			// 	const activeLocationAngleOnEquator =
			// 		activeLocationOnPlanet.rotation[1] + Math.PI / 2;
			// 	const flatViewAngle =
			// 		activeLocationAngleOnEquator - flatViewAngleStrength;

			// 	const offsetTargetToMoveGlobeAside = [
			// 		activeLocationOnPlanet.position[0] * moveGlobeAsideStrength,
			// 		activeLocationOnPlanet.position[1], // only move globe aside horizontally
			// 		activeLocationOnPlanet.position[2] * moveGlobeAsideStrength,
			// 	];
			// 	return {
			// 		flatViewAngle,
			// 		offsetTargetToMoveGlobeAside,
			// 	};
			// }
		// }, [locationData, props.activeLocationId]);

		const [transitioningAway, setTransitioningAway] = useState(false);

		// useLayoutEffect(() => {
		// 	if (props.activeLocationId === undefined) {
		// 		// force-animate to certain angle and distance
		// 		// before resetting to normal unconstrained view mode
		// 		// (see values below)
		// 		setTransitioningAway(true);
		// 		setTimeout(() => {
		// 			setTransitioningAway(false);
		// 		}, 500);
		// 	}
		// }, [props.activeLocationId]);

		// const { minDistance, maxDistance, target, animForcedAzimuthAngle } =
		// 	useSpring<{
		// 		minDistance: number;
		// 		maxDistance: number;
		// 		target: [number, number, number];
		// 		animForcedAzimuthAngle?: number;
		// 	}>(
		// 		activeLocation
		// 			? {
		// 					minDistance: 2.5,
		// 					maxDistance: 2.5,
		// 					animForcedAzimuthAngle: activeLocation.flatViewAngle,
		// 					target: activeLocation.offsetTargetToMoveGlobeAside,
		// 			  }
		// 			: // force-animate to certain angle and distance
		// 			// before resetting to normal unconstrained view mode
		// 			transitioningAway
		// 			? {
		// 					minDistance: 5,
		// 					maxDistance: 5,
		// 					animForcedAzimuthAngle: Math.PI / 2, // look straight at globe again
		// 					target: [0, 0, 0],
		// 			  }
		// 			: // normal view mode
		// 			  {
		// 					minDistance: 1,
		// 					maxDistance: 10,
		// 					animForcedAzimuthAngle: undefined,
		// 					target: [0, 0, 0] as const,
		// 			  }
		// 	);

		// React spring doesn't seem to handle undefined values well
		// So in normal view mode we explicitly set these to undefined
		// to allow free globe rotation
		// const forcedAzimuthAngle =
		// 	activeLocation || transitioningAway ? animForcedAzimuthAngle : undefined;

		return (
			<>
				<ambientLight intensity={0.75} />
				<Stars
					radius={300}
					depth={60}
					count={20000}
					factor={7}
					saturation={0}
					fade={true}
				/>
				<mesh ref={cloudsRef}>
					<sphereGeometry args={[radius + 0.01, 32, 32]} />
					<meshPhongMaterial
						map={cloudMap}
						opacity={0.15}
						depthWrite={true}
						transparent={true}
						side={THREE.DoubleSide}
					/>
				</mesh>
				<group>
					{/* <PerspectiveCamera makeDefault position={[2, 0, 5]} /> */}
					<PerspectiveCamera makeDefault position={[2, 0, 5]} />
					{locationData.map((location, i) => {
						return (
							<Marker
								key={i}
								markerId={i}
								radius={radius}
								coord={{
									lat: parseFloat(location.Latitude),
									lon: parseFloat(location.Longitude),
								}}
								locationLabel={location}
							/>
						);
					})}
					<mesh>
						<sphereGeometry args={[radius, 32, 32]} />
						<meshPhongMaterial specularMap={specularMap} />
						<meshStandardMaterial map={colorMap} normalMap={normalMap} />
					</mesh>
				</group>
				<AnimatedOrbitControls
					enableZoom={true}
					enablePan={false}
					// enableRotate={!activeLocation}
					enableRotate={true}
					zoomSpeed={0.6}
					panSpeed={0.5}
					rotateSpeed={1}
					minPolarAngle={Math.PI / 3}
					maxPolarAngle={Math.PI / 3}
					minDistance={0}
					maxDistance={100}
				/>
			</>
		);
}

export default Map