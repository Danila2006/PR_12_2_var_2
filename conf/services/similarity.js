export function similarity(item, query) {
    let score = 0;

    if (query.observes && item.observes === query.observes) {
        score += 0.6;
    }

    if (query.location && item.location === query.location) {
        score += 0.3;
    }

    if (!query.observes && !query.location) {
        score += 0.1;
    }

    return score;
}