import { signInAction, signOutAction, fetchProductInCartAction, fetchOrdersHistoryAction } from "./actions"
import { push } from "connected-react-router";
import { db, auth, serverTimestamp } from "../../firebase/index"
import { isValidEmailFormat } from "../../functions/common";

const usersRef = db.collection("users");

export const listenAuthState = (pathname) => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid;
                db.collection("users").doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data();
                        dispatch(signInAction({
                            role: data.role,
                            isSigndIn: true,
                            uid: uid,
                            username: data.username
                        }))
                    })
            } else {
                dispatch(push("/signin"));
            }
        });
    }
}

export const fetchProductInCart = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductInCartAction(products))
    }
};


export const fetchOrdersHistory = (products) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const snapShot = await usersRef.doc(uid).collection("orders").orderBy("updated_at", "desc").get();
        const data = snapShot.docs.map(doc => doc.data());
        const list = [...data];//非破壊的にしてみた。
        dispatch(fetchOrdersHistoryAction(list));
    }
};


export const addProductToCart = (product, selectedSize) => {
    const { category, description, gender, id, images, name, price } = product;
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const cartRef = db.collection("users").doc(uid).collection("cart").doc();
        const cartId = cartRef.id;
        const addedProduct = {
            cartId,
            category,
            description,
            gender,
            id,
            images,
            name,
            price,
            quantity: 1,
            size: selectedSize
        }
        await cartRef.set(addedProduct);
        dispatch(push('/'))
    }
}


export const signIn = (email, password) => {
    return async (dispatch) => {
        if (email === "" || password === "") {
            alert("入力もれがあります！");
            return false;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;

                if (user) {
                    const uid = user.uid;
                    db.collection("users").doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data();
                            dispatch(signInAction({
                                role: data.role,
                                isSigndIn: true,
                                uid: uid,
                                username: data.username
                            }))
                        })
                    dispatch(push("/"));
                }
            });
    }
}


export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch, getState) => {
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("入力もれがあります！");
            return false;
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致していません！");
            return false;
        }
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password)
            const user = result.user;
            if (user) {
                const uid = user.uid;
                const initialUserData = {
                    created_at: serverTimestamp(),
                    email: email,
                    username: username,
                    uid: uid,
                    updated_at: serverTimestamp(),
                    role: "customer"
                }
                await db.collection("users").doc(uid).set(initialUserData)
                dispatch(push("/"));
            }
        } catch (error) {
        }

        // .then((result) => {
        // });
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push("/signin"));
            })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('登録されていないメールアドレスです。もう一度ご確認ください。')
                })
        }
    }
}