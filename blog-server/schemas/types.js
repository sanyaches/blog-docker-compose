const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        user_password: { type: GraphQLString },
        email: { type: GraphQLString },
        joined: { type: GraphQLString },
        last_logged_in: { type: GraphQLString }
    }
});

const PostType = new GraphQLObjectType({
    name: "Post",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        creator_id: { type: GraphQLString },
        //todo: catch username of post's author
        user: {
            type: UserType
        },
        created: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const LikeType = new GraphQLObjectType({
    name: "Like",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        creator_id: { type: GraphQLString },
        post_id: { type: GraphQLString },
        created: { type: GraphQLString },
    }
});

exports.UserType = UserType;
exports.PostType = PostType;
exports.LikeType = LikeType;
