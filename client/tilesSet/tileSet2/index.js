module.exports = {
    size: [1,1],
    terrains: {
        "Unknown": require('./unknown'),
        "Plain": require('./plain'),
        "River": require('./river'),
    },
};