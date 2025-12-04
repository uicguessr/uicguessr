// Real-coordinate Leaflet campus map for UICguessr

class CampusMap {
    constructor() {
        this.mapInstances = {};
        this.markerLayers = {};
        this.defaultView = {
            center: [41.8719, -87.6505],
            zoom: 16
        };
        this.tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        this.tileLayerOptions = {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };
        this.buildingStyles = {
            // Core set
            SCE: { color: '#D32F2F', label: 'SCE' },
            SRF: { color: '#2196F3', label: 'SRF' },
            BSB: { color: '#9C27B0', label: 'BSB' },
            LIB: { color: '#795548', label: 'LIB' },
            SES: { color: '#FF5722', label: 'SES' },
            UH: { color: '#607D8B', label: 'UH' },
            TH: { color: '#3F51B5', label: 'TH' },
            LCA: { color: '#00BCD4', label: 'LCA' },
            ERF: { color: '#4CAF50', label: 'ERF' },
            SCW: { color: '#FF6F00', label: 'SCW' },
            SELE: { color: '#E91E63', label: 'SEL' },
            CADA: { color: '#9C27B0', label: 'CADA' },
            // Expanded set
            ARC: { color: '#C2185B', label: 'ARC' },
            SSB: { color: '#455A64', label: 'SSB' },
            GH: { color: '#8D6E63', label: 'GH' },
            BH: { color: '#6D4C41', label: 'BH' },
            SEO: { color: '#5D4037', label: 'SEO' },
            EIB: { color: '#2E7D32', label: 'EIB' },
            LCB: { color: '#0288D1', label: 'LCB' },
            LCC: { color: '#00796B', label: 'LCC' },
            LCD: { color: '#512DA8', label: 'LCD' },
            LCE: { color: '#303F9F', label: 'LCE' },
            LCF: { color: '#1976D2', label: 'LCF' },
            AH: { color: '#7B1FA2', label: 'AH' },
            PAV: { color: '#D84315', label: 'PAV' },
            AHSB: { color: '#388E3C', label: 'AHSB' },
            SPH: { color: '#0097A7', label: 'SPH' },
            PHARM: { color: '#F57C00', label: 'PHARM' },
            COMRB: { color: '#455A64', label: 'COMRB' },
            CSB: { color: '#9E9D24', label: 'CSB' },
            CSN: { color: '#5C6BC0', label: 'CSN' }
        };
    }

    getBuildingData() {
        return typeof buildings !== 'undefined' ? buildings : {};
    }

    getBuildingStyle(key) {
        return this.buildingStyles[key] || { color: '#546E7A', label: key };
    }

    initializeMap(containerId, interactive) {
        if (typeof L === 'undefined') {
            console.warn('Leaflet is required to render the campus map.');
            return null;
        }

        let map = this.mapInstances[containerId];
        if (!map) {
            map = L.map(containerId, {
                zoomControl: true,
                scrollWheelZoom: interactive,
                dragging: true,
                doubleClickZoom: interactive,
                boxZoom: interactive,
                keyboard: interactive,
                tap: false
            });

            L.tileLayer(this.tileLayerUrl, this.tileLayerOptions).addTo(map);

            this.mapInstances[containerId] = map;
            this.markerLayers[containerId] = L.layerGroup().addTo(map);

            if (!interactive) {
                map.scrollWheelZoom.disable();
                map.doubleClickZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                map.dragging.disable();
            }
        } else {
            if (interactive) {
                map.scrollWheelZoom.enable();
                map.doubleClickZoom.enable();
                map.boxZoom.enable();
                map.keyboard.enable();
                map.dragging.enable();
            } else {
                map.scrollWheelZoom.disable();
                map.doubleClickZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                map.dragging.disable();
            }
        }

        return map;
    }

    getMarkerLayer(containerId) {
        let layer = this.markerLayers[containerId];
        if (!layer && this.mapInstances[containerId]) {
            layer = L.layerGroup().addTo(this.mapInstances[containerId]);
            this.markerLayers[containerId] = layer;
        }
        return layer;
    }

    renderMap(containerId, highlightBuilding = null, interactive = false) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const map = this.initializeMap(containerId, interactive);
        if (!map) return;

        const markerLayer = this.getMarkerLayer(containerId);
        if (!markerLayer) return;
        markerLayer.clearLayers();

        const buildingData = this.getBuildingData();
        const bounds = [];

        Object.keys(buildingData).forEach(key => {
            const building = buildingData[key];
            if (!building || !building.coordinates) return;

            const { lat, lng } = building.coordinates;
            if (typeof lat !== 'number' || typeof lng !== 'number') return;

            const style = this.getBuildingStyle(key);
            const isHighlighted = key === highlightBuilding;
            const latLng = [lat, lng];

            bounds.push(latLng);

            const marker = L.circleMarker(latLng, {
                radius: isHighlighted ? 14 : 11,
                color: '#FFFFFF',
                weight: isHighlighted ? 4 : 3,
                fillColor: style.color,
                fillOpacity: isHighlighted ? 0.95 : 0.8,
                opacity: 0.9,
                className: isHighlighted ? 'campus-map-marker highlight' : 'campus-map-marker'
            });

            marker.bindTooltip(`${style.label || building.abbreviation} • ${building.name}`, {
                direction: 'top',
                offset: [0, -6],
                opacity: 0.9,
                className: 'campus-map-tooltip'
            });

            const popupContent = this.buildPopupContent(building, style);
            marker.bindPopup(popupContent, {
                autoClose: false,
                closeButton: false,
                className: 'campus-map-popup-container',
                maxWidth: 280
            });

            if (interactive) {
                marker.on('click', () => {
                    this.renderMap(containerId, key, true);
                    if (typeof game !== 'undefined' && game.showBuildingDetail) {
                        game.showBuildingDetail(key);
                    }
                });
            }

            markerLayer.addLayer(marker);

            if (isHighlighted) {
                setTimeout(() => marker.openPopup(), 150);
                marker.bringToFront();
            } else {
                marker.bringToFront();
            }
        });

        const buildingDataForHighlight = buildingData[highlightBuilding];
        if (highlightBuilding && buildingDataForHighlight && buildingDataForHighlight.coordinates) {
            const { lat, lng } = buildingDataForHighlight.coordinates;
            map.setView([lat, lng], 18);
        } else if (bounds.length) {
            const mapBounds = L.latLngBounds(bounds);
            map.fitBounds(mapBounds, { padding: [40, 40] });
        } else {
            map.setView(this.defaultView.center, this.defaultView.zoom);
        }

        setTimeout(() => map.invalidateSize(), 200);
    }

    // Render navigation from arbitrary coordinates to a building key
    renderNavigation(containerId, fromCoords, toBuildingKey, interactive = true) {
        // First render all buildings with destination highlighted
        this.renderMap(containerId, toBuildingKey, interactive);
        const map = this.mapInstances[containerId];
        if (!map) return;
        const layer = this.getMarkerLayer(containerId);
        const buildingData = this.getBuildingData();
        const dest = buildingData[toBuildingKey]?.coordinates;
        if (!fromCoords || !dest) return;

        const fromLatLng = [fromCoords.lat, fromCoords.lng];
        const toLatLng = [dest.lat, dest.lng];

        // Pulsing ring effect (underneath the marker)
        const pulseRing = L.circleMarker(fromLatLng, {
            radius: 16,
            color: '#00B0FF',
            weight: 2,
            fillColor: '#00B0FF',
            fillOpacity: 0.2,
            className: 'campus-map-pulse-ring'
        });
        layer.addLayer(pulseRing);

        // User location marker (on top, static)
        const userMarker = L.circleMarker(fromLatLng, {
            radius: 8,
            color: '#FFFFFF',
            weight: 3,
            fillColor: '#00B0FF',
            fillOpacity: 1,
            className: 'campus-map-user-dot'
        }).bindTooltip('You are here', {
            direction: 'top',
            offset: [0, -8],
            className: 'campus-map-tooltip'
        });
        layer.addLayer(userMarker);

        // Fetch walking route from OSRM (free, no API key needed)
        this.fetchWalkingRoute(fromCoords, dest, layer, map);
    }

    // Fetch real walking directions from OSRM
    async fetchWalkingRoute(from, to, layer, map) {
        const fromLatLng = [from.lat, from.lng];
        const toLatLng = [to.lat, to.lng];
        
        // OSRM API URL for walking directions
        const osrmUrl = `https://router.project-osrm.org/route/v1/foot/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&steps=true`;
        
        try {
            const response = await fetch(osrmUrl);
            const data = await response.json();
            
            if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
                
                // Draw the actual walking route
                const routeLine = L.polyline(coordinates, {
                    color: '#4CAF50',
                    weight: 5,
                    opacity: 0.9,
                    className: 'campus-map-route walking-route'
                });
                layer.addLayer(routeLine);
                
                // Add route info popup
                const distanceMeters = Math.round(route.distance);
                const distanceFeet = Math.round(distanceMeters * 3.281);
                const distanceMiles = distanceMeters / 1609.34;
                
                // Calculate walking time: average walking speed is ~3 mph = 80 meters/min
                // Campus walking is slower (~2.5 mph = 67 meters/min) due to crosswalks, crowds
                const walkingSpeed = 67; // meters per minute (~2.5 mph)
                const totalMinutes = Math.max(1, Math.round(distanceMeters / walkingSpeed));
                const durationDisplay = this.formatDuration(totalMinutes);
                
                const distanceDisplay = distanceMiles >= 0.1 
                    ? `${distanceMiles.toFixed(2)} mi` 
                    : `${distanceFeet} ft`;
                
                // Update directions display
                this.updateDirectionsDisplay(route, durationDisplay, distanceDisplay);
                
                // Fit bounds to route
                const bounds = routeLine.getBounds();
                map.fitBounds(bounds, { padding: [50, 50] });
                
                // Add turn markers for key steps
                this.addTurnMarkers(route.legs[0].steps, layer);
                
            } else {
                // Fallback to straight line if OSRM fails
                this.drawFallbackRoute(fromLatLng, toLatLng, layer, map);
            }
        } catch (error) {
            console.warn('OSRM routing failed, using straight line:', error);
            // Fallback to straight line
            this.drawFallbackRoute(fromLatLng, toLatLng, layer, map);
        }
        
        setTimeout(() => map.invalidateSize(), 200);
    }

    // Draw fallback straight line route
    drawFallbackRoute(fromLatLng, toLatLng, layer, map) {
        const route = L.polyline([fromLatLng, toLatLng], {
            color: '#FF9800',
            weight: 4,
            opacity: 0.9,
            dashArray: '8,8',
            className: 'campus-map-route fallback-route'
        });
        layer.addLayer(route);
        
        // Calculate straight-line distance
        const from = L.latLng(fromLatLng);
        const to = L.latLng(toLatLng);
        const distance = from.distanceTo(to);
        // Add 30% to straight-line distance to approximate actual walking path
        const estimatedWalkingDistance = distance * 1.3;
        // Walking speed: ~67 meters per minute (~2.5 mph, realistic for campus)
        const walkingMinutes = Math.max(1, Math.round(estimatedWalkingDistance / 67));
        
        const directionsEl = document.getElementById('nav-directions');
        if (directionsEl) {
            const distanceFeet = Math.round(distance * 3.281);
            const distanceMiles = distance / 1609.34;
            const distanceDisplay = distanceMiles >= 0.1 
                ? `${distanceMiles.toFixed(2)} mi` 
                : `${distanceFeet} ft`;
            const durationDisplay = this.formatDuration(walkingMinutes);
            
            directionsEl.innerHTML = `
                <p><strong>📍 Approximate Route</strong></p>
                <p>Distance: ~${distanceDisplay}</p>
                <p>Walking time: ~${durationDisplay}</p>
                <p class="route-note" style="color:#FF9800; font-size:0.9em; margin-top:8px;">
                    ⚠️ Showing straight-line path. For turn-by-turn directions, check Google Maps.
                </p>
            `;
        }
        
        const bounds = L.latLngBounds([fromLatLng, toLatLng]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Update the directions display panel
    updateDirectionsDisplay(route, durationDisplay, distanceDisplay) {
        const directionsEl = document.getElementById('nav-directions');
        if (!directionsEl) return;
        
        const steps = route.legs[0]?.steps || [];
        const stepsList = steps
            .filter(step => step.maneuver && step.maneuver.type !== 'arrive' && step.maneuver.type !== 'depart')
            .slice(0, 5)
            .map(step => {
                const instruction = this.formatStepInstruction(step);
                const stepFeet = Math.round(step.distance * 3.281);
                const stepDistance = stepFeet >= 500 
                    ? `${(step.distance / 1609.34).toFixed(2)} mi` 
                    : `${stepFeet} ft`;
                return `<li>${instruction} <span class="step-distance">(${stepDistance})</span></li>`;
            })
            .join('');
        
        directionsEl.innerHTML = `
            <div class="route-summary">
                <div class="route-stat">
                    <span class="route-icon">🚶</span>
                    <span class="route-value">${durationDisplay}</span>
                </div>
                <div class="route-stat">
                    <span class="route-icon">📏</span>
                    <span class="route-value">${distanceDisplay}</span>
                </div>
            </div>
            ${stepsList ? `
                <div class="route-steps">
                    <h5>Turn-by-turn directions:</h5>
                    <ol class="steps-list">${stepsList}</ol>
                </div>
            ` : ''}
        `;
    }

    // Format step instruction from OSRM
    formatStepInstruction(step) {
        const maneuver = step.maneuver;
        const name = step.name || 'the path';
        
        const directions = {
            'turn': {
                'left': '↰ Turn left',
                'right': '↱ Turn right',
                'sharp left': '↰ Sharp left',
                'sharp right': '↱ Sharp right',
                'slight left': '↖ Slight left',
                'slight right': '↗ Slight right',
                'straight': '↑ Continue straight'
            },
            'new name': '↑ Continue',
            'depart': '🚶 Start walking',
            'arrive': '📍 Arrive at destination',
            'merge': '↗ Merge',
            'fork': '⑂ Fork',
            'end of road': '↩ End of road'
        };
        
        if (maneuver.type === 'turn' && maneuver.modifier) {
            const turnDir = directions.turn[maneuver.modifier] || '↑ Turn';
            return `${turnDir} onto ${name}`;
        }
        
        return directions[maneuver.type] || `Continue on ${name}`;
    }

    // Add small markers at key turn points
    addTurnMarkers(steps, layer) {
        if (!steps || steps.length < 2) return;
        
        // Only add markers for significant turns (not start/end)
        steps.forEach((step, index) => {
            if (index === 0 || index === steps.length - 1) return;
            if (!step.maneuver || !step.maneuver.location) return;
            
            const location = step.maneuver.location;
            const turnMarker = L.circleMarker([location[1], location[0]], {
                radius: 4,
                color: '#FFFFFF',
                weight: 2,
                fillColor: '#4CAF50',
                fillOpacity: 0.9
            });
            
            layer.addLayer(turnMarker);
        });
    }

    buildPopupContent(building, style) {
        const categories = (building.categories || [])
            .map(cat => `<span class="campus-map-chip">${this.formatCategory(cat)}</span>`)
            .join('');
        const landmarks = (building.landmarks || [])
            .slice(0, 3)
            .map(item => `<li>${item}</li>`)
            .join('');

        return `
            <div class="campus-map-popup">
                <div class="campus-map-popup-header">
                    <span class="campus-map-popup-label" style="background:${style.color};">
                        ${style.label || building.abbreviation}
                    </span>
                    <h4>${building.name}</h4>
                </div>
                <div class="campus-map-popup-body">
                    <div class="campus-map-popup-row">📍 ${building.address}</div>
                    ${categories ? `<div class="campus-map-popup-row">${categories}</div>` : ''}
                    ${landmarks ? `<ul class="campus-map-popup-list">${landmarks}</ul>` : ''}
                </div>
            </div>
        `;
    }

    formatCategory(cat) {
        if (!cat) return '';
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }

    // Format duration in minutes to "X hr Y min" or "X min"
    formatDuration(totalMinutes) {
        if (totalMinutes < 60) {
            return `${totalMinutes} min`;
        }
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        if (mins === 0) {
            return `${hours} hr`;
        }
        return `${hours} hr ${mins} min`;
    }

    getDirections(fromBuilding, toBuilding) {
        if (typeof L === 'undefined') return '';

        const buildingData = this.getBuildingData();
        const from = buildingData[fromBuilding]?.coordinates;
        const to = buildingData[toBuilding]?.coordinates;

        if (!from || !to) return '';

        const fromLatLng = L.latLng(from.lat, from.lng);
        const toLatLng = L.latLng(to.lat, to.lng);

        const distanceMeters = fromLatLng.distanceTo(toLatLng);
        // Add 30% for actual walking path, then use 67 m/min (~2.5 mph)
        const estimatedWalkingDistance = distanceMeters * 1.3;
        const approxMinutes = Math.max(1, Math.round(estimatedWalkingDistance / 67));

        const bearing = this.computeBearing(fromLatLng, toLatLng);
        return `Head ${bearing} for about ${approxMinutes} minute${approxMinutes !== 1 ? 's' : ''}`;
    }

    computeBearing(fromLatLng, toLatLng) {
        const dx = toLatLng.lng - fromLatLng.lng;
        const dy = toLatLng.lat - fromLatLng.lat;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (angle >= -45 && angle < 45) return 'east';
        if (angle >= 45 && angle < 135) return 'north';
        if (angle >= -135 && angle < -45) return 'south';
        return 'west';
    }
}

const campusMap = new CampusMap();
