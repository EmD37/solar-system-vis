function findObj (id, obj) {
    if (obj.id === parseInt(id)) {
        return obj;
    }
    else 
    {
        if (obj.children.length !== 0) {
            for (const item of obj.children) {
                let result = findObj(id, item);
                if (result !== undefined)
                    return result;
            }
        }
        return undefined;
    }
}

export function findParentIndexAndObj(id, array) {
    const outerRes = {
        index: 0,
        obj: {}
    }
    let index = 0;

    for(const obj of array) {
        const innerRes = findObj(id, obj);
        if (innerRes !== undefined) {
            outerRes.obj = innerRes;
            outerRes.index = index;
            return outerRes;
        }
        index++;
    }
    outerRes.index = -1;
    return outerRes;
}

function findNextParent(id, obj) {
    
    for (const item of obj.children) {
        let result = item.id === parseInt(id) ? obj
                : item.children && findNextParent(id, item);
        if (result) 
            return result;
    }
}

export function drillDownProperties (children, property, parent) {
    let newChildren = []
    if (children.length !== 0) {
        for (const item of children) {
            if (property === 'Show')
                item.show = parent.show;
            if (property === 'Orbit')
                item.orbit = parent.orbit;
            if (item.orbit)
                item.show = true;
            if (!item.show)
                item.orbit = false;
            item.children = drillDownProperties(item.children, property, item, newChildren);
            newChildren.push(item);
        }
    }
    return newChildren
}

export function bubbleUpProperties (absoluteParent, newItem) {

    let nextParent = findNextParent(newItem.id, absoluteParent);
    if (nextParent !== undefined) {
        const index = nextParent.children.findIndex(e => e.id === newItem.id);
        nextParent.children.splice(index, 1, newItem);

        if (newItem.show || newItem.orbit){
            nextParent.show = true;
            nextParent.orbit = true;
            for (const item of nextParent.children) {
                if (!item.show) {
                    nextParent.show = false;
                    nextParent.orbit = false;
                    break;
                }

                if (!item.orbit) {
                    nextParent.orbit = false;
                } 
            }
        } else {
            nextParent.show = false;
            nextParent.orbit = false;
        }

        if (nextParent.id !== absoluteParent.id) {
            nextParent = bubbleUpProperties(absoluteParent, nextParent)
        }
    } else {
        nextParent = newItem;
    }

    return nextParent;
}