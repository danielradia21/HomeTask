export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    saveToStorge,
};

function query(entityType, delay = 1200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities);
        }, delay);
    });
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity.id === entityId)
    );
}
function post(entityType, newEntity) {
    return query(entityType).then((entities) => {
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity.id === updatedEntity.id
        );
        entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity.id === entityId);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function postMany(entityType, newEntities) {
    return query(entityType).then((entities) => {
        newEntities = newEntities.map((entity) => ({
            ...entity,
        }));
        entities.push(...newEntities);
        _save(entityType, entities);
        return entities;
    });
}

function saveToStorge(entityType, entities) {
    return localStorage.setItem(entityType, JSON.stringify(entities));
}
