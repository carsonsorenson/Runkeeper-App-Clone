import localStorage from './LocalStorage';

class DataController {
    getAllActivities() {
        return new Promise((resolve, reject) => {
            localStorage.get('activites')
            .then(result => {
                resolve(result)
            })
            .catch(error => reject(error))
        })
    }
}

const dataController = new DataController();
export default dataController;