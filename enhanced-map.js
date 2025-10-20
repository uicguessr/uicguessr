// Enhanced Interactive Campus Map for UICguessr

class CampusMap {
    constructor() {
        // UIC East Campus building coordinates (relative positioning)
        // Based on actual UIC East Campus layout
        this.buildings = {
            'SCE': { x: 620, y: 180, width: 100, height: 70, color: '#D32F2F', label: 'SCE' },
            'ARC': { x: 720, y: 240, width: 90, height: 80, color: '#2196F3', label: 'ARC' },
            'BSB': { x: 450, y: 280, width: 85, height: 75, color: '#9C27B0', label: 'BSB' },
            'LIB': { x: 380, y: 140, width: 120, height: 110, color: '#795548', label: 'LIB' },
            'SES': { x: 560, y: 310, width: 95, height: 70, color: '#FF5722', label: 'SES' },
            'UH': { x: 300, y: 150, width: 70, height: 120, color: '#607D8B', label: 'UH' },
            'TH': { x: 380, y: 290, width: 75, height: 70, color: '#3F51B5', label: 'TH' },
            'LCA': { x: 490, y: 150, width: 90, height: 80, color: '#00BCD4', label: 'LCA' }
        };
        
        // Streets and landmarks
        this.streets = [
            { name: 'Halsted St', x1: 600, y1: 100, x2: 600, y2: 400, direction: 'vertical' },
            { name: 'Morgan St', x1: 200, y1: 100, x2: 200, y2: 400, direction: 'vertical' },
            { name: 'Harrison St', x1: 200, y1: 250, x2: 800, y2: 250, direction: 'horizontal' },
            { name: 'Taylor St', x1: 200, y1: 350, x2: 800, y2: 350, direction: 'horizontal' }
        ];
        
        this.landmarks = {
            'quad': { x: 450, y: 200, width: 120, height: 90, label: 'The Quad' }
        };
    }
    
    renderMap(containerId, highlightBuilding = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create SVG for better rendering
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '400');
        svg.setAttribute('viewBox', '0 0 900 450');
        svg.style.background = '#FAFAF5';
        svg.style.borderRadius = '10px';
        
        // Add compass
        this.addCompass(svg);
        
        // Draw streets
        this.drawStreets(svg);
        
        // Draw The Quad
        const quadRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        quadRect.setAttribute('x', this.landmarks.quad.x);
        quadRect.setAttribute('y', this.landmarks.quad.y);
        quadRect.setAttribute('width', this.landmarks.quad.width);
        quadRect.setAttribute('height', this.landmarks.quad.height);
        quadRect.setAttribute('fill', '#81C784');
        quadRect.setAttribute('opacity', '0.6');
        quadRect.setAttribute('rx', '8');
        svg.appendChild(quadRect);
        
        const quadLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        quadLabel.setAttribute('x', this.landmarks.quad.x + this.landmarks.quad.width / 2);
        quadLabel.setAttribute('y', this.landmarks.quad.y + this.landmarks.quad.height / 2);
        quadLabel.setAttribute('text-anchor', 'middle');
        quadLabel.setAttribute('fill', '#FFFFFF');
        quadLabel.setAttribute('font-size', '14');
        quadLabel.setAttribute('font-weight', 'bold');
        quadLabel.textContent = this.landmarks.quad.label;
        svg.appendChild(quadLabel);
        
        // Draw buildings
        Object.keys(this.buildings).forEach(key => {
            const building = this.buildings[key];
            const isHighlighted = key === highlightBuilding;
            
            // Building rectangle
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', building.x);
            rect.setAttribute('y', building.y);
            rect.setAttribute('width', building.width);
            rect.setAttribute('height', building.height);
            rect.setAttribute('fill', isHighlighted ? building.color : '#90A4AE');
            rect.setAttribute('stroke', isHighlighted ? '#B71C1C' : '#607D8B');
            rect.setAttribute('stroke-width', isHighlighted ? '4' : '2');
            rect.setAttribute('rx', '6');
            rect.setAttribute('opacity', isHighlighted ? '1' : '0.7');
            rect.style.cursor = 'pointer';
            rect.setAttribute('data-building', key);
            
            // Add shadow for highlighted building
            if (isHighlighted) {
                rect.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
            }
            
            svg.appendChild(rect);
            
            // Building label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', building.x + building.width / 2);
            label.setAttribute('y', building.y + building.height / 2);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('dominant-baseline', 'middle');
            label.setAttribute('fill', '#FFFFFF');
            label.setAttribute('font-size', isHighlighted ? '18' : '14');
            label.setAttribute('font-weight', 'bold');
            label.textContent = building.label;
            svg.appendChild(label);
            
            // Add "You are here" marker if highlighted
            if (isHighlighted) {
                // Pin marker
                const pin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                pin.setAttribute('cx', building.x + building.width / 2);
                pin.setAttribute('cy', building.y - 15);
                pin.setAttribute('r', '12');
                pin.setAttribute('fill', '#FFEB3B');
                pin.setAttribute('stroke', '#F57F17');
                pin.setAttribute('stroke-width', '2');
                svg.appendChild(pin);
                
                const pinText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                pinText.setAttribute('x', building.x + building.width / 2);
                pinText.setAttribute('y', building.y - 12);
                pinText.setAttribute('text-anchor', 'middle');
                pinText.setAttribute('font-size', '16');
                pinText.textContent = '📍';
                svg.appendChild(pinText);
                
                // "You are here" text
                const hereText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                hereText.setAttribute('x', building.x + building.width / 2);
                hereText.setAttribute('y', building.y - 30);
                hereText.setAttribute('text-anchor', 'middle');
                hereText.setAttribute('fill', '#D32F2F');
                hereText.setAttribute('font-size', '12');
                hereText.setAttribute('font-weight', 'bold');
                hereText.textContent = 'You are here';
                svg.appendChild(hereText);
            }
            
            // Add hover tooltip
            rect.addEventListener('mouseenter', (e) => {
                if (key !== highlightBuilding) {
                    rect.setAttribute('opacity', '1');
                }
            });
            
            rect.addEventListener('mouseleave', (e) => {
                if (key !== highlightBuilding) {
                    rect.setAttribute('opacity', '0.7');
                }
            });
        });
        
        // Add scale indicator
        this.addScale(svg);
        
        container.appendChild(svg);
    }
    
    drawStreets(svg) {
        this.streets.forEach(street => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', street.x1);
            line.setAttribute('y1', street.y1);
            line.setAttribute('x2', street.x2);
            line.setAttribute('y2', street.y2);
            line.setAttribute('stroke', '#BDBDBD');
            line.setAttribute('stroke-width', '6');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
            
            // Street label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            if (street.direction === 'vertical') {
                label.setAttribute('x', street.x1 - 10);
                label.setAttribute('y', street.y1 + 20);
            } else {
                label.setAttribute('x', street.x1 + 10);
                label.setAttribute('y', street.y1 - 10);
            }
            label.setAttribute('fill', '#757575');
            label.setAttribute('font-size', '11');
            label.setAttribute('font-weight', '600');
            label.textContent = street.name;
            svg.appendChild(label);
        });
    }
    
    addCompass(svg) {
        const compassG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // Compass circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '850');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '30');
        circle.setAttribute('fill', 'white');
        circle.setAttribute('stroke', '#607D8B');
        circle.setAttribute('stroke-width', '2');
        compassG.appendChild(circle);
        
        // N arrow
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow.setAttribute('d', 'M 850 25 L 858 45 L 850 40 L 842 45 Z');
        arrow.setAttribute('fill', '#D32F2F');
        compassG.appendChild(arrow);
        
        // N label
        const nLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nLabel.setAttribute('x', '850');
        nLabel.setAttribute('y', '22');
        nLabel.setAttribute('text-anchor', 'middle');
        nLabel.setAttribute('fill', '#D32F2F');
        nLabel.setAttribute('font-size', '14');
        nLabel.setAttribute('font-weight', 'bold');
        nLabel.textContent = 'N';
        compassG.appendChild(nLabel);
        
        svg.appendChild(compassG);
    }
    
    addScale(svg) {
        // Scale bar
        const scaleG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        const scaleLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        scaleLine.setAttribute('x1', '50');
        scaleLine.setAttribute('y1', '420');
        scaleLine.setAttribute('x2', '150');
        scaleLine.setAttribute('y2', '420');
        scaleLine.setAttribute('stroke', '#424242');
        scaleLine.setAttribute('stroke-width', '3');
        scaleG.appendChild(scaleLine);
        
        const scaleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        scaleText.setAttribute('x', '100');
        scaleText.setAttribute('y', '435');
        scaleText.setAttribute('text-anchor', 'middle');
        scaleText.setAttribute('fill', '#424242');
        scaleText.setAttribute('font-size', '11');
        scaleText.textContent = '100m';
        scaleG.appendChild(scaleText);
        
        svg.appendChild(scaleG);
    }
    
    getDirections(fromBuilding, toBuilding) {
        // Simple direction calculator
        const from = this.buildings[fromBuilding];
        const to = this.buildings[toBuilding];
        
        if (!from || !to) return '';
        
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        
        let direction = '';
        if (Math.abs(dx) > Math.abs(dy)) {
            direction = dx > 0 ? 'east' : 'west';
        } else {
            direction = dy > 0 ? 'south' : 'north';
        }
        
        const distance = Math.floor(Math.sqrt(dx * dx + dy * dy) / 20); // Rough estimation
        
        return `Head ${direction} approximately ${distance} minutes walk`;
    }
}

// Create global instance
const campusMap = new CampusMap();

