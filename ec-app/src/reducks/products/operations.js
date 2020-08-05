import {
    push
} from "connected-react-router";
import {
    db,
    firebaseTimeStamp
} from "../../firebase/index";

const productRef = db.collection("products");

export const saveProduct = (id, name, description, category, price, gender, images) => {
    return async (dispatch) => {
        const timestamp = firebaseTimeStamp.now();

        const data = {
            name,
            description,
            category,
            gender,
            images,
            price: parseInt(price, 10),
            updated_at: timestamp,
        };

        if (id === "") {
            const ref = productRef.doc();
            const id = ref.id;
            data.id = id;
            data.created_at = timestamp;
        }

        // prettier-ignore
        return productRef.doc(id).set(data, {
                merge: true
            })
            .then(() => {
                dispatch(push("/"));
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
};