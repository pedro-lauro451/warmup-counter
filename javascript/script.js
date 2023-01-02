var input = document.getElementById('input');
var gmail_wp = document.getElementById('gmail_wp');
var hotmail_wp = document.getElementById('hotmail_wp');
var yahoo_wp = document.getElementById('yahoo_wp');
var others_wp = document.getElementById('others_wp');
var trash = document.getElementById('trash');

var item = document.querySelectorAll('.item');

var day = [];
var gmail = [];
var hotmail = [];
var yahoo = [];
var outros = [];

var total_gmail = [];
var total_hotmail = [];
var total_yahoo = [];
var total_others = [];

var length = 0;
var total = 0;

var y = 0;

var isActive = false;

var colors = ["#B6FCE8", "#7CE964", "#EAE575", "#EAB375", "#7590EA", "#D775EA", "#75EACC", "#E18C7D", "#52A9D2", "#8e6dcf", "#d989c9", "#099FFF", "#67c79c", "#d64f4f"];

function deleteFilters(id) {
    while (id.firstChild) {
        id.removeChild(id.firstChild);
    }
    input.value = null;
    isActive = false;
}

function useDeleteFilters()
{
    deleteFilters(gmail_wp);
    deleteFilters(hotmail_wp);
    deleteFilters(yahoo_wp);
    deleteFilters(others_wp);
}

function calculateFilters(array, warmupLength, id, total) {

    var initialCount = 1;
    var start = [];
    var end = [];
    var d = 1;
    var campaign = 0;

    for (var i = 0; i < warmupLength; i++) {
        if (array[i] + initialCount > total) {
            initialCount = 1;
            campaign = campaign + 1;
        }
        start[i] = initialCount;
        end[i] = array[i] + initialCount;

        initialCount = initialCount + array[i];

        const para = document.createElement("p");
        para.innerHTML = "D" + d + "&nbsp;&nbsp;Início: " + Math.round(start[i]) + " Fim: " + Math.round(end[i] - 1);
        para.setAttribute("style", "margin:1; padding:10px; background-color:#000; border: 1px solid" + " " + colors[campaign] + ";" + "color:" + colors[campaign]);
        id.appendChild(para);
        d++;
    }
}

function useCalculateFilters()
{
    calculateFilters(gmail, length, gmail_wp, total_gmail);
    calculateFilters(hotmail, length, hotmail_wp, total_hotmail);
    calculateFilters(yahoo, length, yahoo_wp, total_yahoo);
    calculateFilters(outros, length, others_wp, total_others);
}

trash.onclick = function () {
    
    useDeleteFilters();
    trash.style.display = "none";

    day = [];
    gmail = [];
    hotmail = [];
    yahoo = [];
    outros = [];

    total_gmail = [];
    total_hotmail = [];
    total_yahoo = [];
    total_others = [];

    length = 0;
    total = 0;

    i = 0;
    y = 0;
}

input.addEventListener('change', function () {
    isActive = true;
    trash.style.display = "initial";
    item.forEach(item => {
        item.style.display = 'initial';
    });
    readXlsxFile(input.files[0])
        .then(
            function (data) {
                for (i = 0; i < data.length; i++) {
                    if (data[i][0] == "Total") {
                        total_gmail = data[i][1];
                        total_hotmail = data[i][2];
                        total_yahoo = data[i][3];
                        total_others = data[i][4];
                    }
                    if (Number.isInteger(data[i][0]) == true) {
                        day[y] = data[i][0];
                        gmail[y] = data[i][1];
                        hotmail[y] = data[i][2];
                        yahoo[y] = data[i][3];
                        outros[y] = data[i][4];
                        y++;
                    }
                }
                length = day.length;
                useCalculateFilters();
            }
        );
})