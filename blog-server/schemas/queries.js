const { db } = require("../pgAdapter");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PostType, LikeType } = require("./types");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM posts WHERE id=$1`;
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            args: { },
            resolve(parentValue, args) {
                const query = `SELECT * FROM posts`;

                return db
                    .any(query)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            args: { },
            resolve(parentValue, args) {
                const query = `SELECT * FROM users`;

                return db
                    .any(query)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        all_likes: {
            type: new GraphQLList(LikeType),
            args: { },
            resolve(parentValue, args) {
                const query = `SELECT * FROM likes`;

                return db
                    .any(query)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        likes: {
            type: new GraphQLList(LikeType),
            args: { postId: { type: GraphQLID }, userId: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM likes WHERE post_id=$1 OR creator_id=$2`;
                const values = [ args.postId, args.userId ];

                return db
                    .any(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }, username: {type: GraphQLString} },
            resolve(parentValue, args) {
                const query = `SELECT * FROM users WHERE id=$1 OR username=$2`;
                const values = [args.id, args.username];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        }
    }
});

exports.query = RootQuery;
