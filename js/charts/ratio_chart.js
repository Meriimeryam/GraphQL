import { ratioComment } from "../profile/profile.js";
import { COLORS } from "../ui.js";
import {xpConvert} from "./xp_chart.js"

const SVG_NS = "http://www.w3.org/2000/svg";

export function drawRatioChart(audits,gender) {
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
    const background = document.createElementNS(SVG_NS, "circle");

    background.setAttribute("cx", cx);
    background.setAttribute("cy", cy);
    background.setAttribute("r", radius);

    background.setAttribute("fill", "none");
    background.setAttribute("stroke-width", 40);
    background.setAttribute("stroke", COLORS.darkRed);

    // background.setAttribute("stroke-dasharray", `${receivedLength} ${circumference}`);


    //Circle
    const circle = document.createElementNS(SVG_NS, "circle");

    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-width", 40);
    circle.setAttribute("stroke", COLORS.primaryRed);
    circle.setAttribute("stroke-dasharray", `${doneLength} ${circumference}`);
    circle.setAttribute(
        "transform",
        `rotate(-90 ${cx} ${cy})`
    );

    svg.appendChild(background);
    svg.appendChild(circle);

    //Ratio
    const ratioText = document.createElementNS(SVG_NS, "text");

    ratioText.setAttribute("x", cx);
    ratioText.setAttribute("y", cy);
    ratioText.setAttribute("text-anchor", "middle");
    ratioText.setAttribute("dominant-baseline", "middle");
    ratioText.setAttribute("fill", COLORS.text);
    ratioText.setAttribute("font-size", "20");


    ratioText.textContent = audits.ratio.toFixed(2);

    svg.appendChild(ratioText);

    const comment = document.getElementById("ratio-comment");
    comment.textContent = ratioComment(audits.ratio, gender);

    const container = document.getElementById("graph-3");
    const auditValues = document.createElement("div");
    auditValues.className = "audit-values";

    auditValues.innerHTML = `
            <div class="audit-value audit-up">
                <span class="audit-label">Done</span>
                <span class="audit-number">
                    <span id="up-arrow">↑</span>${xpConvert(audits.done)}
                </span>
            </div>

            <div class="audit-value audit-down">
                <span class="audit-label">Received</span>
                <span class="audit-number"><span id="down-arrow">↓</span>${xpConvert(audits.received)}</span>
            </div>
    `
    container.appendChild(auditValues);


}

