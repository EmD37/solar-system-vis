export function flattenSettings(settings, requestType) {
    return {
        startDate: settings.StartDate,
        endDate: settings.EndDate,
        export: requestType === 'render' ? false : true,
        bodies: flattenItems(...settings.MajorBodies, ...settings.MinorBodies, ...settings.Missions)
    }
}

export function buildRequest(flattenedTree) {

}

export function compareFlattened(newRequest, previousRequest) {
    if (newRequest.startDate !== previousRequest.startDate || newRequest.EndDate !== previousRequest.EndDate)
        return false;
    

    const i = newRequest.bodies.length;
    for (let j = 0; j < i - 1; j++) {
        if (newRequest.bodies[j].show !== previousRequest.bodies[j].show)
            return false;
        if (newRequest.bodies[j].orbit !== previousRequest.bodies[j].orbit)
            return false;
    }

    return true;
}


function flattenItems(list, flattened = []) {
    
    for (const item of list) {
        if (item.children.length === 0) {     
            flattened.push({
                id: item.id,
                name: item.name,
                show: item.show,
                orbit: item.orbit
            });
        }

        if (item.children.length !== 0) {
            flattened = flattenItems(item.children, flattened);
        }
    }
    return flattened;
}