import ChartColor from '../utils/ChartColors';

export function formatLineChart(data) {

    let allData =[];


    let level = {
        data: {
            labels: data.labels,
            datasets: data.datasets
        },
        chartType: 'line',
        title: data.title,
        options: {

            legend: {
                display: true,
                position: "bottom"
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    };

    allData.push(level);
    //   console.log("Data Set: ",level,"\n",allData,"\n",labels,"\n",headCounts)
    //   return item;
    // });

    return allData;
}

export function formatPieChart(data) {

    let allData =[];
    let datasets = [];

    datasets.push({

        label: "",
        data: data.datasets[0].data,
        borderColor: ChartColor.hashtagColors,
        backgroundColor: ChartColor.hashtagColors,

    });


    let level = {
        data: {
            labels: data.labels,
            datasets: datasets
        },
        chartType: 'pie',
        title: data.title,
        options: {
            cutoutPercentage: 60,
            legend: {
                display: false,

            },
            responsive: true,
            maintainAspectRatio: false,
        }
    };

    allData.push(level);
    //   console.log("Data Set: ",level,"\n",allData,"\n",labels,"\n",headCounts)
    //   return item;
    // });

    return allData;
}