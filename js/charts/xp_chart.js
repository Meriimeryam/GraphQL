import { COLORS } from "../ui.js";

const width = 600;
const height = 400;

const margin = {
    top: 30,
    right: 30,
    bottom: 110,
    left: 60
};


const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const SVG_NS = "http://www.w3.org/2000/svg";

export function drawXpChart(xpPerProject) {

    const svg = document.querySelector("#graph-1 > svg");
    if (!svg) return;

    const tooltip = document.querySelector("#graph-tooltip");
    if (!tooltip) return;

    const xStep = xpPerProject.length > 1
        ? graphWidth / (xpPerProject.length - 1) : 0;

    const maxXP = Math.max(
        ...xpPerProject.map(project => project.xp)
    );

    const points = xpPerProject.map((project,i) => {
        

        const x = xpPerProject.length === 1
            ? margin.left + graphWidth / 2
            : margin.left + i * xStep;

        const lineHeight = (project.xp / maxXP) * graphHeight;
        
        const y = margin.top + graphHeight - lineHeight;

        return {
            x,
            y,
            project
        };
    })

    

    //=========================== AXIS =====================
    //Y Axis
    const yAxis = document.createElementNS(SVG_NS, "line");

    yAxis.setAttribute("x1", margin.left);
    yAxis.setAttribute("x2", margin.left);
    yAxis.setAttribute("y1", margin.top-20);
    yAxis.setAttribute("y2", margin.top+graphHeight);
    yAxis.setAttribute("stroke", COLORS.border);
    yAxis.setAttribute("stroke-width", "2");


    svg.appendChild(yAxis);
    
    //X Axis
    const xAxis = document.createElementNS(SVG_NS, "line");

    xAxis.setAttribute("x1", margin.left);
    xAxis.setAttribute("x2", margin.left+graphWidth+20);
    xAxis.setAttribute("y1", margin.top+graphHeight);
    xAxis.setAttribute("y2", margin.top+graphHeight);
    xAxis.setAttribute("stroke", COLORS.border);
    xAxis.setAttribute("stroke-width", "2");

    svg.appendChild(xAxis);

    //Axis values (ticks)
    const maxY = Math.ceil(maxXP / 25000) * 25000;
    const yTicks = 6;
    const yStep = maxY / yTicks;

    for (let i = 0; i <= yTicks; i++) {
        const value = i * yStep;
        
        const normalized = value / maxY;

        const lineHeight = normalized * graphHeight;

        const y = margin.top + graphHeight - lineHeight;

        
        //Tick Label
        const label = document.createElementNS(SVG_NS, "text");
        
        label.setAttribute("x", margin.left - 10);
        label.setAttribute("y", y);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("dominant-baseline", "middle");
        label.setAttribute("fill", COLORS.secondaryText);
        
        label.textContent = xpConvert(value);
        
        svg.appendChild(label);
        
        //GridLine
        if (i===0) {
            continue;
        }
        const gridLine = document.createElementNS(SVG_NS, "line");

        gridLine.setAttribute("x1", margin.left);
        gridLine.setAttribute("y1", y);
        gridLine.setAttribute("y2", y);
        gridLine.setAttribute("x2", margin.left + graphWidth);
        gridLine.setAttribute("stroke", COLORS.border);
        gridLine.setAttribute("opacity", "0.5");

        svg.appendChild(gridLine);
    }

    //Set Path data
    let pathData = "";

    points.forEach((point, i) => {
        if (i === 0) {
            pathData += `M ${point.x} ${point.y}`;
        } else {
            pathData += `L ${point.x} ${point.y}`;
        }

        
    });

    const line = document.createElementNS(SVG_NS, "path");

    line.setAttribute("d", pathData);
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", COLORS.primaryRed);
    line.setAttribute("stroke-width", "3");

    svg.appendChild(line);

    points.forEach(point=> {
        const circle = document.createElementNS(SVG_NS, "circle");

        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", COLORS.surface);
        circle.setAttribute("stroke", COLORS.primaryRed);
        circle.setAttribute("stroke-width", "2");

        circle.style.cursor = ";pointer";

        //Tooltip show/hide
        circle.addEventListener("mouseenter", (e) => {
            circle.setAttribute("r", "6");
            circle.setAttribute("fill", COLORS.brightRed);

            const date = new Date(point.project.createdAt);

            tooltip.innerHTML = `
                <strong>${point.project.name}</strong>
                <span>XP: ${xpConvert(point.project.xp)}</span>
                <span>${formatDate(date)}</span>
            `;

            tooltip.hidden = false;
            positionTooltip(circle, tooltip);
        });

        // circle.addEventListener("mousemove", (e) => {
        //     positionTooltip(e, tooltip);
        // });

        circle.addEventListener("mouseleave", () => {
            circle.setAttribute("r", "4");
            circle.setAttribute("fill", COLORS.surface);

            tooltip.hidden = true;
        });

        svg.appendChild(circle);

        if (point.project.mandatory) {
            const projectName = document.createElementNS(SVG_NS, "text");

            const nameY = margin.top + graphHeight + 15;

            projectName.setAttribute("x", point.x);
            projectName.setAttribute("y", nameY);

            projectName.setAttribute("transform", `rotate(-45 ${point.x} ${nameY})`)
            
            projectName.setAttribute("text-anchor", "end" );
            projectName.setAttribute("fill", COLORS.secondaryText);
            projectName.setAttribute("font-size", "12");
            projectName.textContent = point.project.name;

            svg.appendChild(projectName);
        }

        

    });

    
}

function xpConvert(xp) {
    if (xp<1000) {
        return xp;
    } else if (xp >= 1000 && xp < 1000000) {
        return (xp/1000).toFixed(0)+"K"
    } else if (xp >= 1000000) {
        return (xp/1000000).toFixed(0)+"M"
    }
}

function formatDate(date) {
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}

function positionTooltip(circle,tooltip) {
    const graph = document.querySelector("#graph-1");

    const graphRect = graph.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    const x = circleRect.left - graphRect.left;
    const y = circleRect.top - graphRect.top;

    tooltip.style.left = `${x + circleRect.width + 8}px`;
    tooltip.style.top = `${y - tooltip.offsetHeight - 8}px`;
}


