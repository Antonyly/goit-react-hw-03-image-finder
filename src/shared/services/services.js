import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api/",
    
    params: {
        key: "29194580-6d03f62d266b292b402d3a1d9",
        per_page: 12,
        orientation: "horizontal",
        image_type: "photo",
    },
})

export const getPhotos = async (q, page = 1) => {
    const {data} = await instance("/", {
        params: {
            page,
            q,
        },
    });
    return data;
}

export const searchPosts = async (q, page = 1) => {
    const {data} = await instance("/", {
        params: {
            q,
            page
        }
    });
    return data;
}