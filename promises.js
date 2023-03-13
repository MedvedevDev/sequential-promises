const makePromise = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Finished ${delay}`);
            resolve(`Result for ${delay}`)
        }, delay)
    })
};

    const delayList = [6000, 3000, 1000, 5000];

// Parallel
Promise.all(delayList.map(makePromise)).then(results => {
    console.log(results)
})
/** Output
"Finished 1000"
"Finished 3000"
"Finished 5000"
"Finished 6000"
 ["Result for 6000","Result for 3000","Result for 1000","Result for 5000"]
 */

/** When a Promise is created, it starts executing.
 * Therefore, the solution is to create the next Promise only when the previous one finishes.
 * Use reduce to chain them this way:
 */
// Sequential without collecting the results
delayList.reduce((prev, e) => {
    return prev.then(() => makePromise(e));
}, Promise.resolve())
    .then((results) => {
        console.log("Finished sequence");
    });

// Sequential with collecting the results
delayList.reduce((prev, e) => {
    return prev.then((partial) => makePromise(e).then((r) => [...partial, r]));
}, Promise.resolve([]))
    .then((results) => {
        console.log(results);
    });
/** Output
 "Finished 6000"
 "Finished 3000"
 "Finished 1000"
 "Finished 5000"
 ["Result for 6000","Result for 3000","Result for 1000","Result for 5000"]
 */