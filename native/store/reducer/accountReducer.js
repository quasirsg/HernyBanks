import { GET_ACCOUNT, RECHARGE_QR, RECHARGE_CARD} from "../constans/constans";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  message: "",
  userUp:{},
  account: []
};



const acoountReducers = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case GET_ACCOUNT:
      return { ...state, account: action.data };
    case RECHARGE_QR:
      let obj = action.data
      let acc = state.account.find(x => x._id == obj._id)
      if(acc === undefined) return {...state};
      let ind = state.account.indexOf(acc)
      let accountNew = [...state.account]
      accountNew[ind].balance = obj.balance
      return {...state, account: accountNew};
    case RECHARGE_CARD:
        let objT = action.data
        let accT = state.account.find(x => x._id == objT._id)
        if(accT === undefined) return {...state};
        let indT = state.account.indexOf(accT)
        let accountNewT = [...state.account]
        accountNewT[indT].balance = objT.balance
        return {...state, account: accountNewT};
    default:
      return state;
  }
};

export default acoountReducers;