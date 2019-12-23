exports.Resolvers = {
    faculties: function(args, context) {
        return context.getFaculties();
    },

    faculty: function(args, context) {
        return context.getFaculty(args.faculty);
    },

    // mutations
    add_faculty: async function(args, context) {
        let result;
        try {
            result = await context.addFaculty(args.faculty);
        } catch (e) {
            console.log('db update faculty');
            result = await context.updateFaculty(args.faculty);
        }
        await context.commit();
        return result;
    },

    del_faculty: async function(args, context) {
        result = await context.delFaculty(args.faculty);
        await context.commit();
        return args.faculty;
    }
}