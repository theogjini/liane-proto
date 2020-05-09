class User {
    constructor(username, password, user, id) {
        this._id = id;
        this.infos = {
            name: user.name,
            original: user.original,
            path: user.path,
            registered: id,
        };
        this.travels = [];
        this.username = username;
        this.password = password;
    };
};

class Message {
    constructor(user, content, timestamp) {
        this.user = user;
        this.content = content;
        this.timestamp = timestamp;
    };
};

function catchAll(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (e) {
            if (e.message !== 'Invalid password!' || e.message !== 'Invalid username!') {
                res.json({ success: false, desc: e.message });
            };
            console.log('Error occured: ', e);
            next(e);
        }
    };
};

export { User, catchAll, Message };
