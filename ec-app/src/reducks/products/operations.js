import { push } from "connected-react-router";
import { deleteProductAction, fetchProductsAction } from "./actions";
import { db, serverTimestamp, timestamp } from "../../firebase/index";

const productsRef = db.collection("products");

export const fetchProduct = () => {
    return async (dispatch) => {
        productsRef.orderBy("updated_at", "desc").get()
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
        productsRef.doc(productId).delete()
            .then(() => {
                const prevProducts = getState().products.list
                const nextProducts = prevProducts.filter(product => product.id !== productId);
                dispatch(deleteProductAction(nextProducts));
            })
    }
};

export const saveProduct = (id, name, description, category, price, gender, images, sizes) => {
    return async (dispatch) => {

        const data = {
            name,
            description,
            category,
            gender,
            images,
            sizes: sizes,
            price: parseInt(price, 10),
            updated_at: serverTimestamp(),
        };

        if (id === "") {
            const ref = productsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = serverTimestamp();
        }


        productsRef.doc(id).set(data, { merge: true })
            .then(() => {
                dispatch(push("/"));
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
};

export const orderProduct = (productsInCart, price) => {
    return async (dispatch, getState) => {
        // dispatch(showLoadingAction("決済処理中..."));

        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        let products = [];
        let soldOutProducts = [];

        const batch = db.batch();
        for (const product of productsInCart) {
            const snapshot = await productsRef.doc(product.id).get(); //商品情報を取得
            const sizes = snapshot.data().sizes;
            // Create a new array of the product sizes
            const updateSizes = sizes.map(size => {
                if (size.size === product.size) {
                    if (size.quantity === 0) {
                        soldOutProducts.push(product.name);
                        return size
                    }
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            });

            products.push({
                id: product.id,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            });
            batch.update(
                productsRef.doc(product.id), {
                sizes: updateSizes,
                updated_at: serverTimestamp()
            }
            );

            const productsRefsnapshot = await productsRef.doc(product.id).get();

            batch.delete(userRef.collection('cart').doc(product.cartId));
        }

        if (soldOutProducts.length > 0) {
            const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
            alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
            return false
        } else {
            batch.commit()
                .then(() => {
                    const orderRef = userRef.collection('orders').doc();
                    const date = timestamp.now().toDate();
                    const shippingDate = timestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));
                    const history = {
                        amount: price,
                        created_at: serverTimestamp(),
                        id: orderRef.id,
                        products: products,
                        shipping_date: shippingDate,
                        updated_at: serverTimestamp()
                    };
                    orderRef.set(history);
                    dispatch(push('/order/complete'))
                })
                .catch((error) => {
                    alert(error + "エラーが発生したぞー");
                });
        }
    }
}