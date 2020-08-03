import {push} from "connected-react-router";
import {db, firebaseTimeStamp} from "../../firebase/index"

const productRef = db.collection("products");

export const saveProduct = (name, description, category, price, gender) => {
  return async (dispatch) => {
    const timestamp = firebaseTimeStamp.now();

    const data = {
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      updated_at: timestamp
    };

    const ref = productRef.doc();
    const id  = ref.id;
    data.id = id;
    data.created_at = timestamp

    return productRef.doc(id).set(data)
      .then(()=> {
        dispatch(push("/"));
      })
      .catch((error)=> {
        throw new Error(error);
      })
  }
}

