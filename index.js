"use strict";
(function() {
    const svgSize = {
        width : 400,
        height: 300,
    };
    const margin = 20;

    window.addEventListener("load", init);

    function init() {
        let svgBox = d3.select("#graph")
                        .append("svg")
                            .attr("width", svgSize.width + 2*margin)
                            .attr("height", svgSize.height + 2*margin)
                        .append("g")
                            .attr("translate", "transform(" + margin + "," + margin + ")");
                        
        d3.csv("pokemon.csv").then((resp => makeScatterPlot(resp)));
    }

    function makeScatterPlot(data) {
        let total = data.map((row) => parseInt(row["Total"]));
        //console.log(total)
        let spdef = data.map((row) => parseInt(row["Sp. Def"]));
        let name = data.map((row) => parseInt(row["Name"]));
        let type1 = data.map((row) => parseInt(row["Type 1"]));
        let type2 = data.map((row) => parseInt(row["Type 2"]));
        //let hp = data.map((row) => parseInt(row["HP"]));
        //let attack = data.map((row) => parseInt(row["Attack"]));
        //let defense = data.map((row) => parseInt(row["Defense"]));
        let generation = data.map((row) => parseInt(row["Generation"]));
        let legendary = data.map((row) => parseInt(row["Lengendary"]));
        //console.log(myData.name)

        /*********
         *  Create toolbar
         */
        id("lgd").addEventListener("onchange", function() {
            console.log(this.value);
        });

        /*let points = d3.selectAll("circle")
                        .data(myData)
                        .enter()
                        .append("circle")
                            .attr("x", function(d) {
                                d.name;
                                console.log(d.name)
                            })
                            .attr("fill", function(d) {

                            });*/


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
