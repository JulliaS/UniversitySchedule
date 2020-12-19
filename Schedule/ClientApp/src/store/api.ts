import axios from "axios";
import { Faculty } from "./Faculties";

const baseUrl = `api/`

export default {
    
    apiFaculty(url = baseUrl + 'faculty/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id: number) => axios.get(url + id),
            create: (newFaculty: Faculty) => axios.post(url, newFaculty),
            update: (id: number, updateFaculty: any) => axios.put(url + id, updateFaculty),
            delete: (id: number) => axios.delete(url + id)
        }
    },

    RestAPI<T>(url: string) {
        return {
            fetchAll: (): Promise<T[]> => {
                const data = axios.get(url)
                    .then(response => response.data as Promise<T[]>)
                return data;
            },
            fetchById: (id: number): Promise<T> => {
                const data = axios.get(url + id)
                    .then(response => response.data as Promise<T>);
                return data;
            },
            create: (newRecord: T): Promise<T> => {
                const data = axios.post(url, newRecord)
                    .then(response => response.data as Promise<T>)
                return data;
            },
            update: (id: number, updatedRecord: T): Promise<T> => {
                const data = axios.put(url + id, updatedRecord)
                    .then(response => response.data as Promise<T>)
                return data;
            },
            delete: (id: number): Promise<Boolean> => {
                const response = axios.delete(url + id)
                    .then(response => response.data as Promise<Boolean>);
                return response
            }
        }
    }
} 