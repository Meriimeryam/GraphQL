const width = 600;

const margin = {
    top: 30,
    right: 30,
    bottom: 60,
    left: 100
};

const chartWidth = width - margin.left - margin.right;

const barHeight = 20;
const gap = 10;

const SVG_NS = "http://www.w3.org/2000/svg";

export function drawSkillChart(skills) {
    const svg = document.querySelector("#graph-1 > svg");

    if (!svg) {
        return;
    }
    skills.forEach((skill, i) => {
        const y = margin.top + (barHeight + gap) * i;
        //Background
        const background = document.createElementNS(SVG_NS, "rect");

        background.setAttribute("x", margin.left);
        background.setAttribute("y", y);
        background.setAttribute("height", barHeight);
        background.setAttribute("width", chartWidth);
        background.setAttribute("rx", 10);
        background.setAttribute("ry", 10);
        background.setAttribute("fill", "gray");

        svg.appendChild(background);

        //Skill level
        const barWidth = (skill.level / 100) * chartWidth;

        const bar = document.createElementNS(SVG_NS, "rect");

        bar.setAttribute("x", margin.left);
        bar.setAttribute("y", y);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("rx", 10);
        bar.setAttribute("ry", 10);
        bar.setAttribute("fill", "pink");
    
        svg.appendChild(bar);

        //Label
        const label = document.createElementNS(SVG_NS, "text");

        label.setAttribute("x", margin.left - 10);
        label.setAttribute("y", y + barHeight / 2);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("dominant-baseline", "middle");
        label.textContent = skill.label;
        svg.appendChild(label);

        //Percentage
        const percentageX = margin.left + chartWidth + 2;
        const percentage = document.createElementNS(SVG_NS, "text");

        percentage.setAttribute("x", percentageX);
        percentage.setAttribute("y", y + barHeight / 2);
        percentage.setAttribute("text-anchor", "start");
        percentage.setAttribute("dominant-baseline", "middle");
        percentage.textContent = `${skill.level}%`;
        svg.appendChild(percentage);
        
    });
}