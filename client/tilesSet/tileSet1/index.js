module.exports = {
    size: [2,3],
    terrains: {
        "Unknown": require('./unknown'),
        "Plain": require('./plain'),
        "River": require('./river'),
    },
};