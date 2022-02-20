import { Html, useProgress } from '@react-three/drei'
import Loading from "./loading"

export default function Loader({style}) {
  const { progress } = useProgress()
  return <Html center style={style}>
    <Loading type="cylon" color="orange"/>
    <div className='progress'>{Math.round(progress)} % loaded</div>
    </Html>
}

