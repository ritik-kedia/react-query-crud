import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// to fetch data

export const fetchPosts = (PageNumber) => {
    return api.get(`/posts?_start=${PageNumber}&_limit=3`);
}

// to fetch individual data

export const fetchIndividualPost = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
}

// to delete the post

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};

// to update the post

export const updatePost = (id) => {
    return api.patch(`/posts/${id}`, { title: "I have updated", body: "React Query Data" });
}

// to create the post

export const createPost = (newPost) => {
    return api.post(`/posts`, newPost)
}

// to Infinite Scrolling

export const fetchUsers = async ({ pageParam = 1 }) => {
    try {
        const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error("Rate limit exceeded. Please try again later.");
            return [];
        }
        throw new Error("Failed to fetch users");

    }
}