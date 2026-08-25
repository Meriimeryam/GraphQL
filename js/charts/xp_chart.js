const width = 600;
const height = 400;

const margin = {
    top: 30,
    right: 30,
    bottom: 60,
    left: 60
};

const barGap = 20;

const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const SVG_NS = "http://www.w3.org/2000/svg";

export function drawXpChart(xpPerProject) {

    const svg = document.querySelector("#graph-2 > svg");
    if (!svg) return;

    //Time dependent
    const minTime = new Date(xpPerProject[0].createdAt).getTime();
    const maxTime = new Date(xpPerProject[xpPerProject.length - 1].createdAt).getTime();

    const maxXP = Math.max(
        ...xpPerProject.map(project => project.xp)
    );

    const points = xpPerProject.map(project => {
        
        const time = new Date(project.createdAt).getTime();

        const normalizedTime = (time - minTime) / (maxTime - minTime);

        const x = margin.left + normalizedTime * graphWidth;

        const lineHeight = (project.xp / maxXP) * graphHeight;
        
        const y = margin.top + graphHeight - lineHeight;

        return {
            x,
            y,
            project,
            time
        };
    })

    

    //=========================== AXIS =====================
    //Y Axis
    const yAxis = document.createElementNS(SVG_NS, "line");

    yAxis.setAttribute("x1", margin.left);
    yAxis.setAttribute("x2", margin.left);
    yAxis.setAttribute("y1", margin.top-20);
    yAxis.setAttribute("y2", margin.top+graphHeight);
    yAxis.setAttribute("stroke", "black");

    svg.appendChild(yAxis);
    
    //X Axis
    const xAxis = document.createElementNS(SVG_NS, "line");

    xAxis.setAttribute("x1", margin.left);
    xAxis.setAttribute("x2", margin.left+graphWidth+20);
    xAxis.setAttribute("y1", margin.top+graphHeight);
    xAxis.setAttribute("y2", margin.top+graphHeight);
    xAxis.setAttribute("stroke", "black");

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

        //GridLine
        const gridLine = document.createElementNS(SVG_NS, "line");

        gridLine.setAttribute("x1", margin.left);
        gridLine.setAttribute("y1", y);
        gridLine.setAttribute("y2", y);
        gridLine.setAttribute("x2", margin.left + graphWidth);
        gridLine.setAttribute("stroke", "#ddd");

        svg.appendChild(gridLine);

        //Tick Label
        const label = document.createElementNS(SVG_NS, "text");

        label.setAttribute("x", margin.left - 10);
        label.setAttribute("y", y);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("dominant-baseline", "middle");

        label.textContent = xpConvert(value);
        
        svg.appendChild(label);

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
    line.setAttribute("stroke", "pink");
    line.setAttribute("stroke-width", "3");

    svg.appendChild(line);

    points.forEach(point=> {
        // const x = margin.left + index * (graphWidth / (xpPerProject.length - 1));
        const circle = document.createElementNS(SVG_NS, "circle");

        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", "gray");

        svg.appendChild(circle);

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


