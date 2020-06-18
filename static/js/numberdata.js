const templates = document.getElementsByClassName("numchart")[0].getContext('2d');
const bar_templates = document.getElementsByClassName("barchart")[0].getContext('2d');
Chart.defaults.global.defaultFontFamily = "'Do Hyeon', sans-serif";
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = '#393d3c';

const colorCode_red = '#8ac9dc';
const colorCode_green = '#a6f3b2';

const gradient = bar_templates.createLinearGradient(500, 0, 100, 0);
gradient.addColorStop(0, colorCode_green);
gradient.addColorStop(1, colorCode_red);

const createElementPdata = (content) => {
    const div = document.getElementsByClassName("number")[0];
    const createP = document.createElement("p");

    if (typeof content === "string") {
        createP.innerHTML = content;
    }

    else {
        if (content > 0 && content < 30) {
            createP.innerHTML += ("혼잡도: 낮음");
        }

        else if (content >= 30 && content < 70) {
            createP.innerHTML += ("혼잡도: 중간");
        }

        else if (content >= 70 && content < 100) {
            createP.innerHTML += ("혼잡도: 높음");
        }

        else if (content === 100) {
            createP.innerHTML += ("혼잡도: 매우 높음");
        }

        else if (content === 0) {
            createP.innerHTML += ("혼잡도: 쾌적");
        }
    }

    return div.appendChild(createP);
};

let get_data = () => {
    fetch("/api/v1/getdata").then(res => res.json()).then(result => { 
        let datas = result.person_num;
        let congestion_degree = result.data;

        const checkMediaData = () => {
            if (document.body.clientWidth < 800) {
                return true;
            }

            else {
                return false;
            }
        };

        if (checkMediaData() === true) {
            createElementPdata(congestion_degree);
            new Chart(bar_templates, {
                type: 'horizontalBar',
                data: {
                    labels: ["%"],
                    datasets: [
                        {
                            data: [congestion_degree],
                            backgroundColor: [
                                gradient
                            ],

                            borderColor: [
                                gradient
                            ],

                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100
                            }
                        }]
                    }
            }
            });

            new Chart(templates, {
                type: 'bar',
                data: {
                    labels: [
                        "일간", "주간", "월간"
                    ],
                    datasets: [
                        {
                            data: datas,
                            backgroundColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    minRotation : 90,
                                    beginAtZero: true,
                                    stepSize: 1,
                                }
                            }
                        ]
                    }
                }
            });

            console.clear();
        }

        else {
            createElementPdata(congestion_degree);
            new Chart(bar_templates, {
                type: 'horizontalBar',
                data: {
                    labels: ["%"],
                    datasets: [
                        {
                            data: [congestion_degree],
                            backgroundColor: [
                                gradient
                            ],

                            borderColor: [
                                gradient
                            ],

                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100
                            }
                        }]
                    }
            }
            });

            new Chart(templates, {
                type: 'bar',
                data: {
                    labels: [
                        "일간", "주간", "월간"
                    ],
                    datasets: [
                        {
                            data: datas,
                            backgroundColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: '(명)'
                                },
                                ticks: {
                                    minRotation : 90,
                                    beginAtZero: true,
                                    stepSize: 1,
                                }
                            }
                        ]
                    }
                }
            });

            console.clear();
        }
    }).catch((err) => {
        new Chart(bar_templates, {
            type: 'horizontalBar',
            data: {
                labels: ["%"],
                datasets: [
                    {
                        data: [0],
                        backgroundColor: [
                            gradient
                        ],

                        borderColor: [
                            gradient
                        ],

                        borderWidth: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false,
                },
                maintainAspectRatio: true,
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100
                        }
                    }]
                }
        }
        });

        new Chart(templates, {
            type: 'bar',
            data: {
                labels: [
                    "일간", "주간", "월간"
                ],
                datasets: [
                    {
                        data: [0, 0, 0],
                        backgroundColor: [
                            '#79bd9a',
                            '#a8dba8',
                            '#cff09e'
                        ],
                        borderColor: [
                            '#79bd9a',
                            '#a8dba8',
                            '#cff09e'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                maintainAspectRatio: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                            }
                        }
                    ]
                }
            }
        });

        createElementPdata("오류가 발생하여 데이터를 불러올 수 없습니다." + err.toString());
        console.clear();

        alertMessage();
        throw err;
    });
};

let get_interval_data = () => {
    fetch("/api/v1/getdata").then(res => res.json()).then(result => { 
        let datas = result.person_num;
        let congestion_degree = result.data;

        const checkMediaData = () => {
            if (document.body.clientWidth < 800) {
                return true;
            }

            else {
                return false;
            }
        };

        if (checkMediaData() === true) {
            new Chart(bar_templates, {
                type: 'horizontalBar',
                data: {
                    labels: ["%"],
                    datasets: [
                        {
                            data: [congestion_degree],
                            backgroundColor: [
                                gradient
                            ],

                            borderColor: [
                                gradient
                            ],

                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100
                            }
                        }]
                    }
            }
            });

            new Chart(templates, {
                type: 'bar',
                data: {
                    labels: [
                        "일간", "주간", "월간"
                    ],
                    datasets: [
                        {
                            data: datas,
                            backgroundColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                }
                            }
                        ]
                    }
                }
            });

            console.clear();
        }

        else {
            new Chart(bar_templates, {
                type: 'horizontalBar',
                data: {
                    labels: ["%"],
                    datasets: [
                        {
                            data: [congestion_degree],
                            backgroundColor: [
                                gradient
                            ],

                            borderColor: [
                                gradient
                            ],

                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100
                            }
                        }]
                    }
            }
            });

            new Chart(templates, {
                type: 'bar',
                data: {
                    labels: [
                        "일간", "주간", "월간"
                    ],
                    datasets: [
                        {
                            data: datas,
                            backgroundColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderColor: [
                                '#79bd9a',
                                '#a8dba8',
                                '#cff09e'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: '(명)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                }
                            }
                        ]
                    }
                }
            });

            console.clear();
        }
    }).catch((err) => {
        new Chart(bar_templates, {
            type: 'horizontalBar',
            data: {
                labels: ["%"],
                datasets: [
                    {
                        data: [0],
                        backgroundColor: [
                            gradient
                        ],

                        borderColor: [
                            gradient
                        ],

                        borderWidth: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false,
                },
                maintainAspectRatio: true,
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100
                        }
                    }]
                }
        }
        });

        new Chart(templates, {
            type: 'bar',
            data: {
                labels: [
                    "일간", "주간", "월간"
                ],
                datasets: [
                    {
                        data: [0, 0, 0],
                        backgroundColor: [
                            '#79bd9a',
                            '#a8dba8',
                            '#cff09e'
                        ],
                        borderColor: [
                            '#79bd9a',
                            '#a8dba8',
                            '#cff09e'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                maintainAspectRatio: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                            }
                        }
                    ]
                }
            }
        });

        createElementPdata("오류가 발생하여 데이터를 불러올 수 없습니다." + err.toString());
        console.clear();

        alertMessage();
        throw err;
    });
};

const func = () => {
        setInterval(() => {
        get_interval_data();
    }, 30000);
};
const alertMessage = () => {
    alert("오류가 발생하였습니다.");
    
    setInterval(() => {
        alert("오류가 발생하였습니다.");
    }, 100000);
};
get_data();
func();