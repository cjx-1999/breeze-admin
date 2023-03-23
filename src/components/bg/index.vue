<template>
    <div>
        <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
            :options="options" />
    </div>
</template>
<script setup lang="ts">
import { loadFull } from "tsparticles";
const particlesInit = async (engine: any) => {
    await loadFull(engine);
};

const particlesLoaded = async (container: any) => {
    //   console.log("Particles container loaded", container);
};
const options = {
    background: {
        color: {
            // value: '#eee'
        }
    },
    fpsLimit: 180,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#60a5fa'
        },
        links: {
            color: '#60a5fa',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 3,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            random: true,
            value: 5
        }
    },
    detectRetina: true
}
</script>