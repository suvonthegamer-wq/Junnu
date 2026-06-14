import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  const options: ISourceOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#FFCDD2", "#FFD700", "#FFFFFF", "#F8BBD0"],
      },
      links: {
        enable: false,
      },
      move: {
        direction: "bottom-right",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: { min: 0.5, max: 1.5 },
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 100,
      },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "heart", "star"],
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
    fullScreen: {
      enable: true,
      zIndex: -1,
    }
  };

  return (
    <Particles
      id="tsparticles"
      options={options}
    />
  );
}
