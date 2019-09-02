const initState = {
    isLoggedIn: false,
    userId: "",
    noOfItemsInCart: 0,
    category: "all",
    allProducts: [],
    productList: []
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CATEGORY":
            return {
                ...state,
                category: action.category,
                productList: state.allProducts.filter(product => {
                    if (action.category === "all") {
                        return state.allProducts
                    } else {
                        return product.category === action.category
                    }
                })
            }

        case "GET_PRODUCTS":
            return {
                ...state,
                allProducts: action.payload,
                productList: action.payload
            }

        case "CHANGE_USER_LOGGEDIN":
            localStorage.setItem("userId", action.userId);
            return {
                ...state,
                isLoggedIn: true,
                userId: action.userId

            }
        case "COUNT_CART":
            return {
                ...state,
                noOfItemsInCart: action.noOfItemsInCart
            }
        default:
            break;
    }
    return state;
}

export default userReducer;