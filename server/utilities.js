class User {
    constructor(name, original, path, username) {
        this.infos = {
            name,
            original,
            path,
            registered: true,
            travels: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            },
        };
        this.username = username;
        this.password = password;
    };
};

function catchAll(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (e) {
            console.error(e);
            next(e);
        }
    };
};

module.exports = { User, catchAll };
