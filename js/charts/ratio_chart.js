const SVG_NS = "http://www.w3.org/2000/svg";

export function drawRatioChart(audits) {
    const total = audits.done + audits.received;

    const donePercentage = (audits.done / total);
    const receivedPercentage = (audits.received / total);

    
    
    const svg = document.querySelector("#graph-3 > svg");
    
    const radius = 100;
    const cx = 200;
    const cy = 200;
    
    const circumference = 2 * Math.PI * radius;

    const doneLength = donePercentage * circumference;
    const receivedLength = receivedPercentage * circumference;

    //recieved circle
    const receivedCircle = document.createElementNS(SVG_NS, "circle");

    receivedCircle.setAttribute("cx", cx);
    receivedCircle.setAttribute("cy", cy);
    receivedCircle.setAttribute("r", radius);

    receivedCircle.setAttribute("fill", "none");
    receivedCircle.setAttribute("stroke-width", 40);
    receivedCircle.setAttribute("stroke", "#a39c9c");
    receivedCircle.setAttribute(
        "transform",
        `rotate(-90 ${cx} ${cy})`
    );

    receivedCircle.setAttribute("stroke-dasharray", `${receivedLength} ${circumference}`);


    //Circle
    const circle = document.createElementNS(SVG_NS, "circle");

    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-width", 40);
    circle.setAttribute("stroke", "pink");
    circle.setAttribute("stroke-dasharray", `${doneLength} ${circumference}`);
    circle.setAttribute(
        "transform",
        `rotate(-90 ${cx} ${cy})`
    );

    svg.appendChild(receivedCircle);
    svg.appendChild(circle);

    //Ratio
    const ratioText = document.createElementNS(SVG_NS, "text");

    ratioText.setAttribute("x", cx);
    ratioText.setAttribute("y", cy);
    ratioText.setAttribute("text-anchor", "middle");
    ratioText.setAttribute("dominant-baseline", "middle");

    ratioText.textContent = audits.ratio.toFixed(2);

    svg.appendChild(ratioText);




}