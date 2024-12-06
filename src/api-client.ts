// import { ITodoList, TodoListStatus } from './api-types'
import { ItemsApi, ListsApi } from 'todo-list-client'
import axios from 'axios'

const api = new ListsApi(
    {
        isJsonMime: (mime: string) => mime.startsWith('application/json')
    },
    'http://localhost:3000',
    axios,
)

const apiItem = new ItemsApi(
    {
        isJsonMime: (mime: string) => mime.startsWith('application/json')
    },
    'http://localhost:3000',
    axios,
)

export const apiClient = {
    getLists: async () => {
        const response = await api.listsGet()
        return response.data
    },
    addList: async (listName: string) => {
        await api.listsPost({name: listName})
        return apiClient.getLists()
    },
    getTodos: async (listName: string): Promise<string[]> => {
        const response = await apiItem.listsListIdItemsGet(listName);
        const items = response.data;
        return items.map((item) => item.name);
    },
    addTodo: async (listName: string, todo: string) => {
        await apiItem.listsListIdItemsPost(listName, {name: todo, status: 'PENDING'})
        return apiClient.getTodos(listName)
    }
}
