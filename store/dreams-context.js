import { createContext, useContext, useReducer } from "react";
import { Dream } from "@/models/dream";

// interface Dream {
//     id: number,
//     title: string,
//     description: string,
//     date: string,
// }

// interface DreamsContextType {
//     dreams: Dream[];
//     addDream: (dream: Dream) => void;
//     removeDream: (id: number) => void;
//     updateDream: (id: number, updatedDream: Dream) => void;
// }

const DUMMY_DATA = [
    new Dream({id: 2, title: 'dream short title', description: 'Jesus is Lord!', date: '2024-05-13 4:09'}),
];

export const DreamsContext = createContext({
    dreams: [],
    addDream: (dream) => {},
    removeDream: (dreamId) => {},
    updateDream: (dreamId, newDream) => {},
});

// Create a custom hook to use the context
export const useDreamsContext = () => useContext(DreamsContext);

// The reducer function
function dreamsReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'REMOVE':
            return state.filter((item) => item.id !== action.payload);
        case 'UPDATE':
            // console.log('OPERATION: UPDATE', 'dream id =>', action.payload.dreamId, 'new dream => ', action.payload.newDream);
            // console.log('STATE: ', state[0]);
            
            return state.map((dreamItem) => {
                // let newObj = dreamItem;
                if(dreamItem.dream.id === action.payload.dreamId) {
                    return dreamItem = {...dreamItem, "dream" : ({...action.payload.newDream})};
                }
                return dreamItem;
            })
            // return state.map(dreamObj => (dreamObj.dream.id === action.payload.dreamId ? action.payload.newDream : dreamObj.dream) );
        default:
            return state;
    }
}


// Provider
export default function DreamsContextProvider ({ children }) {
    const [state, dispatch] = useReducer(dreamsReducer, DUMMY_DATA);

    function addDream(dream) {
        dispatch({type: 'ADD', payload: dream});
    }

    function removeDream(dreamId) {
        dispatch({type: 'REMOVE', payload: dreamId});
    }

    function updateDream(dreamId, newDream) {
        dispatch({type: 'UPDATE', payload: {dreamId, newDream} });
    }

    const value = {
        dreams: state,
        addDream: addDream,
        removeDream: removeDream,
        updateDream: updateDream
    };

    // const { dreams, addDream, removeDream, updateDream } = useDreamsContext();

    return (
        <DreamsContext.Provider value={value}>
            {children}
        </DreamsContext.Provider>
    );
}