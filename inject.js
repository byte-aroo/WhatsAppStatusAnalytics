function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }


function generateName() {
    var today = new Date();
    var hours = String(today.getHours())
    var mins = String(today.getMinutes())
    var seconds = String(today.getSeconds())
    var capturedOn = "_"+hours+":"+mins+":"+seconds

    try {
        dateOfStatus = document.querySelector("#app > div > span:nth-child(3) > div > span > div > div > span > div > div > div > div > div._1DNOU._1VRZa.ib1vZ > div._20zpf > div._5SjOa").textContent.split(" ")
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var pre = getPreviousDay(today)
        var pdd = String(pre.getDate()).padStart(2, '0');
        var pmm = String(pre.getMonth() + 1).padStart(2, '0'); //January is 0!
        var pyyyy = pre.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        yesterday = pmm + '/' + pdd + '/' + pyyyy;
        
        if (dateOfStatus[0] == 'today') {
            return(today+"-"+dateOfStatus[2]+dateOfStatus[3]+capturedOn)
        }
        else {
            return(yesterday+"-"+dateOfStatus[2]+dateOfStatus[3]+capturedOn)
        }   
    } catch (error) {
        return "statusAnalytics"+capturedOn
    }
}


async function getDataInCsv() {
    try {
        var changeWidth = document.querySelector("#app > div > span:nth-child(2) > div > div > div > div")
        changeWidth.style.cssText = 'height: 999999999px; width: 400px; opacity: 0; transform: scaleX(1) scaleY(1);'

        await sleep(2000)

        var htmlString = document.querySelector("#app > div > span:nth-child(2) > div > div > div > div > div > div > div > div > div > div")
        var spans = htmlString.getElementsByTagName('span')
        var csvFileData = [];
        var totalCount = 0;
        for (var i = 0; i < spans.length; i++) {
            var info = spans[i].getAttribute('title')


            if (info != null) {
                totalCount += 1
                var name = info
                i = i + 1
                // console.log(spans[i].getAttribute('title'))
                var time = spans[i].getAttribute('title')
                localData = [name, time]
                csvFileData.push(localData);
            }
        }
        // console.log(totalCount)
        
        var csvFileName = generateName()

        saveScreenshot(csvFileName)

        changeWidth.style.cssText = 'height: 500px; width: 400px; opacity: 1; transform: scaleX(1) scaleY(1);'

        var csv = 'Name,Time\n';
        csvFileData.forEach(function (row) {
            csv += row.join(',');
            csv += "\n";
        });

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = csvFileName + '.csv';
        hiddenElement.click();
    } catch (error) {
        try {
            changeWidth.style.cssText = 'height: 500px; width: 400px; opacity: 1; transform: scaleX(1) scaleY(1);'
        } catch (error) {
        }
        // console.log(error)
        alert("Open whatsapp status viewers list then click on this extension....")
    }
}

function saveScreenshot(csvFileName) {

    const srcElement = document.querySelector("body");
    html2canvas(srcElement).then(canvas => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = csvFileName + ".jpg";
        a.click();
    });
}

if (extension_statuss == 'on') {
    // var csvFileName = window.prompt("Enter csv file name : ");
    getDataInCsv()
}


