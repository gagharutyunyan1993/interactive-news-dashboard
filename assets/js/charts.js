export async function initCharts() {
    function generateMonthTabs() {
        const ulElement = document.querySelector('.tabsSecond');
        if (!ulElement) return;

        ulElement.innerHTML = '';

        const monthsToGenerate = 12;
        const now = new Date();

        for (let i = 0; i < monthsToGenerate; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
            const monthName = date.toLocaleString('en-US', { month: 'short' });
            const yearShort = date.getFullYear().toString().slice(-2);
            const monthText = `${monthName}, ${yearShort}`;

            const target = (i % 2 === 0) ? "#tabs-1" : "#tabs-2";

            const li = document.createElement('li');
            li.classList.add('month');

            if (i === 0) li.classList.add('selected');

            const a = document.createElement('a');
            a.href = target;
            a.textContent = monthText;

            li.appendChild(a);
            ulElement.appendChild(li);
        }
    }

    function generateMockData(count, offset = 0, monthIndex = 0) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const value = Math.floor(Math.random() * 100) + monthIndex * 5 + offset;
            data.push({ y: value });
        }
        return data;
    }

    function updateCharts(monthIndex) {
        const chart1DataPoints = generateMockData(9, 0, monthIndex);
        const chart2DataPoints = generateMockData(9, 0, monthIndex);

        const options1 = {
            animationEnabled: true,
            axisX: { labelFontSize: 14 },
            axisY: { labelFontSize: 14 },
            data: [{
                type: "line",
                dataPoints: chart1DataPoints
            }, {
                type: "line",
                dataPoints: chart2DataPoints
            }]
        };

        const options2 = {
            axisX: { labelFontSize: 14 },
            axisY: { labelFontSize: 14 },
            data: [{
                type: "line",
                dataPoints: chart1DataPoints
            }, {
                type: "line",
                dataPoints: chart2DataPoints.map(point => ({ y: point.y + 5 }))
            }]
        };

        $("#chartContainer1").CanvasJSChart(options1);
        $("#chartContainer2").CanvasJSChart(options2);
    }

    generateMonthTabs();

    $("#tabs2").tabs();
    $("#tabs").tabs({
        create: function () {
            updateCharts(0);
        },
        activate: function (event, ui) {
            ui.newPanel.children().first().CanvasJSChart().render();
        }
    });

    const monthTabs = document.querySelectorAll('.tabsSecond .month');
    monthTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            monthTabs.forEach(t => t.classList.remove('selected'));
            tab.classList.add('selected');

            updateCharts(index);
        });
    });

    const container = document.querySelector('.tabsSecond');
    const leftArrow = document.querySelector('.arrow:first-of-type');
    const rightArrow = document.querySelector('.arrow:last-of-type');
    const scrollAmount = 100;

    if (leftArrow && container) {
        leftArrow.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
    if (rightArrow && container) {
        rightArrow.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}
