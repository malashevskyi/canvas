import { Fragment } from 'react';

function article(link) {
  return  <Fragment>
    <div className="title">Credits:</div>
    <div className="inner">
      Inspired by the&nbsp;<a target="_blank" rel="noreferrer" href={link} >article</a> .
    </div>
  </Fragment>
}
function video(link) {
  return  <Fragment>
    <div className="title">Credits:</div>
    <div className="inner">
      Inspired by the&nbsp;<a target="_blank" rel="noreferrer" href={link} >video</a> .
    </div>
  </Fragment>
}
function description(desc) {
  return  <Fragment>
    <div className="inner">
      {desc}
    </div>
  </Fragment>
}

export const Firework = () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s");
export const ParticlesMoveInACircle = () => video("https://www.youtube.com/watch?v=D_BPilf_F8k");
export const Balls = () => video("https://www.youtube.com/watch?v=yq2au9EfeRQ&t=415s");
export const StarrySky = () => '';
export const StainedGlass = () => description("I named it Stained Glass 🤦‍♂️, but my nephews say it's minecraft.");
export const Necklace = () => '';
export const Jelly = () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w");
export const Jelly_2 = () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w");
export const ParticlesInMouseDirection = () => video("https://www.youtube.com/watch?v=LHzgW9aQUV8&t=74s");
export const Festoon = () => '';
export const Festoon_2 = () => '';
export const Bouquet = () => '';
export const CircleOrnament = () => '';
export const Orbit = () => '';
export const Orbit_2 = () => '';
export const ScatterBalls = () => '';
export const SwirlOfSquares = () => '';
export const ParticlesSun = () => '';
export const BurstOfParticles = () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s");
export const BurstOfParticles_2 = () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s");
export const TunnelOfParticles = () => video("https://www.youtube.com/watch?v=5MUsKgU6i0I");
export const BigCirclesJelly = () => '';
export const HeartPulse = () => '';
export const HeartTriangulation = () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg");
export const Main = () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg");
export const DrawWaves = () => '';
export const MoveCircleTrail = () => article("https://www.kirupa.com/canvas/creating_motion_trails.htm");
