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
            CASA: { color: '#9C27B0', label: 'CASA' },
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

        // Route polyline (straight-line approximation)
        const route = L.polyline([fromLatLng, toLatLng], {
            color: '#00B0FF',
            weight: 4,
            opacity: 0.9,
            dashArray: '6,4',
            className: 'campus-map-route'
        });
        layer.addLayer(route);

        // User location marker
        const userMarker = L.circleMarker(fromLatLng, {
            radius: 8,
            color: '#FFFFFF',
            weight: 3,
            fillColor: '#00B0FF',
            fillOpacity: 0.95,
            className: 'campus-map-user-marker'
        }).bindTooltip('You are here', {
            direction: 'top',
            offset: [0, -6],
            className: 'campus-map-tooltip'
        });
        layer.addLayer(userMarker);

        // Fit bounds to show both
        const bounds = L.latLngBounds([fromLatLng, toLatLng]);
        map.fitBounds(bounds, { padding: [40, 40] });
        setTimeout(() => map.invalidateSize(), 200);
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

    getDirections(fromBuilding, toBuilding) {
        if (typeof L === 'undefined') return '';

        const buildingData = this.getBuildingData();
        const from = buildingData[fromBuilding]?.coordinates;
        const to = buildingData[toBuilding]?.coordinates;

        if (!from || !to) return '';

        const fromLatLng = L.latLng(from.lat, from.lng);
        const toLatLng = L.latLng(to.lat, to.lng);

        const distanceMeters = fromLatLng.distanceTo(toLatLng);
        const approxMinutes = Math.max(1, Math.round(distanceMeters / 80));

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
