const width = 600;
const height = 400;

const margin = {
    top: 30,
    right: 30,
    bottom: 60,
    left: 60
};

const graphBottom = height - margin.bottom;
const graphHeight = height - margin.top - margin.bottom;
const graphWidth = width - margin.left - margin.right;
const maxXP = Math.max(
    ...xpPerProject.map(project => project.xp)
);

const barHeight = (xp / maxXP) * graphHeight;
const y = graphBottom - barHeight;
const x = margin.left+ index*(barWidth+barGap)

const barWidth = (graphWidth - barGap * (xpPerProject.length - 1)) / spPerProject.length;