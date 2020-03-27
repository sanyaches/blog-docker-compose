const graphql = require("graphql");
const db = require("../pgAdapter").db;
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const { PostType, UserType, LikeType } = require("./types");

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addPost: {
            type: PostType,
            args: {
                creatorId: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO posts(creator_id, created, title, description) 
                                VALUES ($1, $2, $3, $4) 
                                RETURNING id, title, creator_id, description, created`;
                const values = [
                    args.creatorId,
                    new Date(),
                    args.title,
                    args.description
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        updatePost: {
            type: PostType,
            args: {
                postId: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const query = `UPDATE posts
                               SET title = $2,
                                   description = $3
                               WHERE id=$1 
                               RETURNING *`;
                const values = [
                    args.postId,
                    args.title,
                    args.description
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        deletePost: {
            type: PostType,
            args: {
                postId: { type: GraphQLID }
            },
            resolve(parentValue, args) {
                const query = `DELETE FROM posts WHERE id=$1 RETURNING id`;
                const values = [
                    args.postId
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                user_password: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO users(username, email, user_password, joined, last_logged_in) 
                                    VALUES ($1, $2, $3, $4, $5) RETURNING username`;
                const values = [
                    args.username,
                    args.email,
                    args.user_password,
                    new Date(),
                    new Date()
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        addLike: {
            type: LikeType,
            args: {
                creatorId: { type: GraphQLID },
                postId: { type: GraphQLID }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO likes(creator_id, post_id, created) 
                                    VALUES ($1, $2, $3) RETURNING post_id`;
                const values = [
                    args.creatorId,
                    args.postId,
                    new Date()
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        deleteLike: {
            type: LikeType,
            args: {
                creatorId: { type: GraphQLID },
                postId: { type: GraphQLID }
            },
            resolve(parentValue, args) {
                const query = `DELETE FROM likes WHERE creator_id=$1 AND post_id=$2 RETURNING id`;
                const values = [
                    args.creatorId,
                    args.postId
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        }
    }
});

exports.mutation = RootMutation;
