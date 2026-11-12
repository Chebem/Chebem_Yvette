import { useEffect, useRef } from 'react';
import { Map, Marker, setWorkerUrl } from 'maplibre-gl';
import * as turf from '@turf/turf';
import lottie from 'lottie-web';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import planeAnimation from './plane.json';
import './Journeymap.css';

setWorkerUrl(workerUrl);

const NIGERIA = [3.3792, 6.5244];
const KOREA   = [127.7669, 37.8813];

export default function JourneyMap() {
    const mapContainer = useRef(null);
    const mapRef       = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        // The plane loop reschedules itself, so unmount has to be able to stop it
        let cancelled = false;
        let timeoutId = null;
        let rafId = null;
        let themeObserver = null;

        const map = new Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/globe.json',
            center: [65, 22],
            zoom: 0.8,
            projection: { type: 'globe' },
            attributionControl: false,
            interactive: false,
        });

        mapRef.current = map;

        map.on('load', () => {
            if (cancelled) return;
            map.resize();
            // ── Great-circle arc ──
            const origin      = turf.point(NIGERIA);
            const destination = turf.point(KOREA);
            const greatCircle = turf.greatCircle(origin, destination, { npoints: 100 });
            const coords      = greatCircle.geometry.coordinates;

            map.addSource('flight-path', { type: 'geojson', data: greatCircle });

            map.addLayer({
                id: 'flight-glow',
                type: 'line',
                source: 'flight-path',
                paint: { 'line-color': '#8b5cf6', 'line-width': 6, 'line-opacity': 0.2, 'line-blur': 4 },
            });

            map.addLayer({
                id: 'flight-trail',
                type: 'line',
                source: 'flight-path',
                paint: { 'line-color': '#8b5cf6', 'line-width': 2, 'line-dasharray': [3, 3], 'line-opacity': 0.9 },
            });

            // ── Lottie plane marker ──
            const planeEl = document.createElement('div');
            planeEl.style.width = '60px';
            planeEl.style.height = '60px';

            lottie.loadAnimation({
                container: planeEl,
                animationData: planeAnimation,
                renderer: 'svg',
                loop: true,
                autoplay: true,
            });

            const planeMarker = new Marker({
                element: planeEl,
                anchor: 'center'
            })
                .setLngLat(NIGERIA)
                .addTo(map);

            // ── Animate plane + camera ──
            let counter = 0;
            const steps = coords.length - 1;

            const animate = () => {
                if (cancelled) return;

                if (counter >= steps) {
                    map.flyTo({
                        center: [65, 22],
                        zoom: 0.8,
                        duration: 2000,
                        easing: t => t * (2 - t) });
                    timeoutId = setTimeout(() => {
                        counter = 0;
                        animate();
                        }, 3000);
                    return;
                }

                const currentCoord = coords[counter];

                planeMarker.setLngLat(currentCoord);

                const progress = counter / steps;
                const zoom = progress < 0.1
                    ? 2 + progress * 5
                    : progress > 0.9
                        ? 2 + (progress - 0.9) * 10
                        : 1.5;

                map.easeTo({
                    center: currentCoord, zoom,
                    bearing: 0,
                    duration: 40,
                    easing: t => t
                });

                counter++;
                timeoutId = setTimeout(() => {
                    rafId = requestAnimationFrame(animate);
                }, 60);
            };

            animate();

            // ── Pin markers ──
            const makePin = (flag, label) => {
                const el = document.createElement('div');
                el.className = 'journey-pin';
                el.innerHTML = `
                    <div class="journey-pin-dot"></div>
                    <div class="journey-pin-pulse"></div>
                    <span class="journey-pin-label">${flag} ${label}</span>
                `;
                return el;
            };

            new Marker({ element: makePin('🇳🇬', 'Nigeria') }).setLngLat(NIGERIA).addTo(map);
            new Marker({ element: makePin('🇰🇷', 'South Korea') }).setLngLat(KOREA).addTo(map);

            // ── Theme observer ──
            const applyTheme = () => {
                const dark = document.documentElement.getAttribute('data-theme') === 'dark';
                try {
                    if (dark) {
                        map.setPaintProperty('background', 'background-color', '#0F0E13');
                        map.setPaintProperty('countries-fill', 'fill-color', '#161424');
                        map.setPaintProperty('countries-boundary', 'line-color', '#2a2840');
                        map.setPaintProperty('coastline', 'line-color', '#2a2840');
                        map.setPaintProperty('geolines', 'line-opacity', 0);
                        map.setPaintProperty('geolines-label', 'text-opacity', 0);
                        map.setPaintProperty('countries-label', 'text-color', '#9CA3AF');
                    } else {
                        map.setPaintProperty('background', 'background-color', '#D8F2FF');
                        map.setPaintProperty('countries-fill', 'fill-color', '#B8D4E8');
                        map.setPaintProperty('countries-boundary', 'line-color', '#FFFFFF');
                        map.setPaintProperty('coastline', 'line-color', '#198EC8');
                        map.setPaintProperty('geolines', 'line-opacity', 0.5);
                        map.setPaintProperty('geolines-label', 'text-opacity', 1);
                        map.setPaintProperty('countries-label', 'text-color', '#1a1a2e');
                    }
                } catch(e) {
                    console.warn('Map theme error:', e);
                }
            };
          applyTheme();

            // Re-apply when the Header flips data-theme, otherwise the globe
            // keeps the old palette until a reload
            themeObserver = new MutationObserver(applyTheme);
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme'],
            });
        });

        return () => {
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
            if (rafId) cancelAnimationFrame(rafId);
            themeObserver?.disconnect();
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div className="journey-map-container">
            <div ref={mapContainer} className="journey-map" />
        </div>
    );
}