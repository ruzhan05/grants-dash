// src/utils/processData.js

export const processData = (data) => {
    const counts = data.reduce((acc, grant) => {
        const parentOrg = grant.organization;
        acc[parentOrg] = (acc[parentOrg] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    return { labels, values };
};
