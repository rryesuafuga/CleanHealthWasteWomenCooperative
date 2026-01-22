/**
 * CleanHealth Waste Women's Cooperative
 * D3.js Data Visualizations
 * Colorblind-friendly charts and interactive graphics
 */

(function() {
    'use strict';

    // ==========================================
    // Colorblind-Safe Color Palette (IBM Design)
    // ==========================================
    const colors = {
        blue: '#648fff',
        gold: '#ffb000',
        purple: '#785ef0',
        orange: '#fe6100',
        magenta: '#dc267f',
        teal: '#22c1c3',
        // Additional variations
        lightBlue: '#a0c4ff',
        lightGold: '#ffd966',
        lightPurple: '#b4a7d6',
    };

    // Pattern definitions for additional differentiation
    const patterns = [
        { id: 'diagonalHatch', type: 'diagonal' },
        { id: 'dotPattern', type: 'dots' },
        { id: 'horizontalHatch', type: 'horizontal' },
        { id: 'verticalHatch', type: 'vertical' }
    ];

    // ==========================================
    // Utility Functions
    // ==========================================
    function getContainerDimensions(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return { width: 400, height: 300 };

        const rect = container.getBoundingClientRect();
        return {
            width: rect.width || 400,
            height: rect.height || 300
        };
    }

    function createSvgWithPatterns(container, width, height) {
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Add pattern definitions
        const defs = svg.append('defs');

        // Diagonal hatch pattern
        defs.append('pattern')
            .attr('id', 'diagonalHatch')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 8)
            .attr('height', 8)
            .append('path')
            .attr('d', 'M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4')
            .attr('stroke', 'rgba(0,0,0,0.2)')
            .attr('stroke-width', 1.5);

        // Dot pattern
        defs.append('pattern')
            .attr('id', 'dotPattern')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 8)
            .attr('height', 8)
            .append('circle')
            .attr('cx', 4)
            .attr('cy', 4)
            .attr('r', 2)
            .attr('fill', 'rgba(0,0,0,0.15)');

        // Horizontal hatch
        defs.append('pattern')
            .attr('id', 'horizontalHatch')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 8)
            .attr('height', 8)
            .append('path')
            .attr('d', 'M0,4 l8,0')
            .attr('stroke', 'rgba(0,0,0,0.2)')
            .attr('stroke-width', 1.5);

        return svg;
    }

    // ==========================================
    // Financial Projections Chart
    // ==========================================
    function createFinancialChart() {
        const containerId = 'financial-chart';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const data = [
            { year: 'Year 1', revenue: 11840, expenses: 7560, profit: 4280 },
            { year: 'Year 2', revenue: 21440, expenses: 11220, profit: 10220 },
            { year: 'Year 3', revenue: 35200, expenses: 16800, profit: 18400 }
        ];

        const margin = { top: 30, right: 30, bottom: 50, left: 70 };
        const { width: containerWidth, height: containerHeight } = getContainerDimensions(containerId);
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = createSvgWithPatterns(container, containerWidth, containerHeight);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scales
        const x0 = d3.scaleBand()
            .domain(data.map(d => d.year))
            .rangeRound([0, width])
            .paddingInner(0.2);

        const x1 = d3.scaleBand()
            .domain(['revenue', 'expenses', 'profit'])
            .rangeRound([0, x0.bandwidth()])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.revenue) * 1.1])
            .nice()
            .rangeRound([height, 0]);

        const colorScale = d3.scaleOrdinal()
            .domain(['revenue', 'expenses', 'profit'])
            .range([colors.blue, colors.orange, colors.teal]);

        // Grid lines
        g.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(y)
                .tickSize(-width)
                .tickFormat('')
            )
            .selectAll('line')
            .attr('stroke', '#e2e8f0')
            .attr('stroke-dasharray', '3,3');

        g.select('.grid .domain').remove();

        // Bars
        const yearGroups = g.selectAll('.year-group')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'year-group')
            .attr('transform', d => `translate(${x0(d.year)},0)`);

        ['revenue', 'expenses', 'profit'].forEach((key, i) => {
            yearGroups.append('rect')
                .attr('x', x1(key))
                .attr('y', height)
                .attr('width', x1.bandwidth())
                .attr('height', 0)
                .attr('fill', colorScale(key))
                .attr('rx', 4)
                .attr('ry', 4)
                .transition()
                .duration(800)
                .delay((d, j) => j * 100 + i * 200)
                .attr('y', d => y(d[key]))
                .attr('height', d => height - y(d[key]));

            // Add value labels
            yearGroups.append('text')
                .attr('x', x1(key) + x1.bandwidth() / 2)
                .attr('y', d => y(d[key]) - 8)
                .attr('text-anchor', 'middle')
                .attr('font-size', '11px')
                .attr('font-weight', '600')
                .attr('fill', '#334155')
                .attr('opacity', 0)
                .text(d => `$${(d[key] / 1000).toFixed(1)}k`)
                .transition()
                .duration(800)
                .delay((d, j) => j * 100 + i * 200 + 400)
                .attr('opacity', 1);
        });

        // X Axis
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x0))
            .selectAll('text')
            .attr('font-size', '12px')
            .attr('font-weight', '500');

        // Y Axis
        g.append('g')
            .call(d3.axisLeft(y)
                .ticks(5)
                .tickFormat(d => `$${d / 1000}k`)
            )
            .selectAll('text')
            .attr('font-size', '11px');

        // Y axis label
        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -55)
            .attr('x', -height / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', '#64748b')
            .text('Amount (USD)');

        // Legend
        const legendContainer = document.getElementById('financial-legend');
        if (legendContainer) {
            legendContainer.innerHTML = `
                <div class="legend-item">
                    <span class="legend-color" style="background: ${colors.blue}"></span>
                    <span>Revenue</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background: ${colors.orange}"></span>
                    <span>Expenses</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background: ${colors.teal}"></span>
                    <span>Profit</span>
                </div>
            `;
        }
    }

    // ==========================================
    // Revenue Streams Pie Chart
    // ==========================================
    function createRevenueChart() {
        const containerId = 'revenue-chart';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const data = [
            { category: 'Facility Services', value: 68, color: colors.blue, pattern: 'diagonalHatch' },
            { category: 'Recyclables Sales', value: 18, color: colors.gold, pattern: 'dotPattern' },
            { category: 'Training Programs', value: 14, color: colors.purple, pattern: 'horizontalHatch' }
        ];

        const { width: containerWidth, height: containerHeight } = getContainerDimensions(containerId);
        const width = containerWidth;
        const height = containerHeight;
        const radius = Math.min(width, height) / 2 - 40;

        const svg = createSvgWithPatterns(container, width, height);

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const pie = d3.pie()
            .value(d => d.value)
            .sort(null)
            .padAngle(0.02);

        const arc = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius);

        const hoverArc = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius + 10);

        const arcs = g.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Add colored slices
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0)
            .on('mouseenter', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('d', hoverArc);

                // Show tooltip
                tooltip.style('opacity', 1)
                    .html(`<strong>${d.data.category}</strong><br>${d.data.value}% of revenue`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseleave', function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('d', arc);

                tooltip.style('opacity', 0);
            })
            .transition()
            .duration(800)
            .delay((d, i) => i * 200)
            .style('opacity', 1)
            .attrTween('d', function(d) {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });

        // Add pattern overlay for accessibility
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => `url(#${d.data.pattern})`)
            .attr('pointer-events', 'none')
            .style('opacity', 0)
            .transition()
            .duration(800)
            .delay((d, i) => i * 200 + 400)
            .style('opacity', 1);

        // Labels
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', '700')
            .attr('fill', 'white')
            .style('opacity', 0)
            .text(d => `${d.data.value}%`)
            .transition()
            .duration(400)
            .delay((d, i) => i * 200 + 600)
            .style('opacity', 1);

        // Center text
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -10)
            .attr('font-size', '14px')
            .attr('fill', '#64748b')
            .text('Revenue');

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', 15)
            .attr('font-size', '20px')
            .attr('font-weight', '700')
            .attr('fill', '#1e293b')
            .text('$35.2k');

        // Legend below chart
        const legend = svg.append('g')
            .attr('transform', `translate(${width / 2 - 100}, ${height - 25})`);

        data.forEach((item, i) => {
            const legendItem = legend.append('g')
                .attr('transform', `translate(${i * 80 - 40}, 0)`);

            legendItem.append('rect')
                .attr('width', 12)
                .attr('height', 12)
                .attr('fill', item.color)
                .attr('rx', 2);

            legendItem.append('text')
                .attr('x', 16)
                .attr('y', 10)
                .attr('font-size', '10px')
                .attr('fill', '#64748b')
                .text(item.category.split(' ')[0]);
        });

        // Tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'chart-tooltip')
            .style('position', 'absolute')
            .style('background', 'white')
            .style('padding', '10px 15px')
            .style('border-radius', '8px')
            .style('box-shadow', '0 4px 12px rgba(0,0,0,0.15)')
            .style('font-size', '13px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('z-index', '1000')
            .style('transition', 'opacity 0.2s');
    }

    // ==========================================
    // Problem Impact Chart (Interactive)
    // ==========================================
    function createProblemChart() {
        const containerId = 'problem-chart';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const data = [
            {
                category: 'Environmental',
                icon: '🌍',
                impacts: [
                    { label: 'Landfill Contamination', value: 94 },
                    { label: 'Groundwater Risk', value: 78 },
                    { label: 'Air Quality', value: 65 }
                ],
                color: colors.blue
            },
            {
                category: 'Economic',
                icon: '💰',
                impacts: [
                    { label: 'Lost Recyclables Value', value: 88 },
                    { label: 'Healthcare Costs', value: 72 },
                    { label: 'Cleanup Expenses', value: 85 }
                ],
                color: colors.gold
            },
            {
                category: 'Regulatory',
                icon: '📋',
                impacts: [
                    { label: 'Non-Compliance Rate', value: 94 },
                    { label: 'Inspection Failures', value: 82 },
                    { label: 'Legal Risk', value: 76 }
                ],
                color: colors.purple
            }
        ];

        const { width: containerWidth, height: containerHeight } = getContainerDimensions(containerId);
        const margin = { top: 20, right: 30, bottom: 40, left: 140 };
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Flatten data for bars
        const flatData = [];
        data.forEach((cat, i) => {
            cat.impacts.forEach((impact, j) => {
                flatData.push({
                    category: cat.category,
                    label: impact.label,
                    value: impact.value,
                    color: cat.color,
                    groupIndex: i
                });
            });
        });

        // Scales
        const y = d3.scaleBand()
            .domain(flatData.map(d => d.label))
            .rangeRound([0, height])
            .padding(0.25);

        const x = d3.scaleLinear()
            .domain([0, 100])
            .rangeRound([0, width]);

        // Grid
        g.append('g')
            .attr('class', 'grid')
            .call(d3.axisBottom(x)
                .tickSize(height)
                .tickFormat('')
                .ticks(5)
            )
            .selectAll('line')
            .attr('stroke', '#e2e8f0')
            .attr('stroke-dasharray', '3,3');

        g.select('.grid .domain').remove();

        // Category separators and labels
        let currentCategory = '';
        flatData.forEach((d, i) => {
            if (d.category !== currentCategory) {
                currentCategory = d.category;
                const yPos = y(d.label) - y.bandwidth() * 0.3;

                // Category label on left
                g.append('text')
                    .attr('x', -135)
                    .attr('y', yPos + y.bandwidth())
                    .attr('font-size', '13px')
                    .attr('font-weight', '700')
                    .attr('fill', d.color)
                    .text(d.category);
            }
        });

        // Bars
        const bars = g.selectAll('.bar')
            .data(flatData)
            .enter()
            .append('g')
            .attr('class', 'bar');

        // Background bars
        bars.append('rect')
            .attr('x', 0)
            .attr('y', d => y(d.label))
            .attr('width', width)
            .attr('height', y.bandwidth())
            .attr('fill', '#f1f5f9')
            .attr('rx', 4);

        // Value bars
        bars.append('rect')
            .attr('x', 0)
            .attr('y', d => y(d.label))
            .attr('width', 0)
            .attr('height', y.bandwidth())
            .attr('fill', d => d.color)
            .attr('rx', 4)
            .transition()
            .duration(800)
            .delay((d, i) => i * 100)
            .attr('width', d => x(d.value));

        // Labels
        bars.append('text')
            .attr('x', -5)
            .attr('y', d => y(d.label) + y.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .attr('font-size', '11px')
            .attr('fill', '#475569')
            .text(d => d.label);

        // Values
        bars.append('text')
            .attr('x', d => x(d.value) + 8)
            .attr('y', d => y(d.label) + y.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .attr('fill', '#1e293b')
            .attr('opacity', 0)
            .text(d => `${d.value}%`)
            .transition()
            .duration(400)
            .delay((d, i) => i * 100 + 600)
            .attr('opacity', 1);

        // X axis
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks(5)
                .tickFormat(d => `${d}%`)
            )
            .selectAll('text')
            .attr('font-size', '11px');
    }

    // ==========================================
    // Timeline/Roadmap Chart
    // ==========================================
    function createTimelineChart() {
        const containerId = 'timeline-chart';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const data = [
            { phase: 'Q1', label: 'Launch', clients: 5, members: 8, milestone: 'Cooperative Registration' },
            { phase: 'Q2', label: 'Stabilize', clients: 10, members: 8, milestone: 'Break-even Achieved' },
            { phase: 'Year 2', label: 'Grow', clients: 15, members: 12, milestone: 'NEMA Partnership' },
            { phase: 'Year 3', label: 'Scale', clients: 25, members: 15, milestone: '2nd District Expansion' }
        ];

        const { width: containerWidth, height: containerHeight } = getContainerDimensions(containerId);
        const margin = { top: 30, right: 30, bottom: 50, left: 50 };
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scales
        const x = d3.scalePoint()
            .domain(data.map(d => d.phase))
            .range([0, width])
            .padding(0.5);

        const y = d3.scaleLinear()
            .domain([0, 30])
            .range([height, 0]);

        // Timeline line
        g.append('line')
            .attr('x1', 0)
            .attr('y1', height + 20)
            .attr('x2', width)
            .attr('y2', height + 20)
            .attr('stroke', colors.blue)
            .attr('stroke-width', 3)
            .attr('stroke-linecap', 'round');

        // Area for clients
        const areaClients = d3.area()
            .x(d => x(d.phase))
            .y0(height)
            .y1(d => y(d.clients))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('fill', colors.blue)
            .attr('fill-opacity', 0.2)
            .attr('d', areaClients);

        // Line for clients
        const lineClients = d3.line()
            .x(d => x(d.phase))
            .y(d => y(d.clients))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', colors.blue)
            .attr('stroke-width', 3)
            .attr('d', lineClients);

        // Line for members
        const lineMembers = d3.line()
            .x(d => x(d.phase))
            .y(d => y(d.members))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', colors.gold)
            .attr('stroke-width', 3)
            .attr('stroke-dasharray', '8,4')
            .attr('d', lineMembers);

        // Data points and labels
        data.forEach((d, i) => {
            // Client points
            g.append('circle')
                .attr('cx', x(d.phase))
                .attr('cy', y(d.clients))
                .attr('r', 8)
                .attr('fill', colors.blue)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);

            // Client value
            g.append('text')
                .attr('x', x(d.phase))
                .attr('y', y(d.clients) - 15)
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('font-weight', '600')
                .attr('fill', colors.blue)
                .text(`${d.clients} clients`);

            // Member points
            g.append('circle')
                .attr('cx', x(d.phase))
                .attr('cy', y(d.members))
                .attr('r', 6)
                .attr('fill', colors.gold)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);

            // Timeline nodes
            g.append('circle')
                .attr('cx', x(d.phase))
                .attr('cy', height + 20)
                .attr('r', 12)
                .attr('fill', 'white')
                .attr('stroke', colors.blue)
                .attr('stroke-width', 3);

            // Phase labels
            g.append('text')
                .attr('x', x(d.phase))
                .attr('y', height + 45)
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('font-weight', '700')
                .attr('fill', '#1e293b')
                .text(d.phase);

            // Milestone labels
            g.append('text')
                .attr('x', x(d.phase))
                .attr('y', height + 60)
                .attr('text-anchor', 'middle')
                .attr('font-size', '10px')
                .attr('fill', '#64748b')
                .text(d.milestone);
        });

        // Legend
        const legend = g.append('g')
            .attr('transform', `translate(${width - 120}, 0)`);

        legend.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('stroke', colors.blue)
            .attr('stroke-width', 3);

        legend.append('text')
            .attr('x', 25)
            .attr('y', 4)
            .attr('font-size', '11px')
            .attr('fill', '#64748b')
            .text('Clients');

        legend.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y1', 20)
            .attr('y2', 20)
            .attr('stroke', colors.gold)
            .attr('stroke-width', 3)
            .attr('stroke-dasharray', '8,4');

        legend.append('text')
            .attr('x', 25)
            .attr('y', 24)
            .attr('font-size', '11px')
            .attr('fill', '#64748b')
            .text('Members');
    }

    // ==========================================
    // Team Growth Chart
    // ==========================================
    function createTeamGrowthChart() {
        const containerId = 'team-growth-chart';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const data = [
            { year: 'Year 1', members: 8 },
            { year: 'Year 2', members: 12 },
            { year: 'Year 3', members: 15 }
        ];

        const { width: containerWidth, height: containerHeight } = getContainerDimensions(containerId);
        const width = containerWidth;
        const height = containerHeight;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);

        const personIcon = (x, y, filled) => {
            return `
                <circle cx="${x}" cy="${y - 8}" r="6" fill="${filled ? colors.blue : '#e2e8f0'}" />
                <path d="M${x - 8} ${y + 12} Q${x} ${y - 2} ${x + 8} ${y + 12}" fill="${filled ? colors.blue : '#e2e8f0'}" />
            `;
        };

        const maxMembers = 15;
        const iconSize = 28;
        const iconsPerRow = 5;
        const startX = 30;
        const startY = 30;

        // Draw person icons for each year
        data.forEach((yearData, yearIndex) => {
            const offsetX = yearIndex * (width / 3) + 20;

            for (let i = 0; i < maxMembers; i++) {
                const row = Math.floor(i / iconsPerRow);
                const col = i % iconsPerRow;
                const x = offsetX + col * iconSize;
                const y = startY + row * iconSize;
                const filled = i < yearData.members;

                svg.append('g')
                    .html(personIcon(x + 10, y + 10, filled))
                    .attr('opacity', 0)
                    .transition()
                    .duration(300)
                    .delay(yearIndex * 200 + i * 30)
                    .attr('opacity', 1);
            }

            // Year label
            svg.append('text')
                .attr('x', offsetX + (iconsPerRow * iconSize) / 2)
                .attr('y', height - 10)
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('font-weight', '600')
                .attr('fill', '#64748b')
                .text(yearData.year);
        });
    }

    // ==========================================
    // Hero Illustration (Animated SVG)
    // ==========================================
    function createHeroIllustration() {
        const containerId = 'hero-illustration';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const width = 500;
        const height = 500;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${height}`);

        // Background circle
        svg.append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', 200)
            .attr('fill', 'rgba(26, 127, 148, 0.1)');

        // Central recycling symbol
        const center = { x: width / 2, y: height / 2 };

        // Animated circles representing circular economy
        const circles = [
            { r: 180, color: colors.blue, delay: 0 },
            { r: 140, color: colors.gold, delay: 200 },
            { r: 100, color: colors.teal, delay: 400 }
        ];

        circles.forEach(c => {
            svg.append('circle')
                .attr('cx', center.x)
                .attr('cy', center.y)
                .attr('r', c.r)
                .attr('fill', 'none')
                .attr('stroke', c.color)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', `${c.r * 0.5} ${c.r * 0.3}`)
                .attr('opacity', 0.6)
                .style('animation', `rotate${c.r} 20s linear infinite`)
                .style('animation-delay', `${c.delay}ms`);
        });

        // Icons around the circle
        const icons = [
            { angle: 0, icon: '🏥', label: 'Healthcare' },
            { angle: 72, icon: '♻️', label: 'Recycling' },
            { angle: 144, icon: '👩‍💼', label: 'Women' },
            { angle: 216, icon: '🌱', label: 'Environment' },
            { angle: 288, icon: '📊', label: 'Compliance' }
        ];

        icons.forEach((item, i) => {
            const rad = (item.angle - 90) * Math.PI / 180;
            const x = center.x + Math.cos(rad) * 160;
            const y = center.y + Math.sin(rad) * 160;

            const iconGroup = svg.append('g')
                .attr('transform', `translate(${x}, ${y})`)
                .attr('opacity', 0);

            iconGroup.append('circle')
                .attr('r', 35)
                .attr('fill', 'white')
                .attr('stroke', colors.blue)
                .attr('stroke-width', 2);

            iconGroup.append('text')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('font-size', '28px')
                .text(item.icon);

            iconGroup.transition()
                .duration(500)
                .delay(i * 150 + 500)
                .attr('opacity', 1);
        });

        // Center logo
        const logoGroup = svg.append('g')
            .attr('transform', `translate(${center.x}, ${center.y})`);

        logoGroup.append('circle')
            .attr('r', 50)
            .attr('fill', colors.blue);

        logoGroup.append('path')
            .attr('d', 'M-20 0 L-8 12 L20 -12')
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', 4)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round');

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate180 { from { transform-origin: center; transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes rotate140 { from { transform-origin: center; transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @keyframes rotate100 { from { transform-origin: center; transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // Metric Progress Circles
    // ==========================================
    function animateMetricCircles() {
        const metrics = document.querySelectorAll('.metric-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const fill = progress.querySelector('.metric-fill');
                    const percentage = parseInt(progress.getAttribute('data-progress') || 0);
                    const circumference = 2 * Math.PI * 45; // radius = 45
                    const offset = circumference - (percentage / 100 * circumference);

                    if (fill) {
                        fill.style.strokeDashoffset = offset;
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        metrics.forEach(metric => observer.observe(metric));
    }

    // ==========================================
    // Initialize All Visualizations
    // ==========================================
    function initVisualizations() {
        createFinancialChart();
        createRevenueChart();
        createProblemChart();
        createTimelineChart();
        createTeamGrowthChart();
        createHeroIllustration();
        animateMetricCircles();

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                createFinancialChart();
                createRevenueChart();
                createProblemChart();
                createTimelineChart();
            }, 250);
        });
    }

    // Initialize on load or when main is ready
    document.addEventListener('mainInitialized', initVisualizations);

    // Fallback initialization
    if (document.readyState === 'complete') {
        initVisualizations();
    } else {
        window.addEventListener('load', initVisualizations);
    }

    // Export for other modules
    window.CleanHealth = window.CleanHealth || {};
    window.CleanHealth.visualizations = {
        colors,
        createFinancialChart,
        createRevenueChart,
        createProblemChart,
        createTimelineChart
    };

})();
