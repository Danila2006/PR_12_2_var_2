export function infer(item) {
    const result = { ...item };

    if (item.type === "ssn:Sensor") {
        result.capabilities = ["read"];
    }

    if (item.type === "sosa:Actuator") {
        result.capabilities = ["write"];
    }

    return result;
}