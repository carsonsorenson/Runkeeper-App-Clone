const UPDATE_BESTS = "UPDATE_BESTS";

export {
    UPDATE_BESTS
}

export function updateBests(activites) {
    let size = activites.length;
    let level = size > 0 ? Math.floor(size / 5) : 0
    let numNeeded = 5 - (size % 5);
    speedLevel = 0;
    speedPace = 0;
    let newTime = {
        best: 0,
        id: null
    }
    let newDistance = {
        best: 0,
        id: null
    }
    let newPace = {
        best: Infinity,
        id: null
    }
    for (let i = 0; i < activites.length; i++) {
        let a = activites[i];
        if (a.time > newTime.best) {
            newTime.best = a.time;
            newTime.id = a.id;
        }
        if (a.distance > newDistance.best) {
            newDistance.best = a.distance;
            newDistance.id = a.id;
        }
        if (a.pace < newPace.best && a.pace !== 0) {
            newPace.best = a.pace;
            newPace.id = a.id;
        }
        if (a.distance >= 1 && a.activity === 'Running' && a.pace <= 600) {
            let s = Math.floor((600 - a.pace) / 30) + 1;
            if (s > speedLevel) {
                speedLevel = s;
                speedPace = a.pace;
            }
        }
    }


    return {
        type: UPDATE_BESTS,
        payload: {
            time: newTime,
            distance: newDistance,
            pace: newPace,
            size,
            level,
            numNeeded,
            speedLevel,
            speedPace
        }
    }
}