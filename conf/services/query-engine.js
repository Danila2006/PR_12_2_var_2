import { similarity } from "./similarity.js";
import { infer } from "./semantic-reasoner.js";

const database = [
    { id: 1, name: "LivingRoom_Temperature", observes: "temperature", location: "LivingRoom", type: "ssn:Sensor" },
    { id: 2, name: "LivingRoom_Humidity", observes: "humidity", location: "LivingRoom", type: "ssn:Sensor" },
    { id: 3, name: "LivingRoom_Light", observes: "light", location: "LivingRoom", type: "sosa:Actuator" },
    { id: 4, name: "Kitchen_Temperature", observes: "temperature", location: "Kitchen", type: "ssn:Sensor" }
];

function parseQuery(q = "") {
    const observes = q.match(/observes\s*=\s*"?(\w+)"?/i)?.[1];
    const location = q.match(/location\s*=\s*"?(\w+)"?/i)?.[1];

    const isActuator = /actuator/i.test(q);

    return {
        observes: observes || null,
        location: location || null,
        type: isActuator ? "sosa:Actuator" : null,
        raw: q
    };
}

export function execute(query) {
    const parsed = parseQuery(query);

    const results = database.map(item => {
        const enriched = infer(item);
        const score = similarity(item, parsed);

        return {
        ...enriched,
        score,
        explanation: generateExplanation(item, parsed, score)
        };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

    return {
        query: parsed.raw,
        count: results.length,
        results,
        fallback: results.length === 0
    };
}

function generateExplanation(item, query, score) {
    const parts = [];

    if (query.observes === item.observes) {
        parts.push("matches observable property");
    }

    if (query.location === item.location) {
        parts.push("location match");
    }

    return parts.length
        ? `${parts.join(", ")} → score ${score.toFixed(2)}`
        : `low relevance → score ${score.toFixed(2)}`;
}