async function search() {
    const q = document.getElementById("query").value;

    const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    const container = document.getElementById("results");
    container.innerHTML = "";

    if (data.fallback) {
        container.innerHTML = "<div class='card'>⚠ No results. Try broader query.</div>";
        return;
    }

    data.results.forEach(r => {
        container.innerHTML += `
        <div class="card">
            <b>${r.name}</b><br/>
            Type: ${r.type}<br/>
            Location: ${r.location}<br/>
            <span class="score">Score: ${r.score.toFixed(2)}</span><br/>
            <small>${r.explanation}</small>
        </div>
        `;
    });
}