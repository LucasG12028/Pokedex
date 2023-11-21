
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
  createdInDB: boolean
}

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: "",
};


function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      }
    case 'FILTER_BY_TYPE':
      const allPokemons = state.allPokemons;
      const typeFilter = action.payload === 'All' ? allPokemons : allPokemons.filter((e: Pokemon )=> e.types.includes(action.payload));
      return {
        ...state,
        pokemons: typeFilter,
      }
    case 'FILTER_BY_CREATED':
      const allPokemonss = state.allPokemons;
      const createdFilter = action.payload === 'created' ? allPokemonss.filter((e: Pokemon) => e.createdInDB)
        : allPokemonss.filter((e: Pokemon) => !e.createdInDB)
      return {
        ...state,
        pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
      }
    case 'ORDER_BY_NAME':
      let orderArray = action.payload === 'asc' ?
        state.pokemons.sort(function (a: Pokemon, b: Pokemon) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function (a: Pokemon, b: Pokemon) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        pokemons: orderArray,
      }
    case 'ORDER_BY_ATTACK':
      let orderArrayAt = action.payload === 'asc' ?
        state.pokemons.sort(function (a: Pokemon, b: Pokemon) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function (a: Pokemon, b: Pokemon) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        pokemons: orderArrayAt,
      }
    case 'GET_NAME_POKEMON':
      return {
        ...state,
        pokemons: action.payload,
      }
    case 'GET_TYPES':
      return {
        ...state,
        types: action.payload,
      }
    case 'POST_POKEMON':
      return {
        ...state,
      }
    case 'GET_DETAILS':
      if (!action.payload) {
        return {
          ...state,
          detail: ""
        }
      } else {
        return {
          ...state,
          detail: action.payload,
        }
      }
    default:
      return state;
  }
}

export default rootReducer;