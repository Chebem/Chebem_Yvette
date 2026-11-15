import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

// Register plugins once; import gsap from this file everywhere new
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

export { gsap, ScrollTrigger, Flip, useGSAP };
