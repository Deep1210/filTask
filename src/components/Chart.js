import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chartjs from 'chart.js';
import _ from 'lodash';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import datalabels from "chartjs-plugin-datalabels";
Chartjs.plugins.register(datalabels);

Chartjs.defaults.global.plugins.datalabels.display = false;
Chartjs.defaults.global.plugins.datalabels.rotation = -90;
Chartjs.defaults.global.animation.duration = 0;


const defaultLegendClickHandler = Chartjs.defaults.global.legend.onClick;

Chartjs.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
  });

  // disabling animation
  Chartjs.defaults.global.animation.duration = 0;

function ChartModule(ctx, opt) {
    return new Chartjs(ctx, opt);
}
function pointLegends (options) {
    options.legend = {
        position: 'top',
        labels: {
            usePointStyle: true,
            fontSize: 10
        }
    }

    return options;
}

const styleLegends = (options, props) => {
    options.legend = {
        display: false,
        position: 'bottom'
    };
    options.legendCallback = (chart) => {
        let text = [];
        text.push('<ul class='+chart.id+'>');
        // if (chart.config.type === 'doughnut' || chart.data.datasets.length <= 1) {
        if (chart.config.type === 'doughnut') {
            chart.data.labels.map((label, index)=>{
                let bg = chart.data.datasets[0].backgroundColor;
                if (_.isArray(bg)) {
                    bg = bg[index]
                }
                if (!props.belongsTo){
                  text.push(
                    `<li>
                        <span
                            style="background-color: ${bg};padding-top:0px;padding-bottom:0px;"
                            data-index="${index}"
                        >
                            ${label}
                        </span>
                    </li>`
                  );
                }
                return label;
            });
        } else {
            if(chart.data.datasets.length > 0){
            chart.data.datasets.map((data, index)=>{
                if (data && data.hidden){
                    text.push("<li><span style='background-color:rgba(211,211,211,0.8);padding-top:0px;padding-bottom:0px;' data-index='"+index+"'>"+data.label+"</span></li>");
                } else {
                    text.push("<li><span style='background-color:"+data.backgroundColor+";padding-top:0px;padding-bottom:0px;' data-index='"+index+"'>"+data.label+"</span></li>");
                }
                return data;
            });}
        }
        text.push("</ul>");
        return text.join('');
    }
    return options;
}



function addComma(opt) {
    if (opt.tooltips) {
        opt.tooltips.callbacks = {
            label: function(tooltipItem, data) {
                if(data.datasets.length >  0){
                var value = data.datasets[0].data[tooltipItem.index];
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
                }
            }
        }
    } else {
        opt.tooltips = {
            callbacks: {
                label: function(tooltipItem, data) {
                    if(data.datasets.length >  0){
                    var value = data.datasets[0].data[tooltipItem.index];
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(',');
                    return value;
                    }
                }
            }
        }
    }
    return opt;
}

function renderChart(props, canvas) {
    const options = styleLegends(props.options || {}, props);
    const type = props.type || "line";
    const data = props.data;
    if (_.isEmpty(props.data)) {
        return null;
    }
    return ChartModule(
        canvas.getContext('2d'),
        { type, data, options }
    );
}

function renderDrillChart(state, canvas, props) {
    const level = state.data[state.level];
    const options = styleLegends(level.options || {}, props);
    const type = level.chartType || 'line';
    const data = level.data;
    if (_.isEmpty(state.data)) {
        return null;
    }
    return ChartModule(
        canvas.getContext('2d'),
        { type, data, options }
    );
}

function renderDrillChartStatic(state, canvas, props) {
    const level = state.data[state.level];
    const options = styleLegends(level.options || {}, props);
    const type = level.chartType || 'line';
    const data = level.data;
    options.animation = false;
    if (_.isEmpty(state.data)) {
        return null;
    }
    return ChartModule(
        canvas.getContext('2d'),
        { type, data, options }
    );
}

function isArray(data) {
    return _.isArray(data);
}

function drillDown(data, level, label, datasetLabel) {
    let originalData = null;

    _.map(data, (d, i) => {
        let labelIndex = 0;
        let dataLabel = _.find(d.data.labels, (val, lIndex) => {
            labelIndex = lIndex;
            return val === label;
        })
        let dataBase = _.find(d.data.datasets, (val) => {
            return val.label === datasetLabel && val.drillDown
        });
        if (dataLabel && dataBase) {
            level = i;
            originalData = d.originalData[labelIndex];
        }
        return d;
    });

    if (level < data.length - 1) {
        level += 1;
        return {
            level,
            originalData
        }
    }
    return {
        level,
        originalData
    }
}

function crossFilter(data, level, label, datasetLabel) {
    let originalData = null;

    _.map(data, (d, i) => {
        let labelIndex = 0;
        let dataLabel = _.find(d.data.labels, (val, lIndex) => {
            labelIndex = lIndex;
            return val === label;
        })
        let dataBase = _.find(d.data.datasets, (val) => {
            return val.label === datasetLabel
        });
        if (dataLabel && dataBase) {
            level = i;
            originalData = d.originalData[labelIndex];
        }
        return d;
    });

    return {
        level,
        originalData
    }
}

function crossFilterCircular(data, level, index) {
    let originalData = null;

    _.map(data, (d, i) => {
        if (d.originalData.length > index && i === 0) {
            originalData = d.originalData[index];
        }
        return d;
    });

    return {
        level,
        originalData
    }
}

function drillUp(data, level, filters) {
    let appliedFilters = [];

    if (level > 0) {
        level -= 1;
    }

    if (filters.length) {
        _.map(data, (d, i) => {
            if (i >= level) {
                _.map(d.originalData, (od) => {
                    _.map(filters, (f) => {
                        if (f.id === od.id) {
                            appliedFilters.push(f);
                        }
                        return f;
                    });
                    return od;
                });
            }
            return d;
        })
    }

    return {
        level,
        appliedFilters
    }
}

function removeCrossFilter(data, level, filters) {
    let appliedFilters = [];

    if (filters.length) {
        _.map(data, (d, i) => {
            if (i >= level) {
                _.map(d.originalData, (od) => {
                    _.map(filters, (f) => {
                        if (f.id === od.id) {
                            appliedFilters.push(f);
                        }
                        return f;
                    })
                    return od;
                });
            }
            return d;
        })
    }

    return {
        level,
        appliedFilters
    }
}

function applyFilters(data, filters) {
    let level = 0, increaseIndex = false;
    if (filters.length) {
        _.map(data, (d, index) => {
            _.map(d.originalData, (od) => {
                _.map(filters, (f) => {
                    if (f.id === od.id &&
                        f.dataType === od.dataType) {
                        level = index;
                        increaseIndex = true;
                    }
                    return f;
                });
                return od;
            });
            return d;
        });

        if (level < data.length - 1 && increaseIndex) {
            level += 1;
        }
    }

    return level;
}

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            level: 0,
            isDrillDown: false,
            isStatic: true,
            legend:'',
            displayLegend:this.props.displayLegend != undefined ? this.props.displayLegend : true
        }
        this.chart = null;
        this.updateChartByLegend = this.updateChartByLegend.bind(this)
    }

    componentDidMount() {
        if (this.state.isDrillDown || !this.state.isStatic) {
            this.chart = renderDrillChart(this.state, this.refs.canvas, this.props);
        } else {
            this.chart = renderChart(this.props, this.refs.canvas);
        }
        if (this.props.onRender) {
            this.props.onRender(this.refs.canvas);
        }
        this.setState({
            legend: this.chart.generateLegend()
        });
        if (this.props.height && this.props.height > 0) {
            // this.refs.canvas.style.height = this.props.height
            // this.refs.canvas.height = this.props.height
        }
    }

    componentWillMount() {
        if (this.props.drillDown) {
            if(isArray(this.props.data)) {
                if (this.props.drillDownFilters) {
                    this.setState({
                        level: applyFilters(this.props.data, this.props.drillDownFilters)
                    });
                }
                return this.setState({
                    data: this.props.data,
                    isDrillDown: true,
                    isStatic: false
                });
            }
        }

        if (isArray(this.props.data)) {
            return this.setState({
                data: this.props.data,
                isStatic: false
            });
        }
        if(this.props.displayLegend){
            this.setState({
                legend: this.chart.generateLegend()
            });
        }

    }

    componentWillReceiveProps(props) {
        if (props.drillDown) {
            if(isArray(props.data)) {
                if (props.drillDownFilters) {
                    const level = applyFilters(props.data, props.drillDownFilters)
                    this.setState({
                        level
                    });
                    this.updateChartHard({
                        data: props.data,
                        level
                    });
                }

                this.setState((prevState) => {
                    return {
                        data: props.data,
                        isDrillDown: true,
                        isStatic: false
                    }
                });
                return this.setState({
                    legend: this.chart.generateLegend()
                });
            }
        }

        if (isArray(props.data)) {
            this.setState({
                data: props.data,
                isStatic: false
            });
            this.updateChartHard({
                data: props.data,
                level: this.state.level
            });
            return this.setState({
                legend: this.chart.generateLegend()
            });
        }

        if (!_.isEmpty(props.data) && this.chart) {
            this.chart.config.data = props.data;
            this.chart.update();
        }
        this.setState({
            legend: this.chart.generateLegend()
        });
        return true;
    }

    componentWillUnmount() {
        this.disposeChart();
        this.setState({
            legend: ''
        });
    }

    updateChart(data) {
        if (this.chart) {
            this.chart.config.data = data;
            this.chart.update();
        }
    }

    updateChartHard(state) {
        this.disposeChart();
        if (this.state.isDrillDown || !this.state.isStatic) {
            return this.chart = renderDrillChartStatic(state, this.refs.canvas, this.props);
        }
        this.chart = renderChart(this.props, this.refs.canvas);
    }

    disposeChart() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    getCanvasData(e) {
        if (!this.props.onChartClick) return;
        const evt = this.chart.getElementAtEvent(e);
        if (this.props.drillDown) {
            if (evt[0] && evt[0]._model) {
                const model = evt[0]._model;
                if (model.label && model.datasetLabel) {
                    const outputData = drillDown(
                        this.state.data,
                        this.state.level,
                        model.label,
                        model.datasetLabel
                    );

                    if (outputData.originalData && this.props.onChartClick) {
                        this.setState({
                            level: outputData.level
                        });

                        return this.props.onChartClick(outputData.originalData)
                    }
                }
            } else {
                if (this.props.drillDownFilters && this.props.detectOutsideClick) {
                    if (this.props.onChartClick) {
                        const outData = drillUp(this.state.data, this.state.level, this.props.drillDownFilters);
                        if (outData.appliedFilters.length) {
                            this.setState({
                                level: outData.level
                            });
                            return this.props.onChartClick(outData.appliedFilters);
                        }
                    }
                }
            }
        } else {
            if (!this.state.isStatic) {
                if (evt[0] && evt[0]._model) {
                    const model = evt[0]._model;
                    if (model.label && model.datasetLabel) {
                        const outputData = crossFilter(
                            this.state.data,
                            this.state.level,
                            model.label,
                            model.datasetLabel
                        );

                        if (outputData.originalData && this.props.onChartClick) {
                            this.setState({
                                level: outputData.level
                            });
                            return this.props.onChartClick(outputData.originalData)
                        }
                    }
                    if ((model.label && this.state.data[this.state.level].chartType === 'doughnut') ||
                        (model.label && this.state.data[this.state.level].chartType === 'pie')) {
                            let index = evt[0]._index;
                            const outputData = crossFilterCircular(
                                this.state.data,
                                this.state.level,
                                index
                            );

                            if (outputData.originalData && this.props.onChartClick && outputData.originalData.dataType) {
                                this.setState({
                                    level: outputData.level
                                });

                                return this.props.onChartClick(outputData.originalData)
                            }
                        }
                } else {
                    if (this.props.drillDownFilters && this.props.detectOutsideClick) {
                        if (this.props.onChartClick) {
                            const outData = removeCrossFilter(this.state.data, this.state.level, this.props.drillDownFilters);
                            if (outData.appliedFilters.length) {
                                this.setState({
                                    level: outData.level
                                });
                                return this.props.onChartClick(outData.appliedFilters);
                            }
                        }
                    }
                }
            }
        }
    }
    updateChartByLegend(e){
        let index = parseInt(e.target.dataset.index);
        // if (this.chart.data.datasets.length === 1 || this.chart.config.type === 'doughnut') {
        if (this.chart.config.type === 'doughnut') {
            const { data } = this.chart;
            if (!data.cachedData) {
                data.cachedData = new Array(data.datasets[0].data.length);
                this.chart.data.cachedData = data.cachedData;
            }
            if (data.cachedData[index]) {
                if (data.cachedData[index].toggle) {
                    this.chart.data.datasets[0].data[index] = data.cachedData[index].value
                    this.chart.data.cachedData[index].toggle = false;
                } else {
                    this.chart.data.datasets[0].data[index] = 0;
                    this.chart.data.cachedData[index].toggle = true;
                }
            } else {
                this.chart.data.cachedData.splice(index, 0, {
                    toggle: true,
                    value: this.chart.data.datasets[0].data[index]
                })
                this.chart.data.datasets[0].data[index] = 0
            }
        } else {
            let meta = this.chart.getDatasetMeta(index)
            this.chart.data.datasets[index].hidden = meta.hidden === null ? !this.chart.data.datasets[index].hidden : null;
        }
        this.setState({legend: this.chart.generateLegend()});
        this.chart.update();
    }
    render() {
        let {legend} = this.state;
        return (
            <div className="container-fluid">
                {this.props.showTitle &&
                    <div>
                        {this.state.data[this.state.level].title}
                    </div>
                }
                {/* <div className="row"> */}
                <div style = {{height: this.props.height}}>
                    <div style = {{position: 'relative', height: this.state.displayLegend? '90%' : '100%'}}>
                        <canvas
                            ref="canvas"
                            // height={this.props.height}
                            // style = {{height: this.props.height}}
                            onClick={e => this.getCanvasData(e)}
                        />
                    </div>
                    {this.state.displayLegend?
                    <div className="no-select chartjs-legend row justify-content-center"
                        onClick={this.updateChartByLegend}
                        style = {{height: '10%'}}
                    >{Parser(legend)}
                    </div>:''}
                </div>
            </div>
        )
    }
}

Chart.propTypes = {
    data: PropTypes.any.isRequired,
    drillDown: PropTypes.bool,
    showTitle: PropTypes.bool,
    detectOutsideClick: PropTypes.bool,
    drillDownFilters: PropTypes.array,
    onChartClick: PropTypes.func,
    onRender: PropTypes.func
}
