import { push } from "connected-react-router";
import { deleteProductAction, fetchProductsAction } from "./actions";
import { db, firebaseTimeStamp } from "../../firebase/index";

const productRef = db.collection("products");

export const fetchProduct = () => {
    return async (dispatch) => {
        productRef.orderBy("updated_at", "desc").get()
            .then((snapshots) => {
                const productList = [];
                snapshots.forEach((snapshot) => {
                    const product = snapshot.data();
                    productList.push(product);
                });
                dispatch(fetchProductsAction(productList));
            })
            .catch((error) => {
                throw new Error(error);
            })
    }
};

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        productRef.doc(productId).delete()
            .then(() => {
                console.log(getState)
                const prevProducts = getState().products.list
                const nextProducts = prevProducts.filter(product => product.id !== productId);
                dispatch(deleteProductAction(nextProducts));
            })
    }
};

export const saveProduct = (id, name, description, category, price, gender, images, sizes) => {
    return async (dispatch) => {
        const timestamp = firebaseTimeStamp.now();

        const data = {
            name,
            description,
            category,
            gender,
            images,
            sizes,
            price: parseInt(price, 10),
            updated_at: timestamp,
        };

        if (id === "") {
            const ref = productRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp;
        }

        productRef.doc(id).set(data, { merge: true })
            .then(() => {
                dispatch(push("/"));
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
};