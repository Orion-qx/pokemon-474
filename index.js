"use strict";
(function() {
    const svgSize = {
        width : 1000,
        height: 600,
    };
    const colors = {

        "Bug": "#4E79A7",
    
        "Dark": "#A0CBE8",
    
        "Electric": "#F28E2B",
    
        "Fairy": "#FFBE7D",
    
        "Fighting": "#59A14F",
    
        "Fire": "#8CD17D",
    
        "Ghost": "#B6992D",
    
        "Grass": "#499894",
    
        "Ground": "#86BCB6",
    
        "Ice": "#FABFD2",
    
        "Normal": "#E15759",
    
        "Poison": "#FF9D9A",
    
        "Psychic": "#79706E",
    
        "Steel": "#BAB0AC",
    
        "Water": "#D37295"
    
    }
    const margin = 30;
    let svg = "";

    window.addEventListener("load", init);

    function init() {
        let svgBox = d3.select("#graph")
                        .append("svg")
                            .attr("width", svgSize.width + 2*margin)
                            .attr("height", svgSize.height + 2*margin)
                        .append("g")
                            .attr("translate", "transform(" + margin + "," + margin + ")");
        createLegend();
        d3.csv("pokemon.csv").then((resp => makeScatterPlot(resp)));
    }

    function createLegend() {
        let numOfType = Object.keys(colors).length;
        for (let i = 0; i < numOfType; i++) {
            let textContainer = gen("div");
            textContainer.classList.add("text-div");
            let cube = gen("div");
            cube.classList.add("cube");
            cube.style.background = Object.values(colors)[i];
            textContainer.appendChild(cube);
            let currText = Object.keys(colors)[i];
            
            let myText = gen("p");
            myText.textContent = currText;
            textContainer.appendChild(myText);
            id("type1").appendChild(textContainer);
        }
    }

    function makeScatterPlot(data) {
        let total = data.map((row) => parseInt(row["Total"]));
        let spdef = data.map((row) => parseInt(row["Sp. Def"]));
        let lgd = 0;
        let gene = 0;

        /***
         * Create x&y axis
         */
        let xScale = d3.scaleLinear()
                            .domain([d3.min(spdef) - 20,d3.max(spdef) + 10])
                            .range([0,svgSize.width - margin]);
        svg = d3.select("svg");
        svg.append("g")
            .attr("transform","translate(" + margin * 2 + "," + (svgSize.height - margin) + ")")
            .call(d3.axisBottom(xScale));
        svg.append("text")
            .attr("transform","translate(" + (svgSize.width/2) + "," + (margin + svgSize.height) + ")")
            .text("Sp. Def");

        let yScale = d3.scaleLinear()
                        .domain([d3.min(total) - 50, d3.max(total) + 100])
                        .range([svgSize.height - margin, 0]);
        svg.append("g")
            .attr("transform","translate(" + margin * 2 + "," + 0 + ")")
            .call(d3.axisLeft(yScale));
        
        svg.append("text")
            .attr("transform","translate(" + margin/2 + "," + (svgSize.height/2) + ") rotate(-90)")
            .text("Total");
        
        

        /*********
         *  Create toolbar
         */
        drawPoints(xScale, yScale, data);
        id("lgd").addEventListener("change", function() {
            lgd = this.value;
            let currData = data;
            if (lgd == 1) {
                currData = data.filter(function(d){ return d["Legendary"] == "True" });
            } else if (lgd == 0) {
                currData = data.filter(function(d){ return d["Legendary"] == "False" });
            } else {
                currData = data;
            }
            drawPoints(xScale, yScale, currData);
        });

        id("generation").addEventListener("change", function() {
            gene = this.value;
            let currData = data;
            if (gene == -1) {
                currData = data;
            } else {
                currData = data.filter(function(d){ return d["Generation"] == gene });
            }
            drawPoints(xScale, yScale, currData);
        })
    }

    function drawPoints(xScale, yScale, data) {
        let allCircle = qsa("circle");
        for (let i = 0; i < allCircle.length; i++) {
            qs("svg").removeChild(allCircle[i]);
        }
        let div = d3.select("#graph-container")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0)

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function(d) {
                    return xScale(d["Sp. Def"]) + margin*2;
                })
                .attr("cy", function(d) {
                    return yScale(d["Total"]);
                })
                .attr("r", 10)
                .attr("fill", function(d) {
                    let t1 = d["Type 1"];
                    return colors[t1];
                })
                .on("mouseover", (d) => {
                    div.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    let prompt = 'Name: ' + d['Name'] + '<br/>' + 'Type 1: ' + d['Type 1'] + '<br/>'
                    if (d["Type 2"] != "") {
                        prompt = prompt + "Type 2: " + d["Type 2"];
                    }
                    div.html(prompt)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px");
                })
                .on("mouseout", (d) => {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0)
                })
    }

    /* --- HELPER FUNCTIONS --- */

    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} name - element ID.
     * @returns {object} - DOM object associated with id.
     */
    function id(name) {
        return document.getElementById(name);
    }

    function qs(query) {
        return document.querySelector(query);
    }

    /**
     * Returns an array of elements matching the given query.
     * @param {string} query - CSS query selector.
     * @returns {array} - Array of DOM objects matching the given query.
     */
    function qsa(query) {
        return document.querySelectorAll(query);
    }

    /**
     * Create new element with the given type.
     * @param {string} elType - The name of html tag.
     * @returns {DOM} - A new DOM object with the given type.
     */
    function gen(elType) {
        return document.createElement(elType);
    }

})();
