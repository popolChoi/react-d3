import React, { Component } from 'react';
import { select } from "d3";

import * as d3 from "d3";
import weather_la from "./weather_la";
import Data from "./data";


class D3test extends Component {
    svgRef = React.createRef();

    componentDidMount(){
        const svg = select(this.svgRef.current); // selection 객체
        const boxWidth = 20;
        const boxHeight = 15;

        const lineNo = 20;
        const data = [...Array(100)].map(()=> Data.map(d =>( {value: d.value + Math.floor(Math.random() * 12)}) )).flat();
        const xAxisData =  [...Array(Math.ceil(data.length/ lineNo))];
        const buYlRdColorList =  [
            // "#BADBE1", 
            // "#82ACD2",
            // "#82ACD2", 
            // "#DDEFE2", 
            // "#E1F1E2", 
            // "#FAD896",
            // "#EF8355", 
            // "#ED714D", 
            // "#F4A16D", 
            // "#F3B586", 
            // "#B8C2C4", 
            // "#A3C8DA"


            "#313695", //0 
            "#4575B4", //8
            "#74ADD1", //16
            "#ABD9E9", //24
            "#E0F3F8", //32
            "#FFFFBF", //40
            "#FEE090", //48
            "#FDAE61", //56
            "#F46D43", //64
            "#D73027", //72
            "#A50026", //80
            "#5c024f", //88
            "#270029", //96
          



        ]
      
        // data
        const g = svg.selectAll('svg')
        .data(data)
        .enter()
        .append('g')
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("transform", (d, i, e) => {
            const no = Math.floor(i / lineNo);
            const no2 = i % lineNo;
            return `translate(${1 + (no * boxWidth) + no}, ${1 + (no2 * boxHeight) + no2})`;
            //matrix
        })
        ;

       
        g.append('rect')
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .style("fill", (d, i, e) =>{
            const color = buYlRdColorList[Math.floor(d.value / 8)];
            return color || buYlRdColorList[buYlRdColorList.length-1];
        })
        ;
        g.append('text')
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .text((d,i, r) => {

            return d.value
        })
        .attr("transform", (d, i, e) => {
            return `matrix(1, 0, 0, 1, ${boxWidth /2}, ${boxHeight -3})`;
        })
        .attr('text-anchor', 'middle')
        .style('font-size','10px' )
        .style("fill", "white")
        ;




       
        // xAxis
        const xAxisBlock =  svg
            .append('svg:g')
            .attr("transform", `translate( ${boxWidth/ 2 - 1}, ${lineNo * boxHeight + lineNo + 2})`)
            .attr("width", boxWidth)
            .attr("height", boxHeight);

        const xAxis = xAxisBlock.selectAll('g')
            .data(xAxisData)
            .enter()
            .append('g') 
            .attr("transform", (d, i, e) => `translate(${1 + (i * boxWidth) + i},0)`)  
        ; 

        xAxis.append('line')
            .attr("y2",6)
            .style('stroke','#1b1e23' )
            .style('stroke-width','1' )
            this.setResize();
            window.addEventListener('resize',() => this.setResize())
           
        ;

        xAxis.append('text')
            .text((d,i) => i)
            .attr("transform", `translate(-4.5, 16)`)
            .style('font-size','10px' )
        ;
    }

    setResize(){
        const svg = select(this.svgRef.current); // selection 객체
        svg
        .attr("width", window.innerWidth - 2 + 'px')
        .attr("height",  window.innerHeight - 7 + 'px')
        .style("border", "1px solid rgba(0,0,0,0.1)");
    }



    setSvgRef(){
        console.log('https://flamingotiger.github.io/frontend/d3/d3-barchart/');
        const svg = select(this.svgRef.current) // selection 객체

        const svgWidth = 300;
        const svgHeight = 300;
        const padding = 30;
        const data = [...Array(10)].map(() => 30);

      
        // svg
        // .attr("width", svgWidth)
        // .attr("height", svgHeight)
        // .style("border", "1px solid rgba(0,0,0,0.1)");


         // xAxis
         //axis 아랫방향으로 scale을 적용한 축을 그립니다.
        const xAxisScale = d3
        .scaleBand()
        .domain(data.map((d, i) => i)) // 실제값의 범위 index값
        .range([padding, svgWidth - padding]) // 변환할 값의 범위
        .padding(0.1); // 내부 padding
        const xAxis = d3.axisBottom().scale(xAxisScale);
        const xAxisTranslate = svgWidth - padding;
        svg
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${xAxisTranslate})`);

        // yAxis
        const yAxisScale = d3
        .scaleLinear()
        .domain([0, d3.max(data)]) // 실제값의 범위
        .range([svgHeight - padding, padding]); // 변환할 값의 범위(역으로 처리)
        const yAxis = d3.axisLeft().scale(yAxisScale);
        svg
        .append("g")
        .call(yAxis)
        .attr("transform", `translate(${padding}, 0)`);

         // data
        svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", (d) => svgHeight - yAxisScale(d) - padding)
        .attr("width", xAxisScale.bandwidth())
        .attr("x", (d, i) => xAxisScale(i))
        .attr("y", (d) => yAxisScale(d))
        .attr("fill", "orange");
    }





    render() {
        return (
            <React.Fragment>
                <svg ref={this.svgRef} >

                </svg>
            </React.Fragment>
      
        );
    } 

}

export default D3test;
