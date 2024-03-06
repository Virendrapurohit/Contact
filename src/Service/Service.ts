import axios from "axios";

class Service {
    route = "https://localhost:44374/api/Contact";

    getList = () => axios.get(this.route);
    delete = (id: string) => axios.delete(`${this.route}/${id}`);
    post = (id: string, body: any) => axios.postForm(`${this.route}${id ? "/" + id : ""}`, body);
    get = (id: string) => axios.get(`${this.route}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Service();