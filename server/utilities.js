class User {
    constructor(username, password, user, id) {
        this._id = id;
        this.infos = {
            name: user.name,
            original: user.original,
            path: user.path,
            registered: id,
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
