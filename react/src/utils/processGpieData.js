// src/utils/processData.js

// export const processData = (data) => {
//     const counts = data.reduce((acc, grant) => {
//         const Org = grant.Department;
//         acc[Org] = (acc[Org] || 0) + 1;
//         return acc;
//     }, {});

//     const labels = Object.keys(counts);
//     const values = Object.values(counts);

//     return { labels, values };
// };



// src/utils/processData.js

export const processData = (data) => {
    const counts = data.reduce((acc, grant) => {
        const Org = grant.Department;
        acc[Org] = (acc[Org] || 0) + 1;
        return acc;
    }, {});

    const labels = [];
    const values = [];
    let othersCount = 0;

    for (const [key, value] of Object.entries(counts)) {
        if (value < 10) {
            othersCount += value;
        } else {
            labels.push(key);
            values.push(value);
        }
    }

    if (othersCount > 0) {
        labels.push('Others');
        values.push(othersCount);
    }

    return { labels, values };
};
