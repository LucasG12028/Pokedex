import axios from 'axios';
import { Dispatch } from 'redux';


interface Pokemon {
    name: string,
    hp: number,
    attack: number,
    defense: number,
    speed: number,
    height: number,
    weight: number,
    sprite: string,
    types: any,
}
interface Action {
    type: string;
    payload?: any;
}

export function getPokemons() {
    return function (dispatch: Dispatch<Action>) {
        axios.get('http://localhost:3001/pokemons')
            .then((response) => {
                dispatch({ type: 'GET_POKEMONS', payload: response.data });
            })
            .catch((error) => {
                console.error(error);
            });
    };
}

export function getNamePokemon(payload: string) {
    return function (dispatch: Dispatch<Action>) {
        axios.get("http://localhost:3001/pokemons?name=" + payload)
            .then((response) => {
                dispatch({ type: 'GET_NAME_POKEMON', payload: response.data });
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export function filterPokemonsByType(payload: string) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterPokemonsByCreated(payload: string) {
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function orderByName(payload: string) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload: number) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getTypes() {
    return async function (dispatch: Dispatch<Action>) {
        axios.get('http://localhost:3001/types')
        .then((response) => {
            dispatch({ type: 'GET_TYPES', payload: response.data })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function postPokemon(payload: Pokemon) {
    return async function (dispatch: Dispatch<Action>) {
        var response = await axios.post('http://localhost:3001/pokemon', payload);
        console.log(payload)
        console.log('LLEGUE A LA ACTION')
        return response;
    }
}

export function getDetail(id: number) {
    return async function (dispatch: Dispatch<Action>) {
        try {
            if (!id) {
                return dispatch({ type: "GET_DETAILS" })
            } else {
                var json = await axios.get("http://localhost:3001/pokemons/" + id);
                return dispatch({ type: "GET_DETAILS", payload: json.data })
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}