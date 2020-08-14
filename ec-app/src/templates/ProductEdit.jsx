
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { SelectBox, TextInput, PrimaryButton } from "../components/UIkit";
import { ImageArea, SetSizesArea } from "../components/Products";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import { db } from "../firebase/index";

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split("/product/edit")[1];
    if (id !== "") {
        id = id.split("/")[1];
    }

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [gender, setGender] = useState("");
    const [sizes, setSizes] = useState([]);

    const inputName = useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    const inputDescription = useCallback((e) => {
        setDescription(e.target.value);
    }, [setDescription]);

    const inputPrice = useCallback((e) => {
        setPrice(e.target.value);
    }, [setPrice]);

    const genders = [
        { id: "all", name: "全て" },
        { id: "men", name: "男性" },
        { id: "female", name: "女性" },
    ];

    useEffect(() => {
        if (id !== "") {
            db.collection("products").doc(id).get()
                .then((snapshot) => {
                    const data = snapshot.data();
                    setImages(data.images);
                    setName(data.name);
                    setDescription(data.description);
                    setCategory(data.category);
                    setGender(data.gender);
                    setPrice(data.price);
                    setSizes(data.sizes);
                });
        }
    }, [id]);

    useEffect(() => {
        db.collection("categories")
            .orderBy("order", "desc")
            .get().then(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const { id, name } = doc.data();
                    list.push({ id, name });
                });
                setCategories(list);
            });
    }, []);


    return (
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <ImageArea setImages={setImages} images={images} />
                <TextInput fullWidth={true}
                    label={"商品名"} multiline={false} required={true}
                    rows={1} type={"name"} onChange={inputName} value={name} />

                <TextInput fullWidth={true} label={"商品説明"} multiline={true}
                    required={true} rows={5} type={"description"} onChange={inputDescription} value={description} />

                <SelectBox label={"カテゴリー"} options={categories}
                    required={true} select={setCategory} value={category} />

                <SelectBox label={"性別"} options={genders}
                    required={true} select={setGender} value={gender} />

                <TextInput fullWidth={true} label={"価格"} multiline={true}
                    required={true} rows={1} type={"number"} onChange={inputPrice} value={price} />

                <div className="module-spacer--small" />

                <SetSizesArea sizes={sizes} setSizes={setSizes} />

                <div className="module-spacer--small" />

                <div className="center">
                    <PrimaryButton
                        label={"商品情報を登録"}
                        onClick={() => dispatch(saveProduct(id, name, description, category, price, gender, images, sizes))}
                        color={"#60EEFF"} hoverColor={"#C2EEFF"} />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;
