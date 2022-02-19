"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_resolver_1 = require("./post.resolver");
const users_resolver_1 = require("./users.resolver");
const resolvers = {
    Query: Object.assign({}, post_resolver_1.postResolver.Query),
    Mutation: Object.assign(Object.assign({}, users_resolver_1.userResolver.Mutation), post_resolver_1.postResolver.Mutation),
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map