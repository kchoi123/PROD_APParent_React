// our axios calls

import axios from "axios";

export default {
    searchAll: function() {
        return axios.get("/api/posts");
    },

    // ------ start Sophie
    // get all the posts for a particular category
    getFilteredPosts: function(data) {
        return axios.get("/api/posts/category/" + data);
    },

    // get all the posts in an ascending order
    getAllAscending: function() {
        return axios.get("/api/posts/all/ascending");
    },
    // ------ end Sophie

    searchAllMembers: function() {
        return axios.get("/api/parents");
    },
    //search all members for a State
    searchAllMembersForAState: function (data) {
        return axios.get("/api/parents/state/" + data);
    },
    //search all members for a School
    searchAllMembersForASchool: function (data) {
        return axios.get("/api/parents/school/" + data);
    },
    
    //See Logged in user data 
    findOne: function () {
        return axios.get("/api/parents/:id");
    },
    //Create a post 
    createPost: function(data) {
        return axios.post("/api/posts", data);
    }, 
    // Create a comment in the modal and auto populate new entries
    createComment: function(data) {
        return axios.post("/api/posts/comments", data);
    },

    // get all comments for a post
    findAllForPost: function(data) {
        return axios.get("/api/posts/" + data.id + "/comments/");
    },

    // find all the schools
    getAllSchools: function() {
        return axios.get("/api/schools");
    },
    // find all the schools by state
    getAllSchoolsByState: function(data) {
        return axios.get("/api/schools/state/"+data);
    },
    // enter a new school in the database
    createSchool: function(data) {
        return axios.post("api/schools/new", data);
    },

    //update logged in profile 
    updateProfile: function(data) {
        return axios.post("/api/parents/update", data);
    }, 

    //get all kids info for a parent
    findAllKidsForAParent: function() {
        return axios.get("/api/kids");
    }, 
     //get all kids info for all parents on the website 
     findAllKids: function(parentId) {
        return axios.get("/api/kids/all/" + parentId);
    }, 
    //update a kid info for a parent
    updateKidForAParent: function(data, id) {
        return axios.post("/api/kids/update/"+id, data);
    }, 
    //delete a kid info for a parent
    deleteKidForAParent: function(id) {
        return axios.delete("/api/kids/"+id);
    }, 

    logout: function(){
        return axios.get("/logout");
    },

    checkLogin: function(){
        return axios.get("/api/parents/checkstatus")
    },

    login: function (data){
        return axios.post("/api/parents/login", data);
    },

    // sign up - create parent and kid in the database
    signup: function (data) {
        return axios.post("api/parents/signup", data);
    },

    // get the info of the parents already in the database - to check username and email at sign-up
    searchAllParentsInDB: function() {
        return axios.get("api/parents/all");
    }
};