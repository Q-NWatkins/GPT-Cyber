document.addEventListener("DOMContentLoaded", () => {
    // Calendar Setup
    const calendarDiv = document.getElementById("calendar");
    const newsResults = document.getElementById("news-results");

    if (calendarDiv) {
        const currentDate = new Date();
        calendarDiv.innerHTML = `
            <input type="date" id="selected-date" max="${currentDate.toISOString().split("T")[0]}" />
            <button id="fetch-news-btn">Fetch News</button>
        `;

        document.getElementById("fetch-news-btn").addEventListener("click", () => {
            const selectedDate = document.getElementById("selected-date").value;
            if (!selectedDate) {
                alert("Please select a date!");
                return;
            }

            fetch("/fetch_news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date: selectedDate }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.articles) {
                        newsResults.innerHTML = data.articles
                            .map(
                                (article) => `
                                <article>
                                    <h3>${article.title}</h3>
                                    <p>${article.description}</p>
                                    <a href="${article.url}" target="_blank">Read more</a>
                                </article>
                            `
                            )
                            .join("");
                    } else {
                        newsResults.innerHTML = "<p>No news found for this date.</p>";
                    }
                })
                .catch(() => {
                    newsResults.innerHTML = "<p>Error fetching news. Try again later.</p>";
                });
        });
    }
});
