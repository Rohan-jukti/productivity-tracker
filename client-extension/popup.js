document.getElementById("load").addEventListener("click", async () => {
    try {
        const res = await fetch("http://localhost:5000/api/activity/today");
        const data = await res.json();

        let siteMap = {};

        data.forEach(item => {
            if (
                item.url &&
                !item.url.startsWith("chrome://") &&
                !item.url.startsWith("chrome-extension://")
            ) {
                let url = item.url
                    .replace("https://", "")
                    .replace("http://", "")
                    .split("/")[0];

                // merge same sites
                if (siteMap[url]) {
                    siteMap[url] += item.timeSpent;
                } else {
                    siteMap[url] = item.timeSpent;
                }
            }
        });

        let html = "";

        if (Object.keys(siteMap).length === 0) {
            html = "<p>No data yet</p>";
        } else {
            for (let site in siteMap) {
                html += `<p>${site} - ${siteMap[site]}s</p>`;
            }
        }

        document.getElementById("data").innerHTML = html;

    } catch (err) {
        document.getElementById("data").innerHTML = "Error loading data";
        console.log(err);
    }
});